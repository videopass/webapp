import React, { FunctionComponent } from 'react'
import { Box, Button, Text } from 'grommet'
import { StatusBadge } from './StatusBadge'
import { Link } from 'react-router-dom'
import { StateEnum, VideopassTranscodedVideo, VideopassVideo } from '@videopass/model'
import Player from './common/Player'
import { menuHoverColor, white } from '../theme'
import { secondsToTimecode } from './common/ColumnHelpers'

interface Props {
	video: VideopassTranscodedVideo
	path: string
}

export const VideoCard: FunctionComponent<Props> = ({ video, path }) => (
	<Link to={path}>
		<Button hoverIndicator={menuHoverColor}>
			<Box pad="xsmall" gap="xsmall">
				<Box direction="row" align="center" justify="between">
					<Text color={white}>{video.name}</Text>
					<Text size="small" color={white}>
						{secondsToTimecode(video.duration)}
					</Text>
				</Box>
				<Player video={video} />
			</Box>
		</Button>
	</Link>
)
