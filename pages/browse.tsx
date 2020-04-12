import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { Footer, Header } from '../components'
import { List } from '../components/requests'
import { auth } from '../lib'
import { useRequests } from '../store'

interface Props {
  userId?: string
}

const Browse: NextPage<Props> = ({ userId }) => {
  const [{ loading, requests }, { fetchAll }] = useRequests()

  useEffect(() => {
    fetchAll(userId)
  }, [])

  return (
    <>
      <Head>
        <title>Browse / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="main">
        <h1 className="text-5xl font-semibold mb-8 text-secondary">Browse</h1>
        <List
          empty={
            <>
              <p>
                Hallelujah! Everyone is fed and warm. Come back later to find
                people who have made requests.
              </p>
              <p className="mt-4">
                Looking for your requests? You can find them&nbsp;
                <Link href="/requests">
                  <a>here</a>
                </Link>
                .
              </p>
            </>
          }
          loading={loading}
          requests={requests}
        />
      </main>

      <Footer />
    </>
  )
}

Browse.getInitialProps = (context) => {
  const userId = auth.getUserId(context)

  return {
    userId
  }
}

export default Browse
