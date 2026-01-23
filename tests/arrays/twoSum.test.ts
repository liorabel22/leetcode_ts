import { describe, it, expect } from 'vitest'

import { twoSum, twoSumOptimized } from '@arrays/twoSum'

describe('twoSum', () => {
  it('returns indices of two numbers that add up to target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
  })

  it('works with duplicates', () => {
    expect(twoSum([1, 9, 3, 7, 3], 6)).toEqual([2, 4])
  })

  it('returns empty array if no solution', () => {
    expect(twoSum([1, 2, 3], 7)).toEqual([])
  })
})

describe('twoSum Optimized', () => {
  it('returns indices of two numbers that add up to target', () => {
    expect(twoSumOptimized([2, 7, 11, 15], 9)).toEqual([0, 1])
  })

  it('works with duplicates', () => {
    expect(twoSumOptimized([1, 9, 3, 7, 3], 6)).toEqual([2, 4])
  })

  it('returns empty array if no solution', () => {
    expect(twoSumOptimized([1, 2, 3], 7)).toEqual([])
  })
})
