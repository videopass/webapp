import React, { FunctionComponent } from 'react'
import { Box } from 'grommet'
import { ScoreItem } from './Running'
import { Score } from '../../interfaces/Score'

interface Props {
	[x: string]: any
	score: Score
}

export const ScoreSummary: FunctionComponent<Props> = ({
	score = { inProgress: 0, thetaTranscodes: 0, transcodes: 0, transfers: 0, uploads: 0, downloads: 0 },
}) => (
	<Box margin={{ bottom: 'medium' }} direction="row" gap="xxsmall">
		<ScoreItem number={score.inProgress} desc="In progress" />
		<ScoreItem number={score.downloads} desc="Transfers from Avid" />
		<ScoreItem number={score.transcodes} desc="Transcodes to H264" />
		<ScoreItem number={score.uploads} desc="Uploads to Theta" />
		<ScoreItem number={score.thetaTranscodes} desc="Transcodes to Theta" />
	</Box>
)
