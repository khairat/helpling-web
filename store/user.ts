import axios from 'axios'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Request, User } from './types'

interface State {
  fetching: boolean
  loading: boolean
  requests: Request[]
  user: User | null
}
type StoreApi = StoreActionApi<State>

const initialState: State = {
  fetching: false,
  loading: false,
  requests: [],
  user: null
}

let unsubscribeFetch: () => void
let unsubscribeFetchRequests: () => void

const actions = {
  fetch: (userId: string) => ({ setState }: StoreApi) => {
    if (unsubscribeFetch !== undefined) {
      return
    }

    setState({
      loading: true
    })

    unsubscribeFetch = firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(user => {
        const data = user.data()

        if (data) {
          setState({
            user: data as User
          })
        }

        setState({
          loading: false
        })
      })
  },
  fetchRequests: (userId: string) => async ({ setState }: StoreApi) => {
    if (unsubscribeFetchRequests !== undefined) {
      return
    }

    setState({
      fetching: true
    })

    const user = firebase
      .firestore()
      .collection('users')
      .doc(userId)

    unsubscribeFetchRequests = firebase
      .firestore()
      .collection('requests')
      .where('user', '==', user)
      .orderBy('updatedAt', 'desc')
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
  signIn: (token?: string, isNew?: boolean) => async ({
    dispatch,
    setState
  }: StoreApi) => {
    setState({
      loading: true
    })

    try {
      if (token) {
        await axios({
          data: {
            isNew,
            token
          },
          method: 'post',
          url: '/api/sign-in'
        })
      } else {
        const provider = new firebase.auth.GoogleAuthProvider()

        const {
          additionalUserInfo,
          user
        } = await firebase.auth().signInWithPopup(provider)

        const isNew = additionalUserInfo?.isNewUser

        const token = await user?.getIdToken()

        if (token) {
          await dispatch(actions.signIn(token, isNew))
        }

        if (isNew) {
          await firebase
            .firestore()
            .collection('users')
            .doc(user?.uid)
            .set({
              createdAt: new Date(),
              email: user?.email,
              id: user?.uid,
              name: user?.displayName
            })
        }

        return isNew
      }
    } finally {
      setState({
        loading: false
      })
    }
  },
  signOut: () => async ({ setState }: StoreApi) => {
    await axios({
      url: '/api/sign-out'
    })

    await firebase.auth().signOut()

    setState(initialState)
  },
  updateProfile: (data: Partial<User>) => async ({ setState }: StoreApi) => {
    const userId = firebase.auth().currentUser?.uid

    if (userId) {
      setState({
        loading: true
      })

      try {
        await firebase
          .firestore()
          .collection('users')
          .doc(userId)
          .update(data)
      } finally {
        setState({
          loading: false
        })
      }
    }
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'user'
})

export const useUser = createHook(Store)
