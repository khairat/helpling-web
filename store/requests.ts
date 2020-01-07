import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Request } from './types'

interface State {
  loading: boolean
  requests: Request[]
}
type StoreApi = StoreActionApi<State>

const actions = {
  fetch: () => ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    firebase
      .firestore()
      .collection('requests')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(({ docs }) => {
        const requests = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Request[]

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
