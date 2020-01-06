import axios from 'axios'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Request } from './types'

interface State {
  fetching: boolean
  loading: boolean
  requests: Request[]
}
type StoreApi = StoreActionApi<State>

const actions = {
  fetchRequests: (userId: string) => ({ setState }: StoreApi) => {
    setState({
      fetching: true
    })

    firebase
      .firestore()
      .collection('requests')
      .where('userId', '==', userId)
      .orderBy('updatedAt')
      .onSnapshot(({ docs }) => {
        const requests = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Request[]

        setState({
          fetching: false,
          requests
        })
      })
  },
  signIn: (token: string) => async ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    await axios({
      data: {
        token
      },
      method: 'post',
      url: '/api/sign-in'
    })

    setState({
      loading: false
    })
  }
}

type Actions = typeof actions

const initialState = {
  fetching: false,
  loading: false,
  requests: []
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'user'
})

export const useUser = createHook(Store)
