import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header, Hero } from '../components'

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
        <h2 className="text-5xl font-semibold text-accent text-center">
          How does it work?
        </h2>
        <p className="text-center text-xl mt-4">
          If you need help, you create a request for help. Someone who is
          willing to help will accept it and help out.
        </p>
        <p className="text-center text-xl mt-4">
          If you&apos;re looking to help, you can look at existing requests and
          accept them. Or you can create an offer for help and someone looking
          for help will accept it.
        </p>
        <h3 className="text-2xl font-semibold text-secondary text-center mt-8">
          There are four categories of offers and requests
        </h3>
        <section className="flex mt-4 flex-col lg:flex-row lg:flex-wrap lg:max-w-3xl">
          <article className="p-4 lg:w-1/2">
            <img className="w-40 h-40 m-auto block" src="/img/type_food.svg" />
            <h4 className="text-3xl text-accent font-medium text-center">
              Food
            </h4>
            <p className="text-center">
              Haven&apos;t received your salary yet or unexpected expenses
              prevent you from buying food or groceries?
            </p>
          </article>
          <article className="p-4 lg:w-1/2">
            <img
              className="w-40 h-40 m-auto block"
              src="/img/type_invite.svg"
            />
            <h4 className="text-3xl text-accent font-medium text-center">
              Invites
            </h4>
            <p className="text-center">
              Need help getting a job interview? Or just moved to a new city and
              don&apos;t know anyone?
            </p>
          </article>
          <article className="p-4 lg:w-1/2">
            <img className="w-40 h-40 m-auto block" src="/img/type_money.svg" />
            <h4 className="text-3xl text-accent font-medium text-center">
              Money
            </h4>
            <p className="text-center">Need financial help?</p>
          </article>
          <article className="p-4 lg:w-1/2">
            <img
              className="w-40 h-40 m-auto block"
              src="/img/type_physical.svg"
            />
            <h4 className="text-3xl text-accent font-medium text-center">
              Things
            </h4>
            <p className="text-center">
              Moved to a new apartment and need some furniture?
            </p>
          </article>
        </section>
      </Hero>
      <Hero>
        <h2 className="text-5xl font-semibold text-secondary text-center">
          Beta
        </h2>
        <section className="mt-4 flex flex-col lg:flex-row">
          <a
            className="m-4 text-center py-4 px-8 bg-accent text-white text-xl font-medium rounded-full hover:bg-secondary flex items-center"
            href="https://testflight.apple.com/join/PQSjkuHG">
            <img className="h-8 w-8 mr-4" src="/img/download_app_store.svg" />
            TestFlight
          </a>
        </section>
      </Hero>
    </main>

    <Footer />
  </>
)

export default Home
