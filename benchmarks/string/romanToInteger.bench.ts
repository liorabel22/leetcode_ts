import { bench, describe } from 'vitest'

import { romanToInt } from '@string/romanToInteger'

/**
 * Deterministic sink to prevent dead-code elimination
 */
let sink = 0
function consume(value: number): void {
  // small, deterministic operation
  sink ^= value + 31
}

void sink

/**
 * Predefined Roman numerals of increasing length / complexity
 */
const inputs: Record<string, string> = {
  tiny: 'III', // 3
  small: 'LVIII', // 58
  medium: 'MCMXCIV', // 1994
  large: 'MMMDCCCLXXXVIII', // 3888 (max typical Roman)
  repeated: 'M'.repeat(1000), // stress test: long linear input
}

describe('romanToInt benchmarks', () => {
  for (const [name, roman] of Object.entries(inputs)) {
    bench(name, () => {
      consume(romanToInt(roman))
    })
  }
})
