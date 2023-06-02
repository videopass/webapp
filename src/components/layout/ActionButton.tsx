import { FunctionComponent } from 'react'
import { Box, Button, Text } from 'grommet'
import { Link } from 'react-router-dom'
import { menuHoverColor, okColor, orange, white } from '../../theme'
import { Multimedia } from 'grommet-icons'

interface Props {
	[x: string]: any
	label: string
	icon: JSX.Element
	onAction: () => void
}

export const ActionButton: FunctionComponent<Props> = ({ label, rest, onAction, icon }) => {
	return (
		<Button {...rest} onClick={onAction}>
			<Box pad="small" gap="small" direction="row">
				{icon}
				<Text color="dark-5" size="small">
					{label}
				</Text>
			</Box>
		</Button>
	)
}

