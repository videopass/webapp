import { FunctionComponent, useState } from 'react'
import { ProgressDiagram } from './ProgressDiagram'
import { Score } from '../../interfaces/Score'
import { ScoreSummary } from './ScoreSummary'
import { VideopassTranscodedVideo } from '@videopass/model'

const initialProgresses = 8

interface Props {
	[x: string]: any
	score: Score
	videos: VideopassTranscodedVideo[]
}

export const Progresses: FunctionComponent<Props> = ({ score, videos, ...rest }) => {
	const progresses = videos.map((v) => {
		return <ProgressDiagram key={v.id} video={v} />
	})

	return (
		<>
			<ScoreSummary score={score} />
			{progresses}
		</>
	)
}
