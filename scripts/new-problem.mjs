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

const args = parseArgs(process.argv.slice(2))

const id = args.get('id')
const slug = args.get('slug')
const cat = args.get('cat') ?? 'misc'
const title = args.get('title') ?? slug
const diff = args.get('diff') ?? 'Unknown'
const tags = args.get('tags') ?? ''

if (!id || !slug) {
  console.error(
    'Usage:\n  npm run new -- --id 1 --slug two-sum --cat arrays --title "Two Sum" --diff Easy --tags "Array, HashMap"'
  )
  process.exit(1)
}

const fnName = toCamel(slug)

const srcDir = path.join('src', cat)
const testDir = path.join('tests', cat)
const benchDir = path.join('benchmarks', cat)

ensureDir(srcDir)
ensureDir(testDir)
ensureDir(benchDir)

const srcFile = path.join(srcDir, `${fnName}.ts`)
const testFile = path.join(testDir, `${fnName}.test.ts`)
const benchFile = path.join(benchDir, `${fnName}.bench.ts`)

const srcTemplate = `// LeetCode #${id}: ${title}
// Difficulty: ${diff}
// Tags: ${tags}
//
// Time: ?
// Space: ?

export function ${fnName}(): void {
  // TODO
}
`

const testTemplate = `import { describe, it, expect } from 'vitest'

import { ${fnName} } from '../../src/${cat}/${fnName}'

describe('${fnName}', () => {
  it('TODO', () => {
    // Arrange / Act
    ${fnName}()

    // Assert
    expect(true).toBe(true)
  })
})
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
| ${id} | ${title} | ${diff} | ${tags} | \`src/${cat}/${fnName}.ts\` | \`tests/${cat}/${fnName}.test.ts\` | \`benchmarks/${cat}/${fnName}.bench.ts\` |  |
`)
}
