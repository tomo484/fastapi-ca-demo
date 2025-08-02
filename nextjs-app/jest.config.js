const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.js アプリのパスを指定
  dir: './',
})

// Jest の設定
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // CSS modules のモック
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // CSS ファイルのモック
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'features/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
}

module.exports = createJestConfig(customJestConfig) 