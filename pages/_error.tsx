import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Error, Footer, Header } from '../components'
import { auth } from '../lib'

interface Props {
  loggedIn: boolean
  notFound: boolean
}

const ErrorPage: NextPage<Props> = ({ loggedIn, notFound }) => (
  <>
    <Head>
      <title>Error / Helpling</title>
    </Head>

    <Header loggedIn={loggedIn} />

    <Error notFound={notFound} />

    <Footer />
  </>
)

ErrorPage.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)

  return {
    loggedIn,
    notFound: context.res?.statusCode === 404
  }
}

export default ErrorPage
