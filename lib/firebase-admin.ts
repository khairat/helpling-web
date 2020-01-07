import * as admin from 'firebase-admin'

const config = Buffer.from(
  process.env.FIREBASE_ADMIN_CONFIG,
  'base64'
).toString()

const json = JSON.parse(config)

try {
  admin.initializeApp({
    credential: admin.credential.cert(json),
    databaseURL: process.env.FIREBASE_DATABASE_URL
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
