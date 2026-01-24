import fs from 'node:fs'
import path from 'node:path'

function parseArgs(argv) {
  const args = new Map()
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true'
      args.set(key, val)
    }
  }
  return args
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function writeIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.error(`Refusing to overwrite existing file: ${filePath}`)
    process.exitCode = 1
    return false
  }
  fs.writeFileSync(filePath, content, 'utf8')
  return true
}

function toCamel(slug) {
  return slug
    .replace(/[-_ ]+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^(\w)/, (m) => m.toLowerCase())
}

function toPascal(slug) {
  const camel = toCamel(slug)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

const args = parseArgs(process.argv.slice(2))

const id = args.get('id')
const cat = args.get('cat') ?? 'misc'
const title = args.get('title')
const diff = args.get('diff') ?? 'Unknown'
const tags = args.get('tags') ?? ''
const functionName = args.get('fn-name')

if (!id || !title) {
  console.error(
    'Usage:\n  npm run new -- --id 9 --fn-name isPalindrome --cat math --title "Palindrome Number" --diff Easy --tags "Math"'
  )
  process.exit(1)
}

const camelTitle = toCamel(title)
const pascalTitle = toPascal(title)

const srcDir = path.join('src', cat)
const testDir = path.join('tests', cat)
const benchDir = path.join('benchmarks', cat)

ensureDir(srcDir)
ensureDir(testDir)
ensureDir(benchDir)

const srcFile = path.join(srcDir, `${camelTitle}.ts`)
const testFile = path.join(testDir, `${camelTitle}.test.ts`)
const benchFile = path.join(benchDir, `${camelTitle}.bench.ts`)

const srcTemplate = `// LeetCode #${id}: ${title}
// Difficulty: ${diff}
// Tags: ${tags}
//
// Time: ?
// Space: ?

export function ${functionName}(): void {
  // TODO
}
`

const testTemplate = `import { test, expect } from 'vitest'

import { ${functionName} } from '@${cat}/${camelTitle}'

type ${pascalTitle}Fn = () => void

const implementations: [string, ${pascalTitle}Fn] = [
  '${functionName}', ${functionName}
];

interface TestCase {
  name: string;
  input: any;
  // TODO
}

const cases: TestCase[] = [
  { name: 'base example', ...}
];

function assert${pascalTitle}Result(): void {
  // TODO
}

const matrix = implementations.flatMap(([implName, fn]) =>
  cases.map((tc) => ({ implName, fn, ...tc })),
);

test.each(matrix)('$implName - $name', ({ fn, input, ... }) => {
  const result = fn(input);

  expect(result).toBeDefined()

  assert${pascalTitle}Result();
});
`

const benchTemplate = `import { bench, describe } from 'vitest'

import { ${fnName} } from '../../src/${cat}/${fnName}'

describe('${fnName} benchmarks', () => {
  bench('baseline', () => {
    ${fnName}()
  })
})
`

const ok1 = writeIfMissing(srcFile, srcTemplate)
const ok2 = writeIfMissing(testFile, testTemplate)
const ok3 = writeIfMissing(benchFile, benchTemplate)

if (ok1 && ok2 && ok3) {
  console.log(`Created:
- ${srcFile}
- ${testFile}
- ${benchFile}

README row (paste into table):
| ${id} | ${title} | ${diff} | ${tags} | \`src/${cat}/${camelTitle}.ts\` | \`tests/${cat}/${fnName}.test.ts\` | \`benchmarks/${cat}/${camelTitle}.bench.ts\` | O() time, O() space |
`)
}
