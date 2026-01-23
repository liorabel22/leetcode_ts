import { bench, describe } from 'vitest'

import { twoSum, twoSumOptimized } from '@arrays/twoSum'

function makeInput(n: number): { nums: number[]; target: number } {
  const nums = Array.from({ length: n }, (_, i) => i)
  const target = n - 2 + (n - 1)
  return { nums, target }
}

describe('twoSum benchmarks', () => {
  bench('n=1e3', () => {
    const { nums, target } = makeInput(1_000)
    twoSum(nums, target)
  })

  bench('n=1e5', () => {
    const { nums, target } = makeInput(100_000)
    twoSum(nums, target)
  })
})

describe('twoSum Optimized benchmarks', () => {
  bench('n=1e3', () => {
    const { nums, target } = makeInput(1_000)
    twoSumOptimized(nums, target)
  })

  bench('n=1e5', () => {
    const { nums, target } = makeInput(100_000)
    twoSumOptimized(nums, target)
  })
})
