import { FunctionComponent } from 'react'
import { Button } from 'grommet'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Clipboard } from 'grommet-icons'

type Props = {
	url: string
	onCopied: () => void
}
export const CopyUrlButton: FunctionComponent<Props> = ({ url, onCopied }) => {
	return (
		<CopyToClipboard text={url} onCopy={() => onCopied()}>
			<Button
				plain
				size="small"
				tip={{ content: 'Copy to clipboard', plain: true, dropProps: { align: { left: 'right' } } }}
				icon={<Clipboard color="dark-3" />}
				onClick={() => {}}
			/>
		</CopyToClipboard>
	)
}
