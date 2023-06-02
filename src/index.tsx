import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { Spinner } from 'grommet'
import { RouterProvider } from 'react-router-dom'
import { router } from './components/Router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<RouterProvider router={router} fallbackElement={<Spinner />} />
	</React.StrictMode>
)
