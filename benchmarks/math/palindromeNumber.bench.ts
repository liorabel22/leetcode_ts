import { bench, describe } from 'vitest'

import {
  isPalindrome,
  isPalindromeWithoutConverting,
  isPalindromeOptimized,
} from '@math/palindromeNumber'

type PalindromeFn = (x: number) => boolean

const implementations: [string, PalindromeFn][] = [
  ['isPalindrome (string)', isPalindrome],
  ['isPalindromeWithoutConverting', isPalindromeWithoutConverting],
  ['isPalindromeOptimized', isPalindromeOptimized],
]

// Prevent dead-code elimination
let sink = 0
function consume(result: boolean): void {
  sink ^= result ? 1 : 0
}
void sink // prevent unused variable warning

/**
 * Generate palindromic numbers of a given digit length
 * Example: size=6 -> 123321
 */
function makePalindrome(size: number): number {
  const half = Math.floor(size / 2)
  const base = Math.pow(10, half - 1)
  const left = base + Math.floor(Math.random() * base)
  const right = Number(String(left).split('').reverse().join(''))
  return size % 2 === 0
    ? left * Math.pow(10, half) + right
    : left * Math.pow(10, half + 1) + Math.floor(Math.random() * 10) * Math.pow(10, half) + right
}

/**
 * Pre-generate inputs so benchmarks only measure algorithm cost
 */
const inputs: Record<string, number> = {
  '3 digits': makePalindrome(3),
  '6 digits': makePalindrome(6),
  '9 digits': makePalindrome(9),
  '12 digits': makePalindrome(12),
}

describe('LeetCode #9 - Palindrome Number benchmarks', () => {
  for (const [implName, fn] of implementations) {
    describe(implName, () => {
      for (const [sizeName, value] of Object.entries(inputs)) {
        bench(sizeName, () => {
          consume(fn(value))
        })
      }
    })
  }
})
