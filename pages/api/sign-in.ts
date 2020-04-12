import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'

import { firebase } from '../../lib/firebase-admin'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    body: { token }
  } = request

  if (!token) {
    throw new Error('Missing token')
  }

  const { uid } = await firebase.auth().verifyIdToken(token)

  const expiresIn = 60 * 60 * 24 * 10 * 1000
  const expiry = moment().add(expiresIn, 'milliseconds').toISOString()

  const session = await firebase.auth().createSessionCookie(token, {
    expiresIn
  })

  const cookies = [`session=${session}`, `userId=${uid}`]

  response.setHeader(
    'set-cookie',
    cookies.map((cookie) =>
      [
        cookie,
        `Expires=${expiry}`,
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
