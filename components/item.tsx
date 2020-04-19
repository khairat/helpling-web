import moment from 'moment'
import React, { FunctionComponent } from 'react'

import { RequestType } from '../types'

interface Props {
  item: RequestType
}

export const Item: FunctionComponent<Props> = ({ item }) => (
  <section className="bg-primary-dark rounded-lg p-4 flex items-center">
    <img
      className="h-12 w-12 rounded-full"
      src={`/img/type_${item.type}.svg`}
    />
    <div className="ml-4 flex-1 break-words overflow-hidden">
      <div>
        {item.description
          .split('\n')
          .filter(Boolean)
          .map((line, index) => (
            <p className="text-xl mb-2" key={index}>
              {line}
            </p>
          ))}
      </div>
      <div className="my-2 text-gray-500">
        {item.city}, {item.country}
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <span className="font-medium text-accent">{item.user.name}</span>
        <span className="mt-2 lg:mt-0 lg:ml-2 text-gray-500">
          {moment(item.createdAt).fromNow()}
        </span>
        <span
          className={`mt-2 lg:mt-0 lg:ml-2 font-medium text-status-${item.status}`}>
          {item.status}
        </span>
      </div>
    </div>
  </section>
)
