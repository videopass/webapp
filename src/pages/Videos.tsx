import { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import { Box, Heading, Grid, Text, Button, DataTable, Layer } from 'grommet'
import { VideopassTranscodedVideo, StateEnum } from '@videopass/model'
import { CollectionNames, log } from '@videopass/services'
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore'
import CopyToClipboard from 'react-copy-to-clipboard'
import { secondsToTimecode, dateTime, getFirstAndLastChars, numberToEnum } from '../components/common/ColumnHelpers'
import { db } from '../services/Firebase'
import { Clipboard, StatusGood, FormClose } from 'grommet-icons'
import { alertColor, okColor } from '../theme'
import { VideoCard } from '../components/VideoCard'
import { CopyUrlButton } from '../components/common/CopyUrlButton'

export const Videos = () => {
	const [transcoded, setVideos] = useState<VideopassTranscodedVideo[]>([])
	const ref = collection(db, CollectionNames.files)
	const [copied, setCopied] = useState<boolean>(false)
	const [open, setOpen] = useState<boolean>()
	const [lastVideo, setLastVideo] = useState<VideopassTranscodedVideo | undefined>(undefined)

	useEffect(() => {
		const q = query(ref, where('state', '==', StateEnum.success))
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const files = new Array<VideopassTranscodedVideo>()
				querySnapshot.forEach((doc) => {
					files.push(doc.data() as VideopassTranscodedVideo)
				})
				setVideos(files)
				setLastVideo(files.filter((x) => x.state === StateEnum.success).sort((a, b) => (a.update_unix > b.update_unix ? -1 : 1))[0])
			},
			(error) => {
				log.error(error, `Error getting videos: ${CollectionNames.files}`)
			}
		)

		return unsubscribe
	}, [])

	const onClose = () => setOpen(undefined)

	const onCopied = () => {
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 3000)
	}

	return (
		<Box fill>
			{copied && (
				<Layer position="bottom" modal={false} margin={{ vertical: 'medium', horizontal: 'small' }} onEsc={onClose} responsive={false} plain>
					<Box
						align="center"
						direction="row"
						gap="small"
						justify="between"
						round="xxsmall"
						pad={{ vertical: 'xsmall', horizontal: 'small' }}
						background={okColor}
					>
						<Box align="center" direction="row" gap="xsmall">
							<StatusGood />
							<Text>Copied to clipboard (this message will close after 3 seconds)</Text>
						</Box>
						<Button icon={<FormClose />} onClick={() => setCopied(false)} plain />
					</Box>
				</Layer>
			)}

			<Text size="small" color="dark-5">
				Theta Network Streamable Videos
			</Text>
			{lastVideo && <VideoCard video={lastVideo} key={lastVideo.name} path={`/videos/${lastVideo.id}`} />}

			<DataTable
				margin={{ top: 'small' }}
				data={transcoded}
				sortable
				step={10}
				paginate
				primaryKey={true}
				columns={[
					{
						property: 'id',
						primary: true,
						render: () => <></>,
						size: '1px',
					},
					{
						property: 'name',
						render: (datum: VideopassTranscodedVideo) => <Text size="small">{datum.name}</Text>,
						header: (
							<Text size="small" color="dark-5">
								Name
							</Text>
						),
						search: true,
						verticalAlign: 'top',
					},
					{
						property: 'duration',
						render: (datum: VideopassTranscodedVideo) => (
							<Text size="small" color="dark-5">
								{secondsToTimecode(datum.duration)}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								Duration
							</Text>
						),
						verticalAlign: 'top',
						size: '80px',
					},
					{
						property: 'resolution',
						align: 'end',
						render: (datum: VideopassTranscodedVideo) => (
							<Text size="small" color="dark-5">
								{datum.resolution}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								resolution
							</Text>
						),
						verticalAlign: 'top',
						size: '60px',
					},

					{
						property: 'create_time',
						render: (datum: VideopassTranscodedVideo) => dateTime(datum.create_time),
						header: (
							<Text size="small" color="dark-5">
								create time
							</Text>
						),
						verticalAlign: 'top',
						size: '120px',
					},

					{
						property: '',
						render: (datum: VideopassTranscodedVideo) => <CopyUrlButton onCopied={onCopied} url={datum.playback_uri || ''} />,
						header: '',
						size: '30px',
						verticalAlign: 'top',
					},
					{
						property: 'playback_uri',
						render: (datum: VideopassTranscodedVideo) => (
							<Text size="small" color="dark-5" tip={{ content: datum.playback_uri || '', plain: true, dropProps: { align: { right: 'left' } } }}>
								{getFirstAndLastChars(datum.playback_uri)}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								playback url
							</Text>
						),
						verticalAlign: 'top',
					},
					{
						property: 'drm',
						render: (datum: VideopassTranscodedVideo) => (
							<Text size="small" color="dark-5" tip={{ content: datum.drm || '', plain: true, dropProps: { align: { right: 'left' } } }}>
								{datum.drm}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								DRM
							</Text>
						),
						verticalAlign: 'top',
					},
					{
						property: 'network',
						render: (datum: VideopassTranscodedVideo) => (
							<Text size="small" color="dark-5">
								{datum.network}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								network
							</Text>
						),
						verticalAlign: 'top',
					},
					{
						property: 'chain',
						render: (datum: VideopassTranscodedVideo) => (
							<Text size="small" color="dark-5">
								{datum.chain}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								chain
							</Text>
						),
						verticalAlign: 'top',
					},
					{
						property: 'state',
						render: (datum: VideopassTranscodedVideo) => (
							<Text size="small" color="dark-5">
								{numberToEnum(datum.state)}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								state
							</Text>
						),
						verticalAlign: 'top',
					},

					{
						property: 'error',
						header: (
							<Text size="small" color="dark-5">
								Error
							</Text>
						),
						sortable: true,
						verticalAlign: 'top',
						render: (datum: VideopassTranscodedVideo) => {
							return (
								<Text size="small" color={alertColor}>
									{datum.error || ''}
								</Text>
							)
						},
					},
				]}
			/>
		</Box>
	)
}
