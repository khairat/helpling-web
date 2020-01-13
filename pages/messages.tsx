import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { Footer, Header } from '../components'
import { List, Thread } from '../components/messages'
import { auth, redirect } from '../lib'
import { useMessages } from '../store'

interface Props {
  userId: string
}

const Messages: NextPage<Props> = ({ userId }) => {
  const {
    push,
    query: { thread }
  } = useRouter()

  const threadId = thread as string

  const [
    { loading, loadingMessages, messages, threads },
    { fetch, fetchMessages, reply }
  ] = useMessages()

  useEffect(() => {
    fetch(userId)
  }, [])

  useEffect(() => {
    if (threadId) {
      fetchMessages(threadId)
    }
  }, [threadId])

  return (
    <>
      <Head>
        <title>Messages / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="main">
        <h1 className="text-5xl font-semibold mb-8 text-secondary">Messages</h1>
        <section className="flex flex-1">
          <List
            loading={loading}
            onChange={threadId => push(`/messages?thread=${threadId}`)}
            threadId={threadId}
            threads={threads}
            userId={userId}
          />
          {threadId && (
            <Thread
              loading={loadingMessages}
              messages={messages}
              onReply={body => reply(threadId, userId, body)}
              userId={userId}
            />
          )}
        </section>
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
