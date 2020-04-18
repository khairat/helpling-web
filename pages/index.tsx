import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header, Hero, PrivacyPolicy } from '../components'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Helpling / Find people who need your help and help them.</title>
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
      <Hero>
        <h1 className="text-5xl font-semibold text-secondary text-center">
          Download
        </h1>
        <section className="mt-4 flex flex-col lg:flex-row">
          <a
            className="m-4 py-4 px-8 bg-accent text-white text-xl font-medium rounded-full hover:bg-secondary"
            href="https://apps.apple.com/us/app/helpling/id1508616704">
            App Store
          </a>
          <a
            className="m-4 py-4 px-8 bg-accent text-white text-xl font-medium rounded-full hover:bg-secondary"
            href="https://play.google.com/store/apps/details?id=app.helpling">
            Google Play
          </a>
        </section>
      </Hero>
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
          see family, a new couch or mattress, or an job interview; you can step
          in and help them.
        </p>
      </Hero>
      <Hero>
        <h1 className="text-5xl font-semibold text-secondary text-center">
          History
        </h1>
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
          Recently, I saw{' '}
          <a href="https://imgur.com/gallery/C2lHqaK">this post</a> on Imgur and
          decided that building a simpler platform would be faster and hopefully
          make the world a better place.
        </p>
      </Hero>
      <Hero>
        <h1 className="text-5xl font-semibold text-accent text-center">Tech</h1>
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
      <PrivacyPolicy />
    </main>

    <Footer />
  </>
)

export default Home
