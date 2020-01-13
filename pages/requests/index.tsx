import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { Footer, Header } from '../../components'
import { List } from '../../components/requests'
import { auth, redirect } from '../../lib'
import { useUser } from '../../store'

interface Props {
  userId: string
}

const Requests: NextPage<Props> = ({ userId }) => {
  const [
    { fetching, requests, requestsHelpling },
    { fetchRequests, fetchRequestsHelpling }
  ] = useUser()

  useEffect(() => {
    fetchRequests(userId)
    fetchRequestsHelpling(userId)
  }, [])

  return (
    <>
      <Head>
        <title>Your requests / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="main">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-semibold text-secondary">
            Your requests
          </h1>
          <nav>
            <Link href="/requests/new">
              <a className="button small">New</a>
            </Link>
          </nav>
        </header>
        <List
          empty={
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
          }
          loading={fetching}
          requests={requests}
        />
        <h1 className="text-5xl font-semibold text-secondary my-8">
          People you&apos;ve helped
        </h1>
        <List
          empty={
            <p>
              Looks like you have&apos;t helped out anyone yet. Why miss an
              opportunity?&nbsp;
              <Link href="/browse">
                <a>Browse requests</a>
              </Link>
              &nbsp;and make the world a better place!
            </p>
          }
          loading={fetching}
          requests={requestsHelpling}
        />
      </main>

      <Footer />
    </>
  )
}

Requests.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)
  const userId = auth.getUserId(context) as string

  if (!loggedIn) {
    redirect(context, '/sign-in')
  }

  return {
    userId
  }
}

export default Requests
