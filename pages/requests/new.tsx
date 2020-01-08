import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Footer, Header, Spinner } from '../../components'
import { auth, redirect } from '../../lib'
import { useRequests } from '../../store'
import {
  RequestPaymentMethod,
  RequestPaymentMethods,
  RequestType,
  RequestTypes
} from '../../store/types'

interface Props {
  userId?: string
}

const NewRequest: NextPage<Props> = ({ userId }) => {
  const [cashRequired, setCashRequired] = useState(10)
  const [description, setDescription] = useState('')
  const [paymentEmail, setPaymentEmail] = useState('')
  const [type, setType] = useState<RequestType>()
  const [paymentMethod, setPaymentMethod] = useState<RequestPaymentMethod>()

  const [{ creating }, { create }] = useRequests()

  return (
    <>
      <Head>
        <title>New request / Helpling</title>
      </Head>

      <Header loggedIn={!!userId} />

      <main className="main">
        <h1 className="text-5xl font-semibold text-secondary">New request</h1>
        <form
          onSubmit={async event => {
            event.preventDefault()

            if (userId && description && type) {
              const id = await create(userId, {
                cashRequired,
                description,
                paymentEmail,
                paymentMethod,
                type
              })

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
              <option disabled={!!type} value="">
                Type
              </option>
              {Object.entries(RequestTypes).map(([value, label], index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          {type === 'money' && (
            <>
              <label>
                <span>Payment method</span>
                <select
                  onChange={event =>
                    setPaymentMethod(event.target.value as RequestPaymentMethod)
                  }
                  placeholder="Method"
                  required
                  value={paymentMethod}>
                  <option disabled={!!paymentMethod} value="">
                    Method
                  </option>
                  {Object.entries(RequestPaymentMethods).map(
                    ([value, label], index) => (
                      <option key={index} value={value}>
                        {label}
                      </option>
                    )
                  )}
                </select>
              </label>
              <label>
                <span>
                  Share your
                  {paymentMethod
                    ? ` ${RequestPaymentMethods[paymentMethod]} `
                    : ' '}
                  email so someone can send you cash.
                </span>
                <input
                  onChange={event => setPaymentEmail(event.target.value)}
                  placeholder="Email"
                  required
                  type="email"
                  value={paymentEmail}
                />
              </label>
              <label>
                <span>How much do you need? In USD.</span>
                <input
                  max={200}
                  min={10}
                  onChange={event =>
                    setCashRequired(Number(event.target.value))
                  }
                  placeholder="Cash"
                  required
                  step={10}
                  type="number"
                  value={String(cashRequired)}
                />
              </label>
            </>
          )}
          <label>
            <span>Describe your request. What do you need?</span>
            <textarea
              onChange={event => setDescription(event.target.value)}
              placeholder="Description"
              required
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
