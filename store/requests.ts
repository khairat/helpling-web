import { firestore } from 'firebase/app'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Request, User } from './types'

interface State {
  accepting: boolean
  creating: boolean
  loading: boolean
  others: Record<string, Request>
  requests: Request[]
}
type StoreApi = StoreActionApi<State>

const initialState: State = {
  accepting: false,
  creating: false,
  loading: false,
  others: {},
  requests: []
}

let unsubscribeFetchAll: () => void

const actions = {
  accept: (id: string, userId: string) => async ({ setState }: StoreApi) => {
    setState({
      accepting: true
    })

    const helper = firestore()
      .collection('users')
      .doc(userId)

    await firestore()
      .collection('requests')
      .doc(id)
      .update({
        helper,
        updatedAt: new Date()
      })

    setState({
      accepting: false
    })
  },
  create: (userId: string, data: Partial<Request>) => async ({
    setState
  }: StoreApi) => {
    setState({
      creating: true
    })

    const user = firebase
      .firestore()
      .collection('users')
      .doc(userId)

    const { id } = await firebase
      .firestore()
      .collection('requests')
      .add({
        ...data,
        createdAt: new Date(),
        status: 'pending',
        updatedAt: new Date(),
        user
      })

    setState({
      creating: false
    })

    return id
  },
  fetch: (id: string) => async ({ getState, setState }: StoreApi) => {
    const { others } = getState()

    if (others[id]) {
      return
    }

    setState({
      loading: true
    })

    try {
      firebase
        .firestore()
        .collection('requests')
        .doc(id)
        .onSnapshot(async doc => {
          const request = {
            id: doc.id,
            ...doc.data()
          } as Request

          const user = await request.user.get()

          request._user = {
            id: user.id,
            ...user.data()
          } as User

          if (request.helper) {
            const helper = await request.helper.get()

            request._helper = {
              id: helper.id,
              ...helper.data()
            } as User
          }

          const { others } = getState()

          setState({
            loading: false,
            others: {
              ...others,
              [id]: request
            }
          })
        })
    } catch {
      setState({
        loading: false
      })
    }
  },
  fetchAll: (userId?: string) => ({ setState }: StoreApi) => {
    if (unsubscribeFetchAll !== undefined) {
      return
    }

    setState({
      loading: true
    })

    unsubscribeFetchAll = firebase
      .firestore()
      .collection('requests')
      .where('status', '==', 'pending')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(({ docs }) => {
        let requests = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Request[]

        if (userId) {
          requests = requests.filter(({ user }) => user.id !== userId)
        }

        setState({
          loading: false,
          requests
        })
      })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'requests'
})

export const useRequests = createHook(Store)
