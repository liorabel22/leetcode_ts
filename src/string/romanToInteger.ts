// LeetCode #13: Roman to Integer
// Difficulty: Easy
// Tags: Hash Table, Math, String
//
// Time: O(n)
// Space: O(1)

export function romanToInt(s: string): number {
  const romanMap: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    O: 0,
  }

  let sum = 0
  for (let i = 0; i < s.length; i++) {
    // Safe: i < s.length ensures s[i] is always defined
    const currentRomanKey = s.charAt(i)
    const nextRomanKey = s.charAt(i + 1) || 'O'

    let currentValue = romanMap[currentRomanKey] ?? 0
    const nextValue = romanMap[nextRomanKey] ?? 0

    if (currentValue < nextValue) {
      currentValue *= -1
    }

    sum += currentValue
  }

  return sum
}
