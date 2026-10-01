#!/usr/bin/env node
/* 令牌检查:示例与组件的样式里不得出现硬编码的颜色、长度、时长。
   一切视觉取值必须来自 styles/<风格>/tokens.css 中的 var(--…)。
   用法:
     node scripts/check-tokens.mjs                  检查默认范围(examples、styles 下的 components.css、shared)
     node scripts/check-tokens.mjs examples/foo     只检查指定目录或文件
     node scripts/check-tokens.mjs --summary        只看每个文件的违规数
   豁免:在该行末尾加一条写明原因的 token-check-ignore 注释(仅限确有必要,例如兼容回退值)。
   不需要 npm 依赖,只需要 Node。 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, basename } from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const summaryOnly = args.includes('--summary');
const targets = args.filter((a) => !a.startsWith('--'));
const defaults = ['examples', 'styles', 'shared'];

const SKIP_DIRS = new Set(['node_modules', '.git']);
function walk(p, out = []) {
  if (!existsSync(p)) return out;
  const st = statSync(p);
  if (st.isFile()) { out.push(p); return out; }
  for (const name of readdirSync(p)) {
    if (SKIP_DIRS.has(name)) continue;
    walk(join(p, name), out);
  }
  return out;
}
/* 令牌文件是唯一允许写原始值的地方 */
const isTokenFile = (f) => basename(f) === 'tokens.css';

const blank = (s) => s.replace(/[^\n]/g, ' ');
function cleanCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, (m) => (/token-check-ignore/.test(m) ? m.replace(/[^\n]/g, (c, i) => c) : blank(m)))
    .replace(/@import[^;]*;/g, blank)
    .replace(/@font-face\s*\{[^}]*\}/g, blank)
    .replace(/url\([^)]*\)/g, blank)
    .replace(/(["'])(?:\\.|(?!\1)[^\\\n])*\1/g, blank)
    /* 媒体查询/容器查询的条件里无法使用 var(),允许字面量 */
    .replace(/@(media|container|supports|layer)([^{;]*)\{/g, (m, a, b) => '@' + a + blank(b) + '{')
    .replace(/var\(\s*--[\w-]+/g, 'var(');
}

const COLOR = /#[0-9a-fA-F]{3,8}(?![\w-])|\b(?:rgba?|hsla?|hwb|oklch|oklab|lab|lch)\(/;
const NAMED = /\b(?:white|black|red|blue|green|yellow|gray|grey|orange|purple|pink|silver|navy|teal|gold|brown)\b/;
const NAMED_PROPS = /^\s*(?:color|background(?:-color)?|border(?:-[a-z]+)*|outline(?:-color)?|fill|stroke|box-shadow|text-shadow|caret-color|accent-color)\s*:/;
const LENGTH = /(?<![\w.-])-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|vw|vh|vmin|vmax|dvh|svh|lvh|dvw|ch|ex|pt|cm|mm|in|ms|s)(?![\w-])/;

const findings = [];
function scanCss(file, css, lineOffset = 0, originalText = css) {
  const origLines = originalText.split('\n');
  const lines = cleanCss(css).split('\n');
  lines.forEach((line, i) => {
    if (/token-check-ignore/.test(origLines[i] || '')) return;
    const l = line.replace(/\/\*[\s\S]*?\*\//g, '');
    const kinds = [];
    if (COLOR.test(l)) kinds.push('硬编码颜色');
    else if (NAMED_PROPS.test(l) && NAMED.test(l.split(':').slice(1).join(':'))) kinds.push('颜色关键字');
    if (LENGTH.test(l)) kinds.push('硬编码长度/时长');
    if (kinds.length) findings.push({ file, line: i + 1 + lineOffset, kinds, text: (origLines[i] || '').trim() });
  });
}
function scanHtml(file, html) {
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    const off = html.slice(0, m.index + m[0].indexOf('>') + 1).split('\n').length - 1;
    scanCss(file, m[1], off);
  }
  for (const m of html.matchAll(/\sstyle="([^"]*)"/g)) {
    const line = html.slice(0, m.index).split('\n').length;
    const css = m[1].replace(/;/g, ';\n');
    const tmp = [];
    const before = findings.length;
    scanCss(file, css, 0);
    for (let k = before; k < findings.length; k++) findings[k].line = line;
  }
}
function scanJs(file, js) {
  js.split('\n').forEach((line, i) => {
    if (/token-check-ignore/.test(line)) return;
    if (/['"`]#[0-9a-fA-F]{3,8}['"`]|\brgba?\(|\bhsla?\(/.test(line)) findings.push({ file, line: i + 1, kinds: ['JS 中的硬编码颜色'], text: line.trim() });
    if (/\.style\.[a-zA-Z]+\s*=\s*['"`][^'"`]*\d(?:px|rem|em)/.test(line)) findings.push({ file, line: i + 1, kinds: ['JS 中的硬编码长度'], text: line.trim() });
  });
}

const scope = targets.length ? targets : defaults;
let files = scope.flatMap((t) => walk(join(root, t)));
if (!targets.length) {
  /* 默认范围:examples 下全部;styles 下只查 components.css(tokens.css 豁免);shared 下的 css/js */
  files = files.filter((f) => {
    const rel = relative(root, f);
    if (rel.startsWith('styles')) return basename(f) === 'components.css';
    if (rel.startsWith('shared')) return /\.(css|js)$/.test(f) && basename(f) !== 'icons.js';
    return true;
  });
}
for (const f of files) {
  if (isTokenFile(f)) continue;
  const rel = relative(root, f);
  const txt = readFileSync(f, 'utf8');
  if (f.endsWith('.css')) scanCss(rel, txt);
  else if (f.endsWith('.html')) scanHtml(rel, txt);
  else if (f.endsWith('.js') && !/\/data\.js$/.test(f)) scanJs(rel, txt);
}

if (!findings.length) { console.log('✔ 令牌检查通过:没有发现硬编码的颜色、长度或时长。'); process.exit(0); }
const byFile = new Map();
for (const x of findings) byFile.set(x.file, (byFile.get(x.file) || 0) + 1);
if (!summaryOnly) for (const x of findings) console.log(`${x.file}:${x.line}  ${x.kinds.join('、')}\n    ${x.text}`);
console.log(`\n✘ 共 ${findings.length} 处硬编码,分布在 ${byFile.size} 个文件:`);
for (const [f, n] of byFile) console.log(`  ${String(n).padStart(3)}  ${f}`);
console.log('\n请改用 styles/<风格>/tokens.css 里的 var(--…);缺少的值先补进 tokens.css。');
process.exit(1);
