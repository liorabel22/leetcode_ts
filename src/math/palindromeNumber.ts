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
// Space: O(1)
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

// Time: O(log10(n))
// Space: O(1)
// Description: Compare digits from start and end without extra space

export function isPalindromeOptimized(x: number): boolean {
  if (x < 0) return false
  if (x < 10) return true

  let divisor = 1
  while (Math.floor(x / divisor) >= 10) {
    divisor *= 10
  }

  let left = x
  let right = x

  while (left > 0) {
    const leftDigit = Math.floor(left / divisor)
    const rightDigit = right % 10

    if (leftDigit !== rightDigit) {
      return false
    }

    left = left % divisor // Remove leftmost digit
    left = Math.floor(left / 10) // Remove rightmost digit
    right = Math.floor(right / 10) // Remove rightmost digit

    divisor = divisor / 100 // Adjust divisor for two removed digits
  }

  return true
}
