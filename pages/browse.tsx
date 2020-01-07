import { startCase } from 'lodash'
import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { img_request_types } from '../assets'
import { Footer, Header, Spinner } from '../components'
import { auth } from '../lib'
import { useRequests } from '../store'

interface Props {
  userId?: string
}

const Browse: NextPage<Props> = ({ userId }) => {
  const [{ loading, requests }, { fetch }] = useRequests()

  useEffect(() => {
    fetch(userId)
  }, [])

  return (
    <>
      <Head>
        <title>Browse / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="main">
        <h1 className="text-5xl font-semibold mb-8">Browse</h1>
        {loading && <Spinner className="mt-4" />}
        {!loading && requests.length === 0 && (
          <p>
            Hallelujah! Everyone is fed and warm. Come back later to find people
            who have made requests.
          </p>
        )}
        {!loading && requests.length > 0 && (
          <table className="bg-primary rounded">
            <thead>
              <tr>
                <th>Request</th>
                <th className="text-center">Type</th>
                <th>Status</th>
                <th>Posted</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(
                ({ createdAt, description, id, status, type }, index) => (
                  <tr key={index}>
                    <td>
                      <Link href={`/requests/${id}`}>
                        <a>{description}</a>
                      </Link>
                    </td>
                    <td>
                      <img
                        alt={type}
                        className="h-8 w-8 m-auto"
                        src={img_request_types[type]}
                        title={type}
                      />
                    </td>
                    <td>{startCase(status)}</td>
                    <td>{moment(createdAt.toDate()).fromNow()}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </main>

      <Footer />
    </>
  )
}

Browse.getInitialProps = context => {
  const userId = auth.getUserId(context)

  return {
    userId
  }
}

export default Browse
