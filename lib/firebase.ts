const { FIREBASE_CONFIG } = process.env

// eslint-disable-next-line simple-import-sort/sort
import { initializeApp, auth, firestore } from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const config = Buffer.from(FIREBASE_CONFIG, 'base64').toString()

const json = JSON.parse(config)

try {
  initializeApp(json)
} catch (error) {
  const { message } = error

  if (!message.includes('app/duplicate-app')) {
    throw error
  }
}

export const firebase = {
  auth,
  firestore
}
