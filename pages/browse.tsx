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
  loggedIn: boolean
}

const Browse: NextPage<Props> = ({ loggedIn }) => {
  const [{ loading, requests }, { fetch }] = useRequests()

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <Head>
        <title>Browse / Helpling</title>
      </Head>

      <Header loggedIn={loggedIn} />

      <main className="bg-primary-dark">
        <h1 className="text-5xl font-semibold mb-4">Browse</h1>
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
                <th>Type</th>
                <th>Person</th>
                <th>Posted</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(({ createdAt, description, type, user }, index) => (
                <tr key={index}>
                  <td>{description}</td>
                  <td>
                    <img
                      alt={type}
                      className="h-8 w-8"
                      src={img_request_types[type]}
                      title={type}
                    />
                  </td>
                  <td>
                    <Link href={`/people/${user.id}`}>
                      <a>{user.name}</a>
                    </Link>
                  </td>
                  <td>{moment(createdAt.toDate()).fromNow()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <Footer />
    </>
  )
}

Browse.getInitialProps = context => {
  const loggedIn = auth.isLoggedIn(context)

  return {
    loggedIn
  }
}

export default Browse
