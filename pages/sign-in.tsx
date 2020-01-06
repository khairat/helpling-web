import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Footer, Header, Message, Spinner } from '../components'
import { firebase, redirect } from '../lib'

const SignIn: NextPage = () => {
  const [error, setError] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  return (
    <>
      <Head>
        <title>Sign in / Helpling</title>
      </Head>

      <Header />

      <main className="items-center justify-center">
        <section className="bg-primary-dark rounded-lg p-8 w-signin">
          <h1 className="text-5xl font-semibold">Hello</h1>
          {error && <Message message={error} type="error" />}
          {isNew && (
            <form
              className="mt-40"
              onSubmit={async event => {
                event.preventDefault()

                if (name) {
                  setError('')
                  setLoading(true)

                  try {
                    await firebase.auth().currentUser?.updateProfile({
                      displayName: name
                    })

                    Router.replace('/')
                  } catch ({ message }) {
                    setError(message)
                  } finally {
                    setLoading(false)
                  }
                }
              }}>
              <label>
                <span>Pick a username</span>
                <input
                  className="bg-primary w-full"
                  onChange={event => setName(event.target.value)}
                  placeholder="Username"
                  required
                  type="text"
                  value={name}
                />
              </label>
              <button>{loading ? <Spinner /> : 'Sign up'}</button>
            </form>
          )}
          {!isNew && (
            <button
              className="mt-40 w-full"
              onClick={async () => {
                setError('')
                setLoading(true)

                try {
                  const provider = new firebase.auth.GoogleAuthProvider()

                  const {
                    additionalUserInfo
                  } = await firebase.auth().signInWithPopup(provider)

                  if (additionalUserInfo?.isNewUser) {
                    setIsNew(true)
                  } else {
                    Router.replace('/')
                  }
                } catch ({ message }) {
                  setError(message)
                } finally {
                  setLoading(false)
                }
              }}>
              {loading ? <Spinner /> : 'Sign in with Google'}
            </button>
          )}
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
