import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontSize: {
				'large-title': ['34px', { lineHeight: '41px', letterSpacing: '-0.4px' }],
				'large-title-emphasized': [
					'34px',
					{ lineHeight: '41px', letterSpacing: '-0.4px', fontWeight: '700' },
				],
				'title-3': ['20px', { lineHeight: '25px', letterSpacing: '-0.4px' }],
				'title-3-emphasized': [
					'20px',
					{ lineHeight: '25px', fontWeight: '590', letterSpacing: '-0.4px' },
				],
				body: ['17px', { lineHeight: '22px', letterSpacing: '-0.4px' }],
				'body-emphasized': [
					'17px',
					{ lineHeight: '22px', fontWeight: '590', letterSpacing: '-0.4px' },
				],
				subheadline: ['15px', { lineHeight: '20px', letterSpacing: '-0.4px' }],
				'subheadline-emphasized': [
					'15px',
					{ lineHeight: '20px', fontWeight: '590', letterSpacing: '-0.4px' },
				],
				footnote: ['13px', { lineHeight: '18px', letterSpacing: '-0.4px' }],
				'footnote-emphasized': ['13px', { lineHeight: '18px', fontWeight: '590' }],
				heading: ['13px', { lineHeight: '16px' }],
			},
			colors: {
				system: {
					red: {
						light: 'rgba(255, 59, 48, 1)',
						dark: 'rgba(255, 69, 58, 1)',
					},
					orange: {
						light: 'rgba(255, 149, 0, 1)',
						dark: 'rgba(255, 159, 10, 1)',
					},
					yellow: {
						light: 'rgba(255, 204, 0, 1)',
						dark: 'rgba(255, 214, 10, 1)',
					},
					green: {
						light: 'rgba(52, 199, 89, 1)',
						dark: 'rgba(48, 209, 88, 1)',
					},
					mint: {
						light: 'rgba(0, 199, 190, 1)',
						dark: 'rgba(99, 230, 226, 1)',
					},
					teal: {
						light: 'rgba(48, 176, 199, 1)',
						dark: 'rgba(64, 203, 224, 1)',
					},
					cyan: {
						light: 'rgba(50, 173, 230, 1)',
						dark: 'rgba(100, 210, 255, 1)',
					},
					blue: {
						light: 'rgba(0, 122, 255, 1)',
						dark: 'rgba(10, 132, 255, 1)',
					},
					indigo: {
						light: 'rgba(88, 86, 214, 1)',
						dark: 'rgba(94, 92, 230, 1)',
					},
					purple: {
						light: 'rgba(175, 82, 222, 1)',
						dark: 'rgba(191, 90, 242, 1)',
					},
					pink: {
						light: 'rgba(255, 45, 85, 1)',
						dark: 'rgba(255, 55, 95, 1)',
					},
					brown: {
						light: 'rgba(162, 132, 94, 1)',
						dark: 'rgba(172, 142, 104, 1)',
					},
					primary: {
						light: 'rgba(255, 255, 255, 1)',
						dark: {
							elevated: 'rgba(28, 28, 30, 1)',
							DEFAULT: 'rgba(0, 0, 0, 1)',
						},
					},
					secondary: {
						light: 'rgba(242, 242, 247, 1)',
						dark: {
							elevated: 'rgba(44, 44, 46, 1)',
							DEFAULT: 'rgba(28, 28, 30, 1)',
						},
					},
					tertiary: {
						light: 'rgba(255, 255, 255, 1)',
						dark: {
							elevated: 'rgba(58, 58, 60, 1)',
							DEFAULT: 'rgba(44, 44, 46, 1)',
						},
					},
					grouped: {
						primary: {
							light: 'rgba(242, 242, 247, 1)',
							dark: {
								elevated: 'rgba(28, 28, 30, 1)',
								DEFAULT: 'rgba(0, 0, 0, 1)',
							},
						},
						seconday: {
							light: 'rgba(255, 255, 255, 1)',
							dark: {
								elevated: 'rgba(44, 44, 46, 1)',
								DEFAULT: 'rgba(28, 28, 30, 1)',
							},
						},
						tetiary: {
							light: 'rgba(242, 242, 247, 1)',
							dark: {
								elevated: 'rgba(58, 58, 60, 1)',
								DEFAULT: 'rgba(44, 44, 46, 1)',
							},
						},
					},
				},

				label: {
					primary: {
						light: 'rgba(0, 0, 0, 1)',
						dark: 'rgba(255, 255, 255, 1)',
					},
					secondary: {
						light: 'rgba(60, 60, 67, 0.60)',
						dark: 'rgba(235, 235, 245, 0.60)',
					},
					tetiary: {
						light: 'rgba(60, 60, 67, 0.30)',
						dark: 'rgba(235, 235, 245, 0.30)',
					},
					quternary: {
						light: 'rgba(60, 60, 67, 0.18)',
						dark: 'rgba(235, 235, 245, 0.16)',
					},
				},

				fill: {
					primary: {
						light: 'rgba(120, 120, 128, 0.2)',
						dark: 'rgba(120, 120, 128, 0.36)',
					},
					secondary: {
						light: 'rgba(120, 120, 128, 0.16)',
						dark: 'rgba(120, 120, 128, 0.32)',
					},
					tetiary: {
						light: 'rgba(118, 118, 128, 0.12)',
						dark: 'rgba(118, 118, 128, 0.24)',
					},
					quternary: {
						light: 'rgba(116, 116, 128, 0.08)',
						dark: 'rgba(116, 116, 128, 0.18)',
					},
				},

				separator: {
					opaque: {
						light: 'rgba(198, 198, 200, 1)',
						dark: 'rgba(56, 56, 58, 1)',
					},
					nonopaque: {
						light: 'rgba(60, 60, 67, 0.36)',
						dark: 'rgba(84, 84, 88, 0.65)',
					},
				},
			},
		},
	},
	plugins: [],
};
export default config;
