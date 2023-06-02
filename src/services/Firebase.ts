import { initializeApp } from 'firebase/app'
import { FirestoreSettings, initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
}

const env = process.env.NODE_ENV
if (env === 'development') {
	console.log('debug mode')
} else {
	console.log('production mode')
}

export const app = initializeApp(firebaseConfig)
let firestoreSettings: FirestoreSettings = {}
if (env === 'development') {
	firestoreSettings = { host: 'localhost:8080', ssl: false }
}
export const db = initializeFirestore(app, firestoreSettings)
