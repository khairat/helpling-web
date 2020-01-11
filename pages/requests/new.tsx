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
  const [paymentLink, setPaymentLink] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<RequestPaymentMethod>()
  const [type, setType] = useState<RequestType>()

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
                paymentLink,
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
          {type && (
            <p className="mt-4 text-lg text-gray-500">
              {type === 'food'
                ? `Haven't received your salary yet? Unexpected expenses prevent you from buying food or groceries?`
                : type === 'invite'
                ? `Need help getting a job interview? Or just moved to a new city and don't know anyone?`
                : type === 'money'
                ? `Need financial help for an unexpected expense?`
                : `Moved to a new apartment and need some furniture?`}
            </p>
          )}
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
              {paymentMethod && (
                <label>
                  <span>
                    Share your
                    {paymentMethod === 'cashApp'
                      ? ' $Cashtag '
                      : paymentMethod === 'payPal'
                      ? ' PayPal.me link '
                      : paymentMethod === 'venmo'
                      ? ' Venmo code '
                      : ' '}
                    so someone can send you cash.
                  </span>
                  <input
                    onChange={event => setPaymentLink(event.target.value)}
                    placeholder={
                      paymentMethod === 'cashApp'
                        ? '$Cashtag'
                        : paymentMethod === 'payPal'
                        ? 'Link'
                        : paymentMethod === 'venmo'
                        ? 'Code'
                        : ''
                    }
                    required
                    type="text"
                    value={paymentLink}
                  />
                </label>
              )}
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
