import React, { FunctionComponent } from 'react'

import { Box, Text } from 'grommet'

interface Props {
	[x: string]: any
	number: number
	desc: string
}

export const ScoreItem: FunctionComponent<Props> = ({ number, desc }) => (
	<Box fill align="center" margin={{top: 'small'}}>
		<Text alignSelf="center" size="xlarge" weight="bold">
			{number}
		</Text>
		<Text size="xsmall">{desc}</Text>
	</Box>
)
