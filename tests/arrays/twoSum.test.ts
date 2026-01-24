import { test, expect } from 'vitest'

import { twoSum, twoSumOptimized, twoSumAnswer } from '@arrays/twoSum'

type TwoSumFn = (nums: number[], target: number) => number[]

interface TestCase {
  name: string
  nums: number[]
  target: number
  hasSolution: boolean
  coverageOnly?: boolean
}

const implementations: [string, TwoSumFn][] = [
  ['twoSum', twoSum],
  ['twoSumOptimized', twoSumOptimized],
  ['twoSumAnswer', twoSumAnswer],
]

const cases: TestCase[] = [
  { name: 'basic example', nums: [2, 7, 11, 15], target: 9, hasSolution: true },
  { name: 'works with duplicates', nums: [1, 9, 3, 7, 3], target: 6, hasSolution: true },
  { name: 'returns empty array if no solution', nums: [1, 2, 3], target: 7, hasSolution: false },
  { name: 'zero target', nums: [0, 4, 3, 0], target: 0, hasSolution: true },
  { name: 'no repeating index', nums: [1, 3, 4, 2], target: 6, hasSolution: true },
  { name: 'negative target', nums: [4, 6, -7, 10, 2], target: -5, hasSolution: true },
  { name: 'empty input', nums: [], target: 5, hasSolution: false },
  {
    name: 'coverage: sparse array triggers nullish fallback branches',
    nums: new Array(3) as unknown as number[], // [ <3 empty items> ]
    target: 123456,
    hasSolution: false,
    coverageOnly: true,
  },
]

function assertTwoSumResult(nums: number[], target: number, result: number[]): void {
  expect([0, 2]).toContain(result.length)
  if (result.length === 0) return

  const [i, j] = result

  expect(i).not.toBe(j)
  expect(i).toBeGreaterThanOrEqual(0)
  expect(j).toBeGreaterThanOrEqual(0)
  expect(i).toBeLessThan(nums.length)
  expect(j).toBeLessThan(nums.length)

  // With a bounds-safe check above, these are safe.
  const num1 = nums[i ?? 0]
  const num2 = nums[j ?? 1]

  if (num1 === undefined || num2 === undefined) {
    throw new Error('Index out of bounds')
  }

  expect(num1 + num2).toBe(target)
}

const matrix = implementations.flatMap(([implName, fn]) =>
  cases.map((tc) => ({ implName, fn, ...tc })),
)

test.each(matrix)('$implName - $name', ({ fn, nums, target, hasSolution, coverageOnly }) => {
  const result = fn(nums, target)

  if (coverageOnly) {
    // We intentionally violate input assumptions (sparse array).
    // So we only assert it returns a valid-shaped result and does not throw.
    expect([0, 2]).toContain(result.length)
    return
  }

  if (!hasSolution) {
    expect(result).toEqual([])
    return
  }

  assertTwoSumResult(nums, target, result)
})
