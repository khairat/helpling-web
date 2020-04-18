import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header, PrivacyPolicy } from '../components'

const Privacy: NextPage = () => (
  <>
    <Head>
      <title>Privacy policy / Helpling</title>
    </Head>

    <Header />

    <main className="justify-center">
      <PrivacyPolicy />
    </main>

    <Footer />
  </>
)

export default Privacy
