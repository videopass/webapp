import React, { FunctionComponent } from 'react'
import { Menu, Text } from 'grommet'
import { NavigationItem } from '../../../interfaces/NavigationItem'

interface Props{
items: NavigationItem[]
}

export const UserMenu : FunctionComponent<Props> = ({ items = [], ...rest }) => (
	<Menu
		dropAlign={{ top: 'bottom', right: 'right' }}
		icon={false}
		items={items.map((item) => ({
			...item,
			label: <Text size="small">{item.label}</Text>,
			onClick: () => {}, // no-op
		}))}
		
		{...rest}
	/>
)
