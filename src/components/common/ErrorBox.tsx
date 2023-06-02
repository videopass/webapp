import { FunctionComponent } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Box, Heading, Paragraph } from 'grommet'
import { Halt } from 'grommet-icons'

export type Props = {
	label: string
	value: string | number
}

export const ErrorBox: FunctionComponent<Props> = ({ label, value }) => {
	if (value === '') value = RootBoundary()

	return (
		<Box fill align="center" pad={{ top: 'large', horizontal: 'small' }}>
			<Halt size="xlarge" />
			<Heading textAlign="center" level="2">
				{label}
			</Heading>
			<Paragraph textAlign="center" color="dark-4">
				{value}
			</Paragraph>
		</Box>
	)
}

interface RouteError {
	status: number
	statusText: string
	internal: boolean
	data: string
	error: Error
}

interface Error {}

function RootBoundary() {
	const error = useRouteError() as RouteError

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return "This page doesn't exist!"
		}

		if (error.status === 401) {
			return "You aren't authorized to see this"
		}

		if (error.status === 503) {
			return 'Looks like our API is down'
		}
	}

	return error.data
}
