import { Text } from 'grommet'
import { FormCheckmark, FormSubtract } from 'grommet-icons'
import { format, fromUnixTime } from 'date-fns'
import { getTimezoneOffset } from 'date-fns-tz'
import { FileState, StateEnum } from '@videopass/model'
import exp from 'constants'

export function checkmark(checked: boolean = false) {
	return checked ? <FormCheckmark /> : <FormSubtract />
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const offset = getTimezoneOffset(timezone)

export function dateTime(dateTime: string | undefined | number) {
	return dateTime ? (
		<Text size="small" color="dark-5">
			{format(new Date(dateTime), 'yyyy-MM-dd HH:mm')}
		</Text>
	) : (
		<Text></Text>
	)
}

export function date(dateTime: string | undefined | number) {
	return dateTime ? (
		<Text size="small" color="dark-5">
			{format(new Date(dateTime), 'yyyy-MM-dd')}
		</Text>
	) : (
		<Text></Text>
	)
}

export function unixToDateTime(unixTime: number | undefined) {
	return unixTime ? (
		<Text size="small" color="dark-5">
			{format(fromUnixTime(unixTime / 1000 - offset / 1000), 'yyyy-MM-dd HH:mm')}
		</Text>
	) : (
		<Text></Text>
	)
}

export function unixToDate(unixTime: number | undefined) {
	return unixTime ? (
		<Text size="small" color="dark-5">
			{format(fromUnixTime(unixTime / 1000 - offset / 1000), 'yyyy-MM-dd')}
		</Text>
	) : (
		<Text></Text>
	)
}

// create function which convert milliseconds to smpte timecode with leading zeros
export function secondsToTimecode(milliseconds: number | string = '0', fps: number = 25) {
	milliseconds = Number(milliseconds)
	let frames = Math.floor(((milliseconds / 1000) * fps) % fps) //?
	let seconds = Math.floor((milliseconds / 1000) % 60) //?
	let minutes = Math.floor((milliseconds / (1000 * 60)) % 60) //?
	let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24) //?
	return `${wrap(hours)}:${wrap(minutes)}:${wrap(seconds)}:${wrap(frames)}`
}

function wrap(n: number) {
	return n < 10 ? '0' + n : n
}

export function getFirstAndLastChars(url: string = '') {
	const lastPart = url.split('/')[url.split('/').length - 2]
	return lastPart ? lastPart.substr(0, 8) + '...' + lastPart.substr(-25) : ''
}

export function numberToEnum(value: string | number) {
	if (Number(value) < 9) value = FileState[Number(value)]
	if (Number(value) > 9) value = StateEnum[Number(value)]
	return value
}

// create function that add a space after each Uppercase letter
// and don't space when 2 or more uppercase letters are together
// and add space after a number
// and don't add space after 2 or more numbers are together
export const addSpace = (str: string) => {
	let newStr = ''
	for (let i = 0; i < str.length; i++) {
		if (str[i] === str[i].toUpperCase() && str[i] !== ' ' && str[i] !== '_' && str[i] !== '-') {
			if (i > 0) {
				if (str[i - 1] === str[i - 1].toUpperCase() && str[i - 1] !== ' ' && str[i - 1] !== '_' && str[i - 1] !== '-') {
					newStr += str[i]
				} else {
					newStr += ' ' + str[i]
				}
			} else {
				newStr += ' ' + str[i]
			}
		} else if (str[i] === str[i].toLowerCase() && str[i] !== ' ' && str[i] !== '_' && str[i] !== '-') {
			newStr += str[i]
		} else if (str[i] === ' ') {
			newStr += str[i]
		} else if (str[i] === '_' || str[i] === '-') {
			newStr += ' '
		} else if (!isNaN(Number(str[i]))) {
			if (i > 0) {
				if (!isNaN(Number(str[i - 1]))) {
					newStr += str[i]
				} else {
					newStr += ' ' + str[i]
				}
			} else {
				newStr += ' ' + str[i]
			}
		}
	}
	return newStr
}
