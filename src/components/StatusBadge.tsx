import { Box, Text } from 'grommet'

export const StatusBadge = ({ background = 'status-unknown', status = '' }) => (
	<Box width="12px" height="12px" round="small" background={background}>
		<Text margin={{ left: 'xsmall' }} color="dark-5" size="xsmall">
			{status}
		</Text>
	</Box>
)
