const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
			  rubik: ['Rubik', 'sans-serif'],
			},
			colors:{
				customOrange :{
					300:'#f46a25',
					400:'#f3590d',
					500:'#DB500B',
					600:'#B8440A',
					700:'#993808'
				},
				customBlue:{
					300:'#5600F9',
					400:'#4906c9',
					500:'#340098',
					600:'#110032'
				}
			}
		  },
	},
	plugins: [],
}
