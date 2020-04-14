import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Error, Footer, Header } from '../components'

const ErrorPage: NextPage = () => (
  <>
    <Head>
      <title>Error / Helpling</title>
    </Head>

    <Header />

    <Error notFound />

    <Footer />
  </>
)

export default ErrorPage
