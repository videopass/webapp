import { FunctionComponent, useState } from 'react'
import { Box, Grommet } from 'grommet'
import { black, customTheme, dark } from '../../theme'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './header/AppHeader'
import { Sidebar } from './Sidebar'
import { NavigationItem } from '../../interfaces/NavigationItem'
import { ReactComponent as Videopass } from '../../content/videopass.svg'
import { Dashboard, Multimedia, Support } from 'grommet-icons'

const items: NavigationItem[] = [
	{
		active: true,
		label: 'Dashboard',
		path: '/',
		icon: <Dashboard color="dark-5" />,
	},
	{
		active: true,
		label: 'Videos',
		path: '/videos',
		icon: <Multimedia color="dark-5" />,
	},
	{
		active: false,
		label: 'Support',
		path: '/support',
		icon: <Support color="dark-5" />,
	},
]

export const Layout: FunctionComponent = () => {
	const [showSidebar, setShowSidebar] = useState<Boolean>(true)

	const onToggleSidebar = () => setShowSidebar(!showSidebar)
	return (
		<Grommet theme={customTheme} full>
			<Box fill background={black}>
				{/* <AppHeader appName="videopass" appIcon={<Videopass />} onToggleSidebar={onToggleSidebar} /> */}
				<Box direction="row" flex>
					{showSidebar && (
						<Box pad={{ bottom: 'small', end: 'xsmall', left: 'small', top: 'none' }} border={{ side: 'end', color: dark, size: 'medium' }}>
							<Sidebar appIcon={<Videopass />} items={items} onToggleSidebar={onToggleSidebar} />
						</Box>
					)}
					<Box flex pad="xsmall">
						<Outlet />
					</Box>
				</Box>
			</Box>
		</Grommet>
	)
}
