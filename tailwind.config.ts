import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: colors.slate[600],
				'primary-fg': colors.white,
				secondary: colors.white,
				'secondary-fg': colors.black
			},
			fontFamily: {
				sans: ['Noto Sans KR', 'sans-serif'],
				logo: 'Newsreader'
			}
		}
	},

	plugins: []
} as Config;
