import { FunctionComponent } from 'react'
import { Box } from 'grommet'
import { BaseVideo } from '@videopass/model'
import { NodeBox } from './NodeBox'
import { transferColor, transcodeColor, uploadColor, makeStreamableColor, light, dark } from '../../theme'
import { InfoBox } from './InfoBox'

interface Props {
	[x: string]: any
	video: BaseVideo
}

export const ProgressDiagram: FunctionComponent<Props> = ({ video }) => {
	// create a array of videos based on the video state
	// Transferring = 1,
	// Transferred = 2,
	// Downloading = 3,
	// Downloaded = 4,
	// Transcoding = 5,
	// Transcoded = 6,
	// Uploading = 7,
	// Uploaded = 8
	// created = 9,
	// processing = 10,
	// success = 11

	const videos: BaseVideo[] = [
		{
			...video,
			// if the video state is smaller then 2 then progress is video.progress
			// else if the video state is bigger then 2 and smaller then 4 then progress is video.progress
			// else 100
			progress: video.state < 2 ? 0 : video.state >= 2 && video.state < 4 ? video.progress : 100,
		},
		{
			...video,
			progress: video.state < 4 ? 0 : video.state >= 4 && video.state < 6 ? video.progress : 100,
		},
		{
			...video,
			progress: video.state < 6 ? 0 : video.state >= 6 && video.state < 8 ? video.progress : 100,
		},
		{
			...video,
			progress: video.state < 9 ? 0 : video.state >= 9 && video.state < 11 ? video.progress : 100,
		},
	]

	const infoNode = <InfoBox name={video.name} video={video} key={`${video.id}-0`} background={light} />
	const node01 = <NodeBox video={videos[0]} key={`${video.id}-1`} background={transferColor} />
	const node02 = <NodeBox video={videos[1]} key={`${video.id}-2`} background={transcodeColor} />
	const node03 = <NodeBox video={videos[2]} key={`${video.id}-3`} background={uploadColor} />
	const node04 = <NodeBox video={videos[3]} key={`${video.id}-4`} background={makeStreamableColor} />

	const nodes = [infoNode, node01, node02, node03, node04]

	return (
		<Box direction="row" border={{ side: 'bottom', size: 'xsmall', color: dark }} pad="small">
			{nodes}
		</Box>
	)
}
