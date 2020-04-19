import moment from 'moment'
import React, { FunctionComponent } from 'react'

import { CommentType } from '../types'

interface Props {
  comment: CommentType
}

export const Comment: FunctionComponent<Props> = ({ comment }) => (
  <section className="flex items-center mt-4">
    <img
      className="h-8 w-8 rounded-full"
      src={`https://api.adorable.io/avatar/${comment.user.id}`}
    />
    <div className="ml-4 flex flex-col flex-1 break-words overflow-hidden">
      <div className="bg-primary-dark rounded-lg p-4 self-start">
        {comment.body
          .split('\n')
          .filter(Boolean)
          .map((line, index) => (
            <p className="text-lg mb-2 last:mb-0" key={index}>
              {line}
            </p>
          ))}
      </div>
      <div className="mt-2 flex flex-col lg:flex-row items-center">
        <span className="font-medium text-accent">{comment.user.name}</span>
        <span className="mt-2 lg:mt-0 lg:ml-2 text-gray-500">
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>
    </div>
  </section>
)
