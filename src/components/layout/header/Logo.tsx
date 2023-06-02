import { Box, Stack } from 'grommet'

const Logo = () => (
	<Stack anchor="center">
		<Box width="xxsmall" height="xxsmall" round="small" align="center" justify="center" border={{ color: '#005D7E', size: 'xlarge' }} />
		<Box width={'32px'} height={'32px'} round="small" align="center" justify="center" background="white" />
	</Stack>
)

export { Logo }
