import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { Footer, Header, Hero, Spinner } from '../../components'
import { auth, redirect } from '../../lib'
import { useMessages } from '../../store'

interface Props {
  userId: string
}

const Messages: NextPage<Props> = ({ userId }) => {
  const { query, replace } = useRouter()

  const request = query.request as string

  const [, { createOrFetch }] = useMessages()

  useEffect(() => {
    createOrFetch(request).then(threadId =>
      replace(`/messages?thread=${threadId}`)
    )
  }, [])

  return (
    <>
      <Head>
        <title>Messages / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="justify-center">
        <Hero>
          <Spinner />
        </Hero>
      </main>

      <Footer />
    </>
  )
}

Messages.getInitialProps = context => {
  const loggedIn = auth.isLoggedIn(context)
  const userId = auth.getUserId(context) as string

  if (!loggedIn) {
    redirect(context, '/sign-in')
  }

  return {
    userId
  }
}

export default Messages
