import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { img_request_types } from '../../assets'
import { Footer, Header, Spinner } from '../../components'
import { auth, redirect } from '../../lib'
import { useUser } from '../../store'

interface Props {
  userId?: string
}

const Requests: NextPage<Props> = ({ userId }) => {
  const [{ fetching, requests }, { fetchRequests }] = useUser()

  useEffect(() => {
    if (userId) {
      fetchRequests(userId)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Requests / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="bg-primary-dark">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-5xl font-semibold">Requests</h1>
          <nav>
            <Link href="/requests/new">
              <a className="bg-accent px-3 py-2 text-white rounded">New</a>
            </Link>
          </nav>
        </header>
        {fetching && <Spinner className="mt-4" />}
        {!fetching && requests.length === 0 && (
          <p>
            Lucky you! You haven&apos;t created any requests for help. You
            can&nbsp;
            <Link href="/browse">
              <a>browse</a>
            </Link>
            &nbsp;requests by other people or&nbsp;
            <Link href="/requests/new">
              <a>create your own</a>
            </Link>
            .
          </p>
        )}
        {!fetching && requests.length > 0 && (
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

Requests.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)
  const userId = auth.getUserId(context)

  if (!loggedIn) {
    redirect(context, '/sign-in')
  }

  return {
    userId
  }
}

export default Requests
