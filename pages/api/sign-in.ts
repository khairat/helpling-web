const { FIREBASE_ADMIN_CONFIG, FIREBASE_DATABASE_URL } = process.env

import * as admin from 'firebase-admin'
import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    body: { token }
  } = request

  if (!token) {
    throw new Error('Missing token')
  }

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

  const { uid } = await admin.auth().verifyIdToken(token)

  const expiresIn = 60 * 60 * 24 * 10 * 1000

  const cookie = await admin.auth().createSessionCookie(token, {
    expiresIn
  })

  const cookies = [`session=${cookie}`, `userId=${uid}`]

  cookies.forEach(cookie =>
    response.setHeader(
      'set-cookie',
      [
        cookie,
        `Expires=${moment()
          .add(expiresIn, 'milliseconds')
          .toISOString()}`,
        'HttpOnly',
        'Path=/',
        process.env.NODE_ENV === 'production' && 'Secure'
      ]
        .filter(Boolean)
        .join(';')
    )
  )

  response.status(200).json({})
}
