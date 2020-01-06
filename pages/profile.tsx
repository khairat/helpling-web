import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'

import { Footer, Header } from '../components'
import { auth, redirect } from '../lib'
import { useUser } from '../store'

interface Props {
  loggedIn: boolean
}

const Profile: NextPage<Props> = ({ loggedIn }) => {
  const [{ user }, { init }] = useUser()

  useEffect(() => {
    init()
  })

  return (
    <>
      <Head>
        <title>{user?.displayName || 'Profile'} / Helpling</title>
      </Head>

      <Header loggedIn={loggedIn} />

      <main className="items-center justify-center">
        <h1 className="text-3xl font-semibold">
          {user ? `Hello, ${user.displayName}` : 'Hello!'}
        </h1>
      </main>

      <Footer />
    </>
  )
}

Profile.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)

  if (!loggedIn) {
    redirect(context, '/sign-in')
  }

  return {
    loggedIn
  }
}

export default Profile
