import { NextPage } from 'next'
import cookies from 'next-cookies'
import Head from 'next/head'
import React from 'react'

import { img_helpling } from '../assets'
import { Footer, Header } from '../components'

interface Props {
  userId?: string
}

const Home: NextPage<Props> = ({ userId }) => (
  <>
    <Head>
      <title>Helpling</title>
    </Head>

    <Header loggedIn={!!userId} />

    <main className="justify-center">
      <section className="flex items-center justify-center flex-col my-8 px-8 py-32 relative">
        <img className="h-40" src={img_helpling} alt="Helpling" />
        <h1 className="text-3xl font-semibold text-center my-4">Helpling</h1>
        <p className="text-center">
          Find people who need your help and help them.
        </p>
      </section>
    </main>

    <Footer />

    <style jsx>{`
      main {
        padding: 0 !important;
      }

      section:before {
        background: #010f28;
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      section:nth-child(odd):before {
        clip-path: polygon(0 5em, 100% 0, 100% calc(100% - 5em), 0 100%);
      }

      section:nth-child(even):before {
        clip-path: polygon(0 0, 100% 5em, 100% 100%, 0 calc(100% - 5em));
      }
    `}</style>
  </>
)

Home.getInitialProps = context => {
  const { userId } = cookies(context)

  return {
    userId
  }
}

export default Home
