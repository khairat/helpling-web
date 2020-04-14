import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header, Hero } from '../components'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Helpling</title>
    </Head>

    <Header />

    <main className="justify-center">
      <Hero>
        <img className="h-40" src="/img/helpling.svg" alt="Helpling" />
        <h1 className="text-5xl font-semibold my-4">Helpling</h1>
        <p className="text-center text-xl">
          Find people who need your help and help them.
        </p>
      </Hero>
    </main>

    <Footer />
  </>
)

export default Home
