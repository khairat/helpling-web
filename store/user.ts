import axios from 'axios'
import { User } from 'firebase'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Request } from './types'

interface State {
  fetching: boolean
  loading: boolean
  requests: Request[]
  user: User | null
}
type StoreApi = StoreActionApi<State>

const initialState = {
  fetching: false,
  loading: false,
  requests: [],
  user: firebase.auth().currentUser
}

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
  init: () => ({ setState }: StoreApi) => {
    firebase.auth().onAuthStateChanged(user =>
      setState({
        user
      })
    )
  },
  signIn: (token?: string) => async ({ dispatch, setState }: StoreApi) => {
    setState({
      loading: true
    })

    if (token) {
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
    } else {
      const provider = new firebase.auth.GoogleAuthProvider()

      const {
        additionalUserInfo,
        user
      } = await firebase.auth().signInWithPopup(provider)

      const token = await user?.getIdToken()

      if (token) {
        await dispatch(actions.signIn(token))
      }

      setState({
        loading: false
      })

      return additionalUserInfo?.isNewUser
    }
  },
  signOut: () => async ({ setState }: StoreApi) => {
    await axios({
      url: '/api/sign-out'
    })

    await firebase.auth().signOut()

    setState(initialState)
  },
  updateName: (name: string) => async ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    await firebase.auth().currentUser?.updateProfile({
      displayName: name
    })

    setState({
      loading: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'user'
})

export const useUser = createHook(Store)
