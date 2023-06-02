import React, { FunctionComponent } from 'react'
import { Box, Heading, Paragraph } from 'grommet'

export type Props = {
	label: string
	align?: 'start' | 'end' | 'center'
}

export const ViewLabel: FunctionComponent<Props> = ({ label, align = 'center' }) => {
	return (
		<Paragraph margin={{ top: 'none', bottom: 'none' }} textAlign={align} size="xxlarge">
			<b>{label}</b>
		</Paragraph>
	)
}

