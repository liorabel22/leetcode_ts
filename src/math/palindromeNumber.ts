// LeetCode #9: Palindrome Number
// Difficulty: Easy
// Tags: Math

// Time: O(n)
// Space: O(n)

export function isPalindrome(x: number): boolean {
  const original = String(x);
  const reversed = original.split('').reverse().join('');

  return original === reversed;
}
