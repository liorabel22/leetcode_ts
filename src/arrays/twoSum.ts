// LeetCode #1: TwoSum
// Difficulty: Easy
// Tags: Array, Hash Table

// Time: O(n^2)
// Space: O(1)
// Description: Simplest Solution, brut force

export function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const num1 = nums[i] ?? 0
      const num2 = nums[j] ?? 1
      const sum = num1 + num2
      const isSumEqualTarget = sum === target
      if (isSumEqualTarget) {
        return [i, j]
      }
    }
  }
  return []
}

// Time: O(n)
// Space: O(n)
// Description: Optimized Solution

export function twoSumOptimized(nums: number[], target: number): number[] {
  const numsMap = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]
    if (value === undefined) {
      continue
    }
    numsMap.set(value, i)
  }

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i] ?? -1
    const missingNumber: number = target - value
    const secondIndex = numsMap.get(missingNumber)
    if (secondIndex !== undefined && secondIndex !== i) {
      return [i, secondIndex]
    }
  }

  return []
}

// Time: O(n)
// Space: O(n)
// Description: After submission improvements

export function twoSumAnswer(nums: number[], target: number): number[] {
  const numsMap = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const currentValue = nums[i] ?? 0
    const missingNumber = target - currentValue
    const missingIndex = numsMap.get(missingNumber)

    if (missingIndex !== undefined) {
      return [i, missingIndex]
    }
    numsMap.set(currentValue, i)
  }

  return []
}
