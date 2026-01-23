import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@arrays': path.resolve(__dirname, 'src/arrays'),
      '@linked-list': path.resolve(__dirname, 'src/linked-list'),
    }
  }
})
