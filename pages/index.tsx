import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { img_helpling } from '../assets'
import { Footer, Header, Hero } from '../components'
import { auth } from '../lib'

interface Props {
  loggedIn: boolean
}

const Home: NextPage<Props> = ({ loggedIn }) => (
  <>
    <Head>
      <title>Helpling</title>
    </Head>

    <Header loggedIn={loggedIn} />

    <main className="justify-center">
      <Hero>
        <img className="h-40" src={img_helpling} alt="Helpling" />
        <h1 className="text-5xl font-semibold my-4">Helpling</h1>
        <p className="text-center text-xl">
          Find people who need your help and help them.
        </p>
      </Hero>
    </main>

    <Footer />
  </>
)

Home.getInitialProps = context => {
  const loggedIn = auth.isLoggedIn(context)

  return {
    loggedIn
  }
}

export default Home
