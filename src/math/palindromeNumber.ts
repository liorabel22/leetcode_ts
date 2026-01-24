// LeetCode #9: Palindrome Number
// Difficulty: Easy
// Tags: Math

// Time: O(n)
// Space: O(n)
// Description: Simplest Solution, brut force

export function isPalindrome(x: number): boolean {
  const original = String(x)
  const reversed = original.split('').reverse().join('')

  return original === reversed
}

// Time: O(n)
// Space: O(n)
// Description: Without converting x to a string

export function isPalindromeWithoutConverting(x: number): boolean {
  let newNum = x
  let reverseNum = 0

  while (newNum > 0) {
    const lastDigit = newNum % 10
    reverseNum = reverseNum * 10 + lastDigit
    newNum = Math.floor(newNum / 10)
  }

  return reverseNum === x
}
