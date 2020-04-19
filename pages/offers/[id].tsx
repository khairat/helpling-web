import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Comment, Footer, Header, Item } from '../../components'
import { api } from '../../lib'
import { CommentType, RequestType } from '../../types'

interface Props {
  offer: RequestType
  comments: CommentType[]
}

const Offer: NextPage<Props> = ({ comments, offer }) => (
  <>
    <Head>
      <title>Offer / Helpling</title>
    </Head>

    <Header />

    <main className="max-w-3xl">
      <h1 className="text-5xl font-semibold text-accent mb-4">Offer</h1>
      <Item item={offer} />
      <h2 className="text-3xl font-semibold text-secondary mt-8">
        Comments ({comments.length})
      </h2>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </main>

    <Footer />
  </>
)

Offer.getInitialProps = async ({ query: { id } }) => {
  const { comments, offer } = await api.fetchRequest('offer', id as string)

  return {
    comments,
    offer
  }
}

export default Offer
