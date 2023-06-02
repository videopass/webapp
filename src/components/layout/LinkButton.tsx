import { FunctionComponent } from 'react'
import { Box, Button, Text } from 'grommet'
import { Link } from 'react-router-dom'
import { menuHoverColor, okColor, orange, white } from '../../theme'
import { Multimedia } from 'grommet-icons'

interface Props {
	[x: string]: any
	active: boolean
	label: string
	path: string
	icon: JSX.Element
}

export const LinkButton: FunctionComponent<Props> = ({ label, rest, path, icon }) => {
	return (
		<Link to={`${path}`}>
			<Button {...rest}>
				<Box pad="small" gap="small" justify="center" direction="row">
					{icon}
					<Text color="dark-5" size="small">
						{label}
					</Text>
				</Box>
			</Button>
		</Link>
	)
}
