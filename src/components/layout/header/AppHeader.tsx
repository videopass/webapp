import { Box, Button, Text } from 'grommet'
import { FunctionComponent } from 'react'
import { headerBackgroundColor, yellow } from '../../../theme'

interface Props {
	appName: string
	appIcon: any
	onToggleSidebar: any
}

export const AppHeader: FunctionComponent<Props> = ({ appName, appIcon, onToggleSidebar }) => (
	<Box
		tag="header"
		direction="row"
		background={headerBackgroundColor}
		align="center"
		justify="between"
		responsive={false}
		pad={{ vertical: 'small' }}
		style={{ position: 'relative' }}
	>
		<Button onClick={onToggleSidebar}>
			<Box flex={false} direction="row" align="center" margin={{ left: 'small' }}>
				{appIcon}
				<Text margin={{ left: 'small', vertical: 'none' }} color={yellow}>
					{appName}
				</Text>
			</Box>
		</Button>
	</Box>
)
