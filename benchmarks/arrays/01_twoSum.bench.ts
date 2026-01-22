// import { bench, describe } from 'vitest'
// import { twoSum } from '../../src/arrays/twoSum'

// function makeInput(n: number): { nums: number[]; target: number } {
//   const nums = Array.from({ length: n }, (_, i) => i)
//   // Force a solution near the end
//   const target = (n - 2) + (n - 1)
//   return { nums, target }
// }

// describe('twoSum benchmarks', () => {
//   bench('twoSum n=1e3', () => {
//     const { nums, target } = makeInput(1_000)
//     twoSum(nums, target)
//   })

//   bench('twoSum n=1e5', () => {
//     const { nums, target } = makeInput(100_000)
//     twoSum(nums, target)
//   })
// })