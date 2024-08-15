import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/',
	}),
	testRegex: '.*\\.test\\.ts$',
	globalSetup: './test/setup.ts',
	globalTeardown: './test/teardown.ts',
}
