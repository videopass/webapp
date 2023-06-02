import { UTCDate } from '@date-fns/utc'
import {
	addDays,
	addMonths,
	differenceInDays,
	endOfDay,
	format,
	formatDistance,
	formatDuration,
	getUnixTime,
	intervalToDuration,
	subDays,
} from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { start } from 'repl'

// get from  iso string date time from now
export const fromNow = (date: string) => formatDistance(new Date(date), new Date())
export const toDateString = (milliseconds: number) => format(milliseconds, 'mmmm dd yyyy')
export const toShortDate = (milliseconds: number) => format(new UTCDate(milliseconds), 'mmm d, yyyy')
export const toMonthNumber = (milliseconds: number) => Number(format(new UTCDate(milliseconds), 'mm'))
