import { bench, describe } from 'vitest'

import { twoSum, twoSumAnswer, twoSumOptimized } from '@arrays/twoSum'

type TwoSumFn = (nums: number[], target: number) => number[]
interface InputRecord {
  nums: number[]
  target: number
}

function makeInput(n: number): InputRecord {
  // Create a solution near the end
  const nums = Array.from({ length: n }, (_, i) => i)
  const target = n - 2 + (n - 1)
  return { nums, target }
}

/**
 * Pre-generate inputs once to avoid measuring array creation.
 */
interface Input {
  'n=1e3': InputRecord
  'n=1e5': InputRecord
}

const inputs: Input = {
  'n=1e3': makeInput(1_000),
  'n=1e5': makeInput(100_000),
}

/**
 * Implementations to compare.
 */
const implementations: readonly [name: string, fn: TwoSumFn][] = [
  ['twoSum', twoSum],
  ['twoSumOptimized', twoSumOptimized],
  ['twoSumAnswer', twoSumAnswer],
]

/**
 * Consume results to discourage dead-code elimination / overly clever engines.
 * Also adds a tiny, consistent side effect cost.
 */
let sink = 0
function consume(result: number[]): void {
  // deterministic small reduction
  sink ^= (result[0] ?? 0) + 31 * (result[1] ?? 0)
}

void sink // prevent unused variable warning

describe('twoSum benchmarks', () => {
  for (const [implName, fn] of implementations) {
    describe(implName, () => {
      for (const [sizeName, input] of Object.entries(inputs) as [string, InputRecord][]) {
        // important: reuse the same input object
        bench(sizeName, () => {
          const nums = input.nums
          const target = input.target
          consume(fn(nums, target))
        })
      }
    })
  }
})
