import { FunctionComponent } from 'react'
import { Box, Text } from 'grommet'

interface Props {
	[x: string]: any
	background?: string
	name: string
}

export const InfoBox: FunctionComponent<Props> = ({ background, name }) => (
	<Box fill margin={{ horizontal: 'medium' }} pad="9px" background={background || 'light-4'}>
		<Text truncate="tip" size="xsmall">
			{name.toUpperCase()}
		</Text>
	</Box>
)
