import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header, Hero } from '../components'

const Privacy: NextPage = () => (
  <>
    <Head>
      <title>Privacy policy / Helpling</title>
    </Head>

    <Header />

    <main className="justify-center">
      <Hero>
        <h1 className="text-5xl font-semibold text-accent text-center">
          About Helpling
        </h1>
        <p className="text-center mt-4 text-xl">
          Helpling is a place to help you find people who are less fortunate or
          in dire circumstances and see how you can help out.
        </p>
        <p className="text-center mt-4 text-xl">
          People can make requests for things; food, money, physical goods, and
          invites.
        </p>
        <p className="text-center mt-4 text-xl">
          Whether they need warm food on a cold night, some cash to travel to
          see family, a new couch or mattress, or a job interview; you can step
          in and help them.
        </p>
      </Hero>
      <Hero>
        <h2 className="text-5xl font-semibold text-secondary text-center">
          History
        </h2>
        <p className="text-center mt-4 text-xl">
          When I was 16, I missed an opportunity to feed someone out of
          stupidity. {new Date().getFullYear() - 2008} years later, I still
          regret it.
        </p>
        <p className="text-center mt-5 text-xl">
          But that incident instilled in me a desire to help people, especially
          those who are struggling to feed themselves.
        </p>
        <p className="text-center mt-5 text-xl">
          Over the years, I&apos;ve tried to build a platform where people can
          anonymously ask, give, and receive. My first attempt was{' '}
          <a href="https://khair.at">Khairat</a>, a framework for charities.
        </p>
        <p className="text-center mt-5 text-xl">
          However, Khairat was large is scope and never left the planning stage.
          So I decided that building a simpler platform would be faster and
          hopefully make the world a better place.
        </p>
      </Hero>
      <Hero>
        <h2 className="text-5xl font-semibold text-accent text-center">Tech</h2>
        <p className="text-center mt-4 text-xl">
          Helpling is built with open-source technology and the source code is
          publicly available on{' '}
          <a href="https://github.com/helplingapp">GitHub</a>.
        </p>
        <p className="text-center mt-4 text-xl">
          It&apos;s built with{' '}
          <a href="https://reactnative.dev">React Native</a>,{' '}
          <a href="https://www.typescriptlang.org">TypeScript</a>, and{' '}
          <a href="https://firebase.google.com">Firebase</a>.
        </p>
      </Hero>
    </main>

    <Footer />
  </>
)

export default Privacy
