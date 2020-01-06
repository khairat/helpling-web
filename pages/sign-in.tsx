import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Footer, Header, Message, Spinner } from '../components'
import { auth, redirect } from '../lib'
import { useUser } from '../store'

const SignIn: NextPage = () => {
  const [error, setError] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [name, setName] = useState('')

  const [{ loading }, { signIn, updateName }] = useUser()

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
          {isNew ? (
            <form
              className="mt-40"
              onSubmit={async event => {
                event.preventDefault()

                if (name) {
                  setError('')

                  try {
                    await updateName(name)

                    Router.replace('/')
                  } catch ({ message }) {
                    setError(message)
                  }
                }
              }}>
              <label>
                <span>Pick a username</span>
                <input
                  className="bg-primary"
                  onChange={event => setName(event.target.value)}
                  placeholder="Username"
                  required
                  type="text"
                  value={name}
                />
              </label>
              <button>{loading ? <Spinner /> : 'Sign up'}</button>
            </form>
          ) : (
            <button
              className="mt-40"
              onClick={async () => {
                setError('')

                try {
                  const isNew = await signIn()

                  if (isNew) {
                    setIsNew(true)
                  } else {
                    Router.replace('/')
                  }
                } catch ({ message }) {
                  setError(message)
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
  const loggedIn = auth.isLoggedIn(context)

  if (loggedIn) {
    redirect(context, '/')
  }

  return {
    loggedIn
  }
}

export default SignIn
