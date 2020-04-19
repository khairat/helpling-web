import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Error, Footer, Header } from '../components'

interface Props {
  notFound: boolean
}

const ErrorPage: NextPage<Props> = ({ notFound }) => (
  <>
    <Head>
      <title>Error / Helpling</title>
    </Head>

    <Header />

    <Error notFound={notFound} />

    <Footer />
  </>
)

ErrorPage.getInitialProps = (context) => ({
  notFound: context.res?.statusCode === 404
})

export default ErrorPage
