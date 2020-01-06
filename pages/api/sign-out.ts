import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const cookies = [`session=null`, `userId=null`]

  cookies.forEach(cookie =>
    response.setHeader(
      'set-cookie',
      [
        cookie,
        `Expires=${moment()
          .subtract(1, 'year')
          .toISOString()}`,
        'HttpOnly',
        'MaxAge=0',
        'Path=/',
        process.env.NODE_ENV === 'production' && 'Secure'
      ]
        .filter(Boolean)
        .join(';')
    )
  )

  response.status(200).json({})
}
