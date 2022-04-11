'use strict';

const { strict } = require('assert');
const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  testEnvironment: 'node',
  displayName: 'root-tests',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  clearMocks: true,
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/tests/**',
    '!<rootDir>/src/config/**',
    '!<rootDir>/src/**/*server.ts',
    '!<rootDir>/src/**/*index.ts',
    '!<rootDir>/src/**/*router.ts',
  ],
  coverageDirectory: 'coverage',
};
