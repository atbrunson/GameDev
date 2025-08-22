import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: {
			name: 'AppLibrary',
			file: build/pkg.browser,
			format: 'umd'
		},
		plugins: [
			
		]
	},
	
	{
		input: 'src/main.js',
		external: ['ms'],		output: [
			{ file: dist/pkg.main, format: 'cjs' },
			{ file: dist/pkg.module, format: 'es' }
		]
	}
];