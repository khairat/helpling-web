import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header, Hero } from '../components'
import { auth } from '../lib'

interface Props {
  loggedIn: boolean
}

const PrivacyPolicy: NextPage<Props> = ({ loggedIn }) => (
  <>
    <Head>
      <title>Privacy policy / Helpling</title>
    </Head>

    <Header loggedIn={loggedIn} />

    <main className="justify-center">
      <Hero>
        <h1 className="text-5xl font-semibold text-accent">Privacy policy</h1>
        <p className="text-center mt-4">
          You login with Google, so we have your email and name. You set your
          own username and that&apos;s what other users see. I won&apos;t share
          anything with any third-parties.
        </p>
        <p className="text-center mt-4">
          If you make requests for money, we also store your PayPal/Venmo/Cash
          App email.
        </p>
        <p className="text-center mt-4">
          Helpling is open-source. If you understand code, you can view it
          on&nbsp;
          <a href="https://github.com/helplingapp">GitHub</a> to see what data
          we store and how we use it.
        </p>
        <p className="text-center mt-4">
          If you&apos;d like to delete your account and all data, please send an
          email to&nbsp;
          <a href="mailto:bye@helpling.app">bye@helpling.app</a> and I&apos;ll
          take care of it for you.
        </p>
      </Hero>
    </main>

    <Footer />
  </>
)

PrivacyPolicy.getInitialProps = context => {
  const loggedIn = auth.isLoggedIn(context)

  return {
    loggedIn
  }
}

export default PrivacyPolicy
