import { test, expect } from 'vitest'

import { romanToInt } from '@string/romanToInteger'

type RomanToIntegerFn = () => void

const implementations: [string, RomanToIntegerFn] = [
  'romanToInt', romanToInt
];

interface TestCase {
  name: string;
  input: any;
  // TODO
}

const cases: TestCase[] = [
  { name: 'base example', ...}
];

function assertRomanToIntegerResult(): void {
  // TODO
}

const matrix = implementations.flatMap(([implName, fn]) =>
  cases.map((tc) => ({ implName, fn, ...tc })),
);

test.each(matrix)('$implName - $name', ({ fn, input, ... }) => {
  const result = fn(input);

  expect(result).toBeDefined()

  assertRomanToIntegerResult();
});
