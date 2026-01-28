import { describe, it, expect } from 'vitest'

import { romanToInt } from '@string/romanToInteger'

const romanToIntTyped: RomanToIntegerFn = romanToInt as RomanToIntegerFn

type RomanToIntegerFn = (s: string) => number

describe('romanToInt', () => {
  it('converts single roman numerals', () => {
    expect(romanToIntTyped('I')).toBe(1)
    expect(romanToIntTyped('V')).toBe(5)
    expect(romanToIntTyped('X')).toBe(10)
    expect(romanToIntTyped('L')).toBe(50)
    expect(romanToIntTyped('C')).toBe(100)
    expect(romanToIntTyped('D')).toBe(500)
    expect(romanToIntTyped('M')).toBe(1000)
  })

  it('converts numerals with additive notation', () => {
    expect(romanToIntTyped('III')).toBe(3)
    expect(romanToIntTyped('VIII')).toBe(8)
    expect(romanToIntTyped('LVIII')).toBe(58)
    expect(romanToIntTyped('MMXXIII')).toBe(2023)
  })

  it('converts numerals with subtractive notation', () => {
    expect(romanToIntTyped('IV')).toBe(4)
    expect(romanToIntTyped('IX')).toBe(9)
    expect(romanToIntTyped('XL')).toBe(40)
    expect(romanToIntTyped('XC')).toBe(90)
    expect(romanToIntTyped('CD')).toBe(400)
    expect(romanToIntTyped('CM')).toBe(900)
  })

  it('converts mixed additive and subtractive numerals', () => {
    expect(romanToIntTyped('MCMXCIV')).toBe(1994)
    expect(romanToIntTyped('XLII')).toBe(42)
    expect(romanToIntTyped('CDXLIV')).toBe(444)
  })

  it('handles empty string', () => {
    expect(romanToIntTyped('')).toBe(0)
  })

  it('handles invalid or unknown characters gracefully', () => {
    expect(romanToIntTyped('A')).toBe(0)
    expect(romanToIntTyped('IA')).toBe(1)
    expect(romanToIntTyped('AI')).toBe(1)
  })

  it('handles trailing character without next value using fallback O', () => {
    // last character compares against 'O' → value 0
    expect(romanToIntTyped('I')).toBe(1)
    expect(romanToIntTyped('X')).toBe(10)
  })
})
