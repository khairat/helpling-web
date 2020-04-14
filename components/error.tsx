import React, { FunctionComponent } from 'react'

import { Hero } from './hero'

interface Props {
  notFound: boolean
}

export const Error: FunctionComponent<Props> = ({ notFound }) => (
  <main className="justify-center">
    <Hero>
      <h1 className="text-5xl font-semibold text-accent">
        {notFound ? 'Not found' : 'Error'}
      </h1>
      <h3 className="text-3xl font-semibold mt-8">Holy moly!</h3>
      {notFound ? (
        <>
          <p className="mt-4 text-center">
            We can&apos;t find what you were looking for.
          </p>
          <p className="mt-4 text-center">
            The authorities have been informed and we&apos;re looking into it
            right now.
          </p>
        </>
      ) : (
        <p className="mt-4 text-center">
          Something terrible happened. Step away from your computer and lock the
          doors.
        </p>
      )}
    </Hero>
  </main>
)
