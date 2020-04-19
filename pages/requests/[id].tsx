import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Comment, Footer, Header, Item } from '../../components'
import { api } from '../../lib'
import { CommentType, RequestType } from '../../types'

interface Props {
  request: RequestType
  comments: CommentType[]
}

const Request: NextPage<Props> = ({ comments, request }) => (
  <>
    <Head>
      <title>Request / Helpling</title>
    </Head>

    <Header />

    <main className="max-w-3xl">
      <h1 className="text-5xl font-semibold text-accent mb-4">Request</h1>
      <Item item={request} />
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

Request.getInitialProps = async ({ query: { id } }) => {
  const { comments, request } = await api.fetchRequest('request', id as string)

  return {
    comments,
    request
  }
}

export default Request
