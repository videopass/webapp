import React, { FunctionComponent } from 'react'

import { Box, Button } from 'grommet'
import { Add } from 'grommet-icons'

interface Props {
	[x: string]: any
	color: string
}

export const AddButton: FunctionComponent<Props> = ({ color, ...rest }) => (
	<Box round="full" background={color} margin={{ bottom: 'small', right: 'small' }} width="xxsmall" height="xxsmall">
		<Button icon={<Add />} {...rest} />
	</Box>
)
