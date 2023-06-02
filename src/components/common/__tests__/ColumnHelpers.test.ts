import { numberToEnum, secondsToTimecode } from '../ColumnHelpers'

// jest unit test
it('should return the value of the enum', () => {
	const value = numberToEnum(1) //?

	expect(value).toEqual('Transferring')
})

it('converts milliseconds to smpte timecode', () => {
	expect(secondsToTimecode(1000)).toBe('00:00:01:00')

	expect(secondsToTimecode(500)).toBe('00:00:00:12')
})



