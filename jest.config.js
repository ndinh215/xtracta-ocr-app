/** @type {import('@jest/types').Config.InitialOptions} */
const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig');

module.exports = {
    // The test environment that will be used for testing, jsdom for browser environment
    // https://jestjs.io/docs/configuration#testenvironment-string
    testEnvironment: 'jsdom',

    // A list of paths to directories that Jest should use to search for files in
    // https://jestjs.io/docs/configuration#roots-arraystring
    roots: ['<rootDir>/src/'],

    // The glob patterns Jest uses to detect test files.
    // https://jestjs.io/docs/configuration#testmatch-arraystring
    testMatch: ['**/*.spec.ts?(x)'],

    // Jest transformations
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    transform: {
        '^.+\\.(ts|tsx)?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ], // Transform TypeScript files using ts-jest,
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransform.js',
    },

    // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed
    // https://jestjs.io/docs/configuration#setupfilesafterenv-array
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    // Code coverage config
    // https://jestjs.io/docs/configuration#collectcoveragefrom-array
    coverageDirectory: '<rootDir>/coverage/',
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/__mocks__/**', '!**/node_modules/**', '!**/*.d.ts'],
    modulePaths: [compilerOptions.baseUrl],
    // Important: order matters, specific rules should be defined first
    // https://jestjs.io/fr/docs/configuration#modulenamemapper-objectstring-string--arraystring
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        '^.+\\.module\\.(css|sass|scss|less)$': 'identity-obj-proxy',
        // Handle TypeScript path aliases
        '^@/(.*)$': '<rootDir>/src/$1',
        ...pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
    },
    verbose: true,
    testTimeout: 30000,
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
};
