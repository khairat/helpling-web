import { User } from 'firebase'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header } from '../components'
import { firebase, redirect } from '../lib'

interface Props {
  user: User | null
}

const Profile: NextPage<Props> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{user?.displayName} / Helpling</title>
      </Head>

      <Header />

      <main className="items-center justify-center">
        <h1 className="text-3xl font-semibold">Hello, {user?.displayName}</h1>
      </main>

      <Footer />
    </>
  )
}

Profile.getInitialProps = context => {
  const user = firebase.auth().currentUser

  if (!user) {
    redirect(context, '/')
  }

  return {
    user
  }
}

export default Profile
