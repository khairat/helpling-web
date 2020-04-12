import clsx from 'clsx'
import { debounce } from 'lodash'
import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { Message } from '../../store/types'
import { Spinner } from '../spinner'
import { Reply } from './reply'

interface Props {
  loading: boolean
  messages: Message[]
  userId: string

  onReply: (body: string) => void
}

export const Thread: FunctionComponent<Props> = ({
  loading,
  messages,
  onReply,
  userId
}) => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handler = debounce(() => {
      setHeight(0)

      setHeight(document.getElementById('list')?.clientHeight || 0)
    }, 100)

    handler()

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  useEffect(() => {
    const messages = document.getElementById('messages')

    if (messages) {
      messages.scrollTo({
        behavior: 'smooth',
        top: messages.scrollHeight
      })
    }
  }, [messages.length])

  return (
    <section
      style={{
        height
      }}
      className="bg-primary flex-1 flex-col flex ml-8 rounded overflow-hidden">
      <div
        id="messages"
        className={clsx(
          'flex-1',
          'flex-col-reverse',
          'flex',
          'overflow-auto',
          'py-2',

          messages.length === 0 && 'justify-center items-center'
        )}>
        {loading && messages.length === 0 && <Spinner className="m-8" />}
        {!loading && messages.length === 0 && <p>No messages yet.</p>}
        {messages.map(({ body, createdAt, user }, index) => (
          <article key={index} className="flex mx-4 my-2 items-center">
            <Link href={`/people/${user.id}`}>
              <a
                className={clsx(
                  'font-medium',

                  user.id === userId && 'text-gray-500'
                )}>
                {user.name}
              </a>
            </Link>
            <div className="mx-4">
              {body.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <span className="text-gray-600 text-sm whitespace-no-wrap">
              {moment(createdAt.toDate()).fromNow(true)}
            </span>
          </article>
        ))}
      </div>
      <Reply onReply={(body) => onReply(body)} />
    </section>
  )
}
