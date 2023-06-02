import { FunctionComponent } from 'react'
import { Anchor, Box, Button, Text } from 'grommet'
import { getFirstAndLastChars, numberToEnum, secondsToTimecode } from '../common/ColumnHelpers'
import { FileState, StateEnum } from '@videopass/model'
import { CopyUrlButton } from '../common/CopyUrlButton'
import { View } from 'grommet-icons'
import { alertColor } from '../../theme'

interface Props {
	[x: string]: any
	name: string
	value: string | number | Boolean
	url?: string
}

export const DetailBox: FunctionComponent<Props> = ({ value, name, url }) => {
	// check if name is duration
	// if it is call function secondsToTimecode
	// else return value
	if (name === 'duration') {
		value = secondsToTimecode(value as number)
	}

	// check if boolean
	// if it is return yes or no
	if (typeof value === 'boolean') {
		value = value ? 'Yes' : 'No'
	}

	if (name === 'state') {
		value = numberToEnum(value as number)
	}

	return (
		<Box direction="column" margin={{ top: 'small', left: 'small' }}>
			<Text size="small" color="dark-3">
				{name.toUpperCase()}
			</Text>
			<Box direction="row" gap="small">
				<Text>{value.toString().length > 50 ? getFirstAndLastChars(value.toString()) : value.toString()}</Text>
				<CopyUrlButton onCopied={() => {}} url={value.toString() || ''} />
				{url && 
				<Button
					plain
					size="small"
					tip={{ content: 'Open Link', plain: true, dropProps: { align: { left: 'right' } } }}
					icon={<View color="dark-3" />}
					onClick={() => {window.open(url)}}
					/>
				}
	
			</Box>
		</Box>
	)
}
