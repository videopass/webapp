import { grommet, ThemeType } from 'grommet/themes'
import { deepMerge } from 'grommet/utils'

export const yellow = '#FDC800'
export const orange = '#DE7C09'
export const black = '#292A31'
export const white = '#FFFFFF'
export const dark = '#181A1F'
export const light = '#545763'
export const grey	= 'dark-3'

export const headerBackgroundColor = dark

// progress colors
export const connectionColor = grey
export const transferColor = '#3C3CBA'
export const uploadColor = '#e8c651'
export const transcodeColor = '#C74489'
export const makeStreamableColor = '#017A8B'
export const barColor = '#3e404a'

export const baseColor = 'neutral-3'
export const dimColor = 'light-4'
export const lightColor = '#F8F8F8'
export const menuBackgroundColor = black
export const menuHoverColor = orange
export const inactiveColor = '#999999'
export const activeColor = '#333333'
export const alertColor = '#D45633'
export const okColor = '#05AE82'
export const iconColor = '#333333'

export const customTheme: ThemeType = deepMerge(grommet, {
	global: {
		font: {
			family: 'sans-serif;',
			size: '16px',
			height: '20px',
			color: white,
		},
		colors: {
			active: 'dark-5',
			placeholder: 'rgba(255, 255,255, 0.4)',
		},
		
		input: {
			weight: 500,
		},
		size: {
			avatar: '36px',
			sidebar: '60px',
		},
	},
	icon: {
		size: {
			medium: '18px',
		},
	},
	paragraph: {
		medium: {
			size: '16px',
			height: '20px',
		},
		large: {
			size: '20px',
			height: '24px',
		},
	},
	text: {
		medium: {
			size: '16px',
			height: '20px',
			color: white,
		},
		large: {
			size: '20px',
			height: '24px',
			color: white,
		},
	},
})
