import type {Config} from 'jest';

const config: Config = {
    verbose: true,
    modulePaths: ['<rootDir>/src/'],
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
    testMatch: ['<rootDir>/tests/**/*.(test).{js,jsx,ts,tsx}'],
    preset: 'ts-jest'
};

export default config;