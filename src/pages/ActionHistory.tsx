import { FunctionComponent, useEffect, useState } from 'react'
import { Box, Text, DataTable } from 'grommet'
import { CollectionNames, log } from '@videopass/services'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { addSpace, dateTime } from '../components/common/ColumnHelpers'
import { db } from '../services/Firebase'
import { ActionState, VideopassAction } from '@videopass/model'
import { dark } from '../theme'

export interface Props {
	mobId: string
}

export const ActionHistory: FunctionComponent<Props> = ({ mobId }) => {
	const [actions, setActions] = useState<VideopassAction[]>([])
	const ref = collection(db, 'actions')

	useEffect(() => {
		const q = query(ref, where('mobId', '==', mobId))
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const files = new Array<VideopassAction>()
				querySnapshot.forEach((doc) => {
					files.push(doc.data() as VideopassAction)
				})
				setActions(files)
			},
			(error) => {
				log.error(error, `Error getting videos: ${CollectionNames.files}`)
			}
		)

		return unsubscribe
	}, [mobId])

	return (
		<Box fill>
			<DataTable
				border={{ header: { color: dark, size: '1px', style: 'solid', side: 'bottom' } }}
				data={actions}
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
						property: 'action',
						render: (datum: VideopassAction) => <Text size="small">{addSpace(datum.action).toLowerCase()}</Text>,
						header: (
							<Text size="small" color="dark-5">
								Action History
							</Text>
						),
						size: '100px',
						verticalAlign: 'top',
					},
					{
						property: 'state',
						render: (datum: VideopassAction) => (
							<Text size="small" color="dark-5">
								{ActionState[datum.state]}
							</Text>
						),
						header: (
							<Text size="small" color="dark-5">
								State
							</Text>
						),
						verticalAlign: 'top',
						size: '50px',
					},

					{
						property: 'created',
						render: (datum: VideopassAction) => dateTime(datum.created.toString()),
						header: (
							<Text size="small" color="dark-5">
								create time
							</Text>
						),
						verticalAlign: 'top',
						size: '120px',
					},

					{
						property: 'updated',
						render: (datum: VideopassAction) => dateTime(datum.updated.toString()),
						header: (
							<Text size="small" color="dark-5">
								last update time
							</Text>
						),
						verticalAlign: 'top',
						size: '120px',
					},
				]}
			/>
		</Box>
	)
}
