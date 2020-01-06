import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Footer, FormMessage, Header, Spinner } from '../components'
import { firebase, redirect } from '../lib'

const SignIn: NextPage = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Head>
        <title>Sign in / Helpling</title>
      </Head>

      <Header />

      <main className="items-center justify-center">
        <section className="bg-primary-dark rounded-lg p-8 w-signin">
          <h1 className="text-5xl font-semibold">Hello</h1>
          {error && <FormMessage message={error} type="error" />}
          <button
            className="mt-40 w-full"
            onClick={async () => {
              setError('')
              setLoading(true)

              try {
                const provider = new firebase.auth.GoogleAuthProvider()

                await firebase.auth().signInWithPopup(provider)

                Router.replace('/')
              } catch ({ message }) {
                setError(message)
              } finally {
                setLoading(false)
              }
            }}>
            {loading ? <Spinner /> : 'Sign in with Google'}
          </button>
        </section>
      </main>

      <Footer />
    </>
  )
}

SignIn.getInitialProps = context => {
  const user = firebase.auth().currentUser

  if (user) {
    redirect(context, '/')
  }

  return {
    user
  }
}

export default SignIn
