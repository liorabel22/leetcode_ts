import { bench, describe } from 'vitest'

import { romanToInt } from '@string/romanToInteger'

type RomanToIntegerFn = () => void

const implementations: [string, RomanToIntegerFn][] = [
  ['romanToInt', romanToInt],
];

// Prevent dead-code elimination
let sink = 0
function consume(result: any): void {
  sink ^= TODO
}

void sink // prevent unused variable warning

const inputs: Record<string, number> = {
  // 'small input': TODO,
  // 'large input': TODO,
}

describe('LeetCode #13 - Roman to Integer benchmarks', () => {
  for (const [implName, fn] of implementations) {
    describe(implName, () => {
      for (const [sizeName, value] of Object.entries(inputs)) {
        bench(sizeName, () => {
          const result = fn(value)
          consume(result)
        })
      }
    })
  }
})
