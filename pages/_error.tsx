import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header, Hero } from '../components'
import { auth } from '../lib'

interface Props {
  loggedIn: boolean
  notFound: boolean
}

const Error: NextPage<Props> = ({ loggedIn, notFound }) => (
  <>
    <Head>
      <title>Error / Helpling</title>
    </Head>

    <Header loggedIn={loggedIn} />

    <main className="justify-center">
      <Hero>
        <h1 className="text-5xl font-semibold text-accent">
          {notFound ? 'Not found' : 'Error'}
        </h1>
        <h3 className="text-3xl font-semibold mt-8">Holy moly!</h3>
        {notFound ? (
          <>
            <p className="mt-4">
              We can&apos;t find what you were looking for.
            </p>
            <p className="mt-4">
              The authorities have been informed and we&apos;re looking into it
              right now.
            </p>
          </>
        ) : (
          <p className="mt-4">
            Something terrible happened. Step away from your computer and lock
            the doors.
          </p>
        )}
      </Hero>
    </main>

    <Footer />
  </>
)

Error.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)

  return {
    loggedIn,
    notFound: context.res?.statusCode === 404
  }
}

export default Error
