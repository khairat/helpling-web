import { startCase } from 'lodash'
import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'

import { img_request_types } from '../../assets'
import { Error, Footer, Header, Spinner } from '../../components'
import { auth, redirect } from '../../lib'
import { useRequests } from '../../store'

interface Props {
  userId?: string
}

const Request: NextPage<Props> = ({ userId }) => {
  const { query } = useRouter()

  const requestId = query.id as string

  const [ready, setReady] = useState(false)

  const [{ accepting, loading, others }, { accept, fetch }] = useRequests()

  useEffect(() => {
    fetch(requestId)

    setReady(true)
  }, [requestId])

  const request = others[requestId]

  const render = (children: ReactNode) => (
    <>
      <Head>
        <title>Request / _helper</title>
      </Head>

      <Header loggedIn={!!userId} />

      {children}

      <Footer />
    </>
  )

  if (ready && !loading && !request) {
    return render(<Error notFound />)
  }

  return render(
    <main className="main">
      <h1 className="text-5xl font-semibold text-secondary mb-8">Request</h1>
      {loading && <Spinner className="mt-4" />}
      {!loading && request && (
        <section>
          <div className="bg-primary p-4">
            {request.description
              .split('\n')
              .filter(Boolean)
              .map((line, index) => (
                <p key={index} className="text-xl">
                  {line}
                </p>
              ))}
          </div>
          <div className="mt-4 flex flex-col lg:flex-row lg:items-center text-gray-400">
            <span>
              <Link href={`/people/${request._user?.id}`}>
                <a>{request._user?.name}</a>
              </Link>
            </span>
            <span className="mt-4 lg:mt-0 lg:ml-4">
              <strong className="mr-2 font-medium text-gray-600">Posted</strong>
              {moment(request.createdAt.toDate()).fromNow()}
            </span>
            <span className="mt-4 lg:mt-0 lg:ml-4">
              <strong className="mr-2 font-medium text-gray-600">Status</strong>
              {startCase(request.status)}
            </span>
            <span className="mt-4 lg:mt-0 lg:ml-4 flex items-center">
              <strong className="mr-2 font-medium text-gray-600">Type</strong>
              <img
                className="h-10 w-10 mr-2"
                alt={request.type}
                src={img_request_types[request.type]}
              />
              {startCase(request.type)}
            </span>
          </div>
          {request.user.id !== userId &&
            request.status === 'pending' &&
            !request._helper && (
              <div className="mt-12">
                <p className="mt-4">Would you like to accept this request?</p>
                <button
                  onClick={async () => {
                    if (userId) {
                      await accept(requestId, userId)

                      fetch(requestId)
                    }
                  }}>
                  {accepting ? <Spinner /> : 'Accept'}
                </button>
              </div>
            )}
          {request._helper && request._helper.id === userId && (
            <div className="mt-12">
              <p className="mt-4">Bravo! You have accepted this request.</p>
              <p className="mt-4">
                Head on&nbsp;
                <Link
                  href={
                    request.thread
                      ? `/messages?thread=${request.thread.id}`
                      : `/messages/new?request=${request.id}`
                  }>
                  <a>over here</a>
                </Link>
                &nbsp;to talk to {request._user?.name} to find out how to fulfil
                this request.
              </p>
              {request.type === 'money' && (
                <div className="my-8 bg-primary inline-block p-4">
                  <h3 className="text-xl font-semibold text-secondary">
                    Payment details
                  </h3>
                  <p className="mt-2">
                    You can send money directly to {request._user?.name}.
                  </p>
                  <p className="mt-4 flex">
                    <a
                      className="button"
                      href={request.paymentLink}
                      rel="noopener noreferrer"
                      target="_blank">
                      {request.paymentMethod === 'payPal'
                        ? 'PayPal'
                        : startCase(request.paymentMethod)}
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}
          {request.user.id === userId && request._helper && (
            <div className="mt-12">
              <p className="mt-4">
                <Link href={`/people/${request._helper.id}`}>
                  <a>{request._helper.name}</a>
                </Link>
                &nbsp; has accepted your request.
              </p>
              <p className="mt-4">
                Head on&nbsp;
                <Link
                  href={
                    request.thread
                      ? `/messages?thread=${request.thread.id}`
                      : `/messages/new?request=${request.id}`
                  }>
                  <a>over here</a>
                </Link>
                &nbsp;to talk to them.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  )
}

Request.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)
  const userId = auth.getUserId(context)

  if (!loggedIn) {
    redirect(context, '/sign-in')
  }

  return {
    userId
  }
}

export default Request
