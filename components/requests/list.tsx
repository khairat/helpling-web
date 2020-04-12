import { startCase } from 'lodash'
import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent, ReactNode } from 'react'

import { Request } from '../../store/types'
import { Spinner } from '../spinner'

interface Props {
  empty: ReactNode
  loading: boolean
  requests: Request[]
}

export const List: FunctionComponent<Props> = ({
  empty,
  loading,
  requests
}) => (
  <>
    {loading && <Spinner className="mt-4" />}
    {!loading && requests.length === 0 && empty}
    {!loading && requests.length > 0 && (
      <div className="bg-primary overflow-auto rounded">
        <table>
          <thead>
            <tr>
              <th>Request</th>
              <th>Location</th>
              <th className="text-center">Type</th>
              <th>Status</th>
              <th>Posted</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(
              (
                { city, country, createdAt, description, id, status, type },
                index
              ) => (
                <tr key={index}>
                  <td>
                    <Link href={`/requests/${id}`}>
                      <a>
                        {description
                          .split('\n')
                          .filter(Boolean)
                          .map((line, index) => (
                            <p key={index} className="line">
                              {line}
                            </p>
                          ))}
                      </a>
                    </Link>
                  </td>
                  <td>
                    {city}, {country}
                  </td>
                  <td>
                    <img
                      alt={type}
                      className="h-8 w-8 m-auto"
                      src={`/img/type_${type}.svg`}
                      title={type}
                    />
                  </td>
                  <td>{startCase(status)}</td>
                  <td className="whitespace-no-wrap">
                    {moment(createdAt.toDate()).fromNow()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )}
  </>
)
