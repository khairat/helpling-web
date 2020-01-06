const { FIREBASE_ADMIN_CONFIG, FIREBASE_DATABASE_URL } = process.env

import * as admin from 'firebase-admin'

const config = Buffer.from(FIREBASE_ADMIN_CONFIG, 'base64').toString()

const json = JSON.parse(config)

try {
  admin.initializeApp({
    credential: admin.credential.cert(json),
    databaseURL: FIREBASE_DATABASE_URL
  })
} catch (error) {
  const { code } = error

  if (code !== 'app/duplicate-app') {
    throw error
  }
}

export const firebase = {
  auth: admin.auth
}
