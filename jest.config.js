module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  modulePathIgnorePatterns: ['\\.(css|scss)$'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
