import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Footer, Header, Message, Spinner } from '../components'
import { auth, places, redirect } from '../lib'
import { useUser } from '../store'

const SignIn: NextPage = () => {
  const [error, setError] = useState('')
  const [isNew, setIsNew] = useState(false)

  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')

  const [{ loading }, { signIn, updateProfile }] = useUser()

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

                if (name && city && country) {
                  setError('')

                  try {
                    await updateProfile({
                      city,
                      country,
                      name
                    })

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
              <label>
                <span>Where are you from?</span>
                <select
                  className="bg-primary"
                  onChange={event => setCountry(event.target.value)}
                  placeholder="Country"
                  required
                  value={country}>
                  {places.countries().map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>
              {country && (
                <label>
                  <select
                    className="bg-primary"
                    onChange={event => setCity(event.target.value)}
                    placeholder="Country"
                    required
                    value={city}>
                    {places.cities(country).map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </label>
              )}
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
