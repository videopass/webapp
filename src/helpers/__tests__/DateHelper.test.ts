import * as underTest from '../DateHelper'
import { fromNow } from '../DateHelper';

it('toGapInDays', async () => {
    const actual = underTest.toGapInDays(1611187199999, 1610582399999)//?
    expect(actual).toBe(7)
});

// jest unit test
it('should return 1 day ago', () => {
	const date = new Date()
	date.setDate(date.getDate() - 1)
	expect(fromNow(date.toString())).toBe('1 day')
})

it('should return 1 hours ago', () => {
	const date = new Date()
	// set date minus 1 hour
    date.setHours(date.getHours() - 1)

	expect(fromNow(date.toString())).toBe('about 1 hour')
})

it('should return 1 min ago', () => {
	const date = new Date()
	// set date minus 1 minute
    date.setMinutes(date.getMinutes() - 1)
   
	expect(fromNow(date.toString())).toBe('1 minute')
})