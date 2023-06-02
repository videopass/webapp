import { createBrowserRouter } from 'react-router-dom'
import { ErrorBox } from './common/ErrorBox'
import { Support } from '../pages/Support'
import { Layout } from './layout/Layout'
import { Dashboard } from '../pages/Dashboard'
import { NotFound } from '../pages/NotFound'
import { Videos } from '../pages/Videos'
import { VideoDetails } from '../pages/VideoDetails'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorBox label="Error" value="Page not found" />,
		children: [
			{
				path: '',
				element: <Dashboard />,
			},
			{
				path: 'videos',
				element: <Videos />,
			},
			{
				path: 'videos/:id',
				element: <VideoDetails />,
			},
			{
				path: 'support',
				element: <Support />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
])
