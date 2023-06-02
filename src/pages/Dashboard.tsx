import { useEffect, useState } from 'react'
import { Box, Heading, Grid, DataTable, Text, Button, Layer } from 'grommet'
import { VideoCard } from '../components/VideoCard'
import { CollectionNames, log } from '@videopass/services'
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { FileState, StateEnum, VideopassTranscodedVideo } from '@videopass/model'
import { db } from '../services/Firebase'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Clipboard, StatusGood, FormClose } from 'grommet-icons'
import { alertColor, okColor } from '../theme'
import { dateTime, getFirstAndLastChars, secondsToTimecode } from '../components/common/ColumnHelpers'
import { Progresses } from '../components/progress/Progress'
import { Score } from '../interfaces/Score'

export const Dashboard = () => {
	const [videos, setVideos] = useState<VideopassTranscodedVideo[]>([])
	const ref = collection(db, CollectionNames.files)
	const [copied, setCopied] = useState<boolean>(false)
	const [open, setOpen] = useState<boolean>()
	const [score, setScore] = useState<Score>({ inProgress: 0, thetaTranscodes: 0, transcodes: 0, transfers: 0, uploads: 0, downloads: 0 })
	const [lastVideo, setLastVideo] = useState<VideopassTranscodedVideo | undefined>(undefined)

	useEffect(() => {
		const q = query(ref, where('state', '!=', StateEnum.success))
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const files = new Array<VideopassTranscodedVideo>()
				querySnapshot.forEach((doc) => {
					files.push(doc.data() as VideopassTranscodedVideo)
				})
				setVideos(files.filter((x) => x.state !== StateEnum.success))
				setScore({
					inProgress: files.length,
					thetaTranscodes: files.filter((f) => f.state === StateEnum.processing).length,
					downloads: files.filter((f) => f.state === FileState.Downloading).length,
					uploads: files.filter((f) => f.state === FileState.Uploading).length,
					transcodes: files.filter((f) => f.state === FileState.Transcoding).length,
					transfers: files.filter((f) => f.state === FileState.Transferring).length,
				})
			},
			(error) => {
				log.error(error, `Error getting videos: ${CollectionNames.files}`)
			}
		)

		return unsubscribe
	}, [])

	useEffect(() => {
		const q = query(ref, where('state', '==', StateEnum.success), orderBy('update_unix', 'desc'), limit(1))
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const files = new Array<VideopassTranscodedVideo>()
				querySnapshot.forEach((doc) => {
					files.push(doc.data() as VideopassTranscodedVideo)
				})

				setLastVideo(files[0])
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

			{lastVideo && (
				<Box margin={{ bottom: 'small' }}>
					<Text size="small" color="dark-5">
						Last transcoded video ready to stream on Theta Network
					</Text>

					<VideoCard video={lastVideo} key={lastVideo.id} path={`/videos/${lastVideo.id}`} />
				</Box>
			)}

			<Box margin={{ top: 'small' }}>
				<Text size="small" color="dark-5">
					Running Tasks
				</Text>
				<Progresses score={score} videos={videos} />
			</Box>
		</Box>
	)
}
