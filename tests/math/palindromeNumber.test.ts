import { test, expect } from 'vitest'

import {
  isPalindrome,
  isPalindromeWithoutConverting,
  isPalindromeOptimized,
} from '@math/palindromeNumber'

type IsPalindromeFn = (x: number) => boolean

const implementations: [string, IsPalindromeFn][] = [
  ['isPalindrome', isPalindrome],
  ['isPalindromeWithoutConverting', isPalindromeWithoutConverting],
  ['isPalindromeOptimized', isPalindromeOptimized],
]

interface TestCase {
  name: string
  input: number
  output: boolean
}

const cases: TestCase[] = [
  { name: 'basic example', input: 101, output: true },
  { name: 'negative number', input: -101, output: false },
  { name: 'two digit number false', input: 10, output: false },
  { name: 'two digit number true', input: 33, output: true },
  { name: 'zero', input: 0, output: true },
]

function assertIsPalindromeResult(expected: boolean, result: boolean): void {
  expect(expected).toBe(result)
}

const matrix = implementations.flatMap(([implName, fn]) =>
  cases.map((tc) => ({ implName, fn, ...tc })),
)

test.each(matrix)('$implName - $name', ({ fn, input, output }) => {
  const result = fn(input)

  expect(result).toBeDefined()

  assertIsPalindromeResult(output, result)
})
