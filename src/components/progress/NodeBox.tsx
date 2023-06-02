import { FunctionComponent } from 'react'
import { Box, Meter, Text } from 'grommet'
import { BaseVideo } from '@videopass/model'
import { barColor, black, okColor } from '../../theme'
import { dark } from '../../theme'

interface Props {
	[x: string]: any
	background?: string
	video: BaseVideo
}

export const NodeBox: FunctionComponent<Props> = ({ id, background, video }) => (
	<Box fill margin={{ horizontal: 'medium' }} pad="9px" background={dark} border={{ color: background, side: 'left', size: 'medium' }}>
		{/* <Text size="xsmall">{task.toUpperCase()}</Text> */}
		<Box direction="row" align="center">
			<Meter  thickness="xsmall" type="bar"  background={barColor} values={[{ value: video.progress, color: okColor }]} />
			<Text size="small" margin={{ left: 'small' }}>
				{video.progress}%
			</Text>
		</Box>
	</Box>
)
