import { FunctionComponent } from 'react'
import { Box } from 'grommet'
import { VideopassTranscodedVideo } from '@videopass/model'

type Props = {
	video: VideopassTranscodedVideo
	large?: boolean
}
// todo: expire or last update time + 2 days is gone
export const Player: FunctionComponent<Props> = ({ video, large }) => {
	const playerSrc = `https://player.thetavideoapi.com/video/${video.thetaId}`
	const player = <iframe src={playerSrc} width="100%" height="100%" style={{ border: 'none' }} />

	const height = 180 * 2
	const width = 320 * 2
	return (
		<Box height={`${height}px`} width={`${width}px`} pad="none" margin="none">
			{player}
		</Box>
	)
}

export default Player
