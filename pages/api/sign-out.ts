import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const cookies = [`token=`, `userId=`]

  response.setHeader(
    'set-cookie',
    cookies.map(cookie =>
      [
        cookie,
        `Expires=${moment()
          .subtract(1, 'year')
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
