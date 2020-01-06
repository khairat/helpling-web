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

  auth().setPersistence(auth.Auth.Persistence.NONE)
} catch (error) {
  const { code } = error

  if (code !== 'app/duplicate-app') {
    throw error
  }
}

export const firebase = {
  auth,
  firestore
}
