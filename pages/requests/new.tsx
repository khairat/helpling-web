import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Footer, Header, Spinner } from '../../components'
import { auth, redirect } from '../../lib'
import { useRequests } from '../../store'
import { RequestType, RequestTypes } from '../../store/types'

interface Props {
  userId?: string
}

const NewRequest: NextPage<Props> = ({ userId }) => {
  const [description, setDescription] = useState('')
  const [payPalEmail, setPayPalEmail] = useState('')
  const [type, setType] = useState<RequestType>()

  const [{ creating }, { create }] = useRequests()

  return (
    <>
      <Head>
        <title>New request / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="main">
        <h1 className="text-5xl font-semibold text-secondary mb-8">
          New request
        </h1>
        <form
          onSubmit={async event => {
            event.preventDefault()

            if (userId && description && type) {
              const id = await create(
                userId,
                {
                  description,
                  type
                },
                payPalEmail
              )

              Router.push(`/requests/${id}`)
            }
          }}>
          <label>
            <span>Type</span>
            <select
              onChange={event => setType(event.target.value as RequestType)}
              placeholder="Type"
              required
              value={type}>
              {Object.entries(RequestTypes).map(([value, label], index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          {type === 'money' && (
            <label>
              <span>Share your PayPal email so someone can send you cash.</span>
              <input
                onChange={event => setPayPalEmail(event.target.value)}
                placeholder="PayPal email"
                type="email"
                value={payPalEmail}
              />
            </label>
          )}
          <label>
            <span>Describe your request. What do you need?</span>
            <textarea
              onChange={event => setDescription(event.target.value)}
              placeholder="Description"
              value={description}
            />
          </label>
          <button>{creating ? <Spinner /> : 'Create'}</button>
        </form>
      </main>

      <Footer />
    </>
  )
}

NewRequest.getInitialProps = async context => {
  const loggedIn = auth.isLoggedIn(context)
  const userId = auth.getUserId(context)

  if (!loggedIn) {
    redirect(context, '/sign-in')
  }

  return {
    userId
  }
}

export default NewRequest
