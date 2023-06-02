import React, { Component, FunctionComponent, useContext } from 'react'
import { Box, Button, Layer, ResponsiveContext } from 'grommet'
import { FormClose, Multimedia } from 'grommet-icons'
import { NavigationItem } from '../../interfaces/NavigationItem'
import { LinkButton } from './LinkButton'
import { menuBackgroundColor } from '../../theme'

interface Props {
	items: NavigationItem[]
	appIcon: any
	onToggleSidebar: any
	[x: string]: any
}

export const Sidebar: FunctionComponent<Props> = ({ items, appIcon, onToggleSidebar, rest }) => {
	const size = useContext(ResponsiveContext)
	const SidebarComponent = size === 'small' ? Layer : Box
	const sidebarProps =
		size === 'small'
			? { full: true }
			: {
					fill: 'vertical',
					width: '140px',
					background: menuBackgroundColor,
			  }

	return (
		<SidebarComponent {...sidebarProps} {...rest}>
			{size === 'small' && (
				<Box align="end">
					<Button icon={<FormClose />} onClick={onToggleSidebar} />
				</Box>
			)}
			{items.map(({ active, label, path, icon }) => (
				<LinkButton active={active} path={path} label={label} key={label} icon={icon} />
			))}
		</SidebarComponent>
	)
}
