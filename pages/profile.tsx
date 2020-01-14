import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'

import { Footer, Header, Hero, Spinner } from '../components'
import { auth, redirect } from '../lib'
import { useUser } from '../store'

interface Props {
  userId: string
}

const Profile: NextPage<Props> = ({ userId }) => {
  const [{ loading, user }, { fetch }] = useUser()

  useEffect(() => {
    if (userId) {
      fetch(userId)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{user?.name || 'Profile'} / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="justify-center">
        <Hero>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="text-4xl font-semibold text-secondary">
                {user ? `Hello, ${user.name}` : 'Hello!'}
              </h1>
              {user && (
                <h2 className="mt-4 text-2xl font-medium">
                  From {user.city}, {user.country}
                </h2>
              )}
            </>
          )}
        </Hero>
      </main>

      <Footer />
    </>
  )
}

Profile.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)
  const userId = auth.getUserId(context) as string

  if (!loggedIn) {
    redirect(context, '/sign-in')
  }

  return {
    userId
  }
}

export default Profile
