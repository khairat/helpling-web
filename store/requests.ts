import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Request } from './types'

interface State {
  loading: boolean
  requests: Request[]
}
type StoreApi = StoreActionApi<State>

const actions = {
  fetch: (userId?: string) => ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    firebase
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
  loading: false,
  requests: []
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'requests'
})

export const useRequests = createHook(Store)
