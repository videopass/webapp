import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Box, Button, Heading, Layer, ResponsiveContext, Text } from 'grommet'
import { Edit, FormClose, LinkPrevious, Menu, Ticket, Trash, Lock, Unlock, Transaction, Refresh } from 'grommet-icons'
import { Link, useParams } from 'react-router-dom'
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../services/Firebase'
import { CollectionNames, log } from '@videopass/services'
import { ActionState, FileAction, VideopassAction, VideopassTranscodedVideo } from '@videopass/model'
import { DetailBox } from '../components/progress/DetailBox'
import { ActionButton } from '../components/layout/ActionButton'
import { alertColor, dark } from '../theme'
import Player from '../components/common/Player'
import { format } from 'date-fns'
import { ActionHistory } from './ActionHistory'
interface Props {}

export const VideoDetails: FunctionComponent<Props> = () => {
	const [showActions, setShowActions] = useState<boolean>(true)
	const toggleActions = () => setShowActions(!showActions)
	const params = useParams()
	const [video, setVideo] = useState<VideopassTranscodedVideo>()
	const ref = doc(db, `${CollectionNames.files}/${params.id}`)

	useEffect(() => {
		const unsubscribe = onSnapshot(
			ref,
			(querySnapshot) => {
				setVideo(querySnapshot.data() as VideopassTranscodedVideo)
			},
			(error) => {
				log.error(error, `Error getting videos: ${CollectionNames.files}`)
			}
		)

		return unsubscribe
	}, [])

	const createFileAction = async (fileAction: FileAction) => {
		const toInsert: VideopassAction = {
			action: fileAction,
			created: new Date().toISOString(),
			updated: new Date().toISOString(),
			mobId: video?.id || '',
			state: ActionState.created,
		}

		try {
			const colRef = collection(db, 'actions')
			await addDoc(colRef, toInsert)
			log.info(`Document written with ID: ${colRef.id}`)
		} catch (error) {
			log.error(error, `Error adding document ${JSON.stringify(toInsert)} `)
			throw error
		}
	}

	const size = useContext(ResponsiveContext)
	if (!video) {
		return <Box fill align="center" justify="center"></Box>
	}
	const actionsProps =
		size === 'small'
			? { full: true }
			: {
					basis: '1/3',
					elevation: 'small',
			  }
	const ActionComponent = size === 'small' ? Layer : Box
	return (
		<Box fill direction="row">
			<Box flex>
				<Box
					tag="header"
					direction="row"
					align="center"
					border={{ color: dark, side: 'bottom', size: 'small' }}
					pad={{ vertical: 'small' }}
					justify="between"
				>
					<Box direction="row" align="center">
						<Link to={'/videos'}>
							<Button icon={<LinkPrevious color="dark-5" />}></Button>
						</Link>
					</Box>
					<Text>{video.name}</Text>
					<Button icon={<Menu color="dark-5" />} onClick={toggleActions} />
				</Box>
				<Box flex margin={{ top: 'small' }} gap="small">
					<Player video={video} />

					<Box direction="row">
						<Box fill>
							<DetailBox value={video.name} name="name" />
							<DetailBox value={format(new Date(video.create_time), 'yyyy-MM-dd HH:mm')} name="Creation time" />
							<DetailBox value={video.duration || ''} name="duration" />
							<DetailBox value={video.use_drm || ''} name="Use DRM" />
							<DetailBox value={video.drm || ''} url={`https://explorer.thetatoken.org/account/${video.drm}`} name="drm" />
							<DetailBox value={video.resolution || ''} name="Resolution" />
							<DetailBox value={video.playback_uri || ''} name="Playback url" />
							<DetailBox value={video.chain} name="Metachain" />
							<DetailBox value={video.id || ''} name="id" />
							<DetailBox value={video.file_name || ''} name="file name" />
							<DetailBox value={video.network || ''} name="network" />
							<DetailBox value={video.state || 0} name="state" />
							<DetailBox value={video.error || ''} name="error" />
						</Box>
						{video.id !== '' && <ActionHistory mobId={video.id} />}
					</Box>
				</Box>
			</Box>
			{showActions && (
				<ActionComponent {...actionsProps} elevation="none" border={{ color: dark, size: 'small', side: 'left' }}>
					<Box direction="row" align="center" justify="between" pad={{ horizontal: 'small', vertical: 'medium' }}>
						<Text size="small" color="dark-5">
							Actions
						</Text>
						<Button onClick={toggleActions}>
							<Box>
								<FormClose color="dark-5" />
							</Box>
						</Button>
					</Box>
					<Box margin={{ left: 'medium', top: 'small' }} gap="small">
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.Delete)
							}}
							icon={<Trash color="dark-5" />}
							label="Delete"
						/>
						<ActionButton onAction={() => {}} icon={<Edit color="dark-5" />} label="Edit" />
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.ChangeDRM)
							}}
							icon={<Ticket color="dark-5" />}
							label="Change DRM"
						/>
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.AddDRM)
							}}
							icon={<Lock color="dark-5" />}
							label="Add DRM"
						/>
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.RemoveDRM)
							}}
							icon={<Unlock color="dark-5" />}
							label="Remove DRM"
						/>
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.Republish)
							}}
							icon={<Refresh color="dark-5" />}
							label="Republish"
						/>
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.TranscodeTo2160P)
							}}
							icon={<Transaction color="dark-5" />}
							label="Transcode to 2160P"
						/>
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.TranscodeTo1080P)
							}}
							icon={<Transaction color="dark-5" />}
							label="Transcode to 1080P"
						/>
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.TranscodeTo720P)
							}}
							icon={<Transaction color="dark-5" />}
							label="Transcode to 720P"
						/>
						<ActionButton
							onAction={() => {
								createFileAction(FileAction.TranscodeTo360P)
							}}
							icon={<Transaction color="dark-5" />}
							label="Transcode to 360P"
						/>
					</Box>
				</ActionComponent>
			)}
		</Box>
	)
}
