// eslint-disable-next-line simple-import-sort/sort
import { auth, firestore, functions, initializeApp } from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const config = Buffer.from(process.env.FIREBASE_CONFIG, 'base64').toString()

const json = JSON.parse(config)

try {
  initializeApp(json)
} catch (error) {
  const { code } = error

  if (code !== 'app/duplicate-app') {
    throw error
  }
}

export const firebase = {
  auth,
  firestore,
  functions
}
