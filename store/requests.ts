import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Request } from './types'

interface State {
  creating: boolean
  loading: boolean
  requests: Request[]
}
type StoreApi = StoreActionApi<State>

let unsubscribeFetch: () => void

const actions = {
  create: (
    userId: string,
    data: Partial<Request>,
    payPalEmail?: string
  ) => async ({ setState }: StoreApi) => {
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

    if (payPalEmail) {
      await user.update({
        payPalEmail
      })
    }

    setState({
      creating: false
    })

    return id
  },
  fetch: (userId?: string) => ({ setState }: StoreApi) => {
    if (unsubscribeFetch !== undefined) {
      return
    }

    setState({
      loading: true
    })

    unsubscribeFetch = firebase
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

const initialState = {
  creating: false,
  loading: false,
  requests: []
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'requests'
})

export const useRequests = createHook(Store)
