import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Message, Thread, User } from './types'

interface State {
  creating: boolean
  loading: boolean
  loadingMessages: boolean
  messages: Message[]
  sending: boolean
  threads: Thread[]
}
type StoreApi = StoreActionApi<State>

const initialState: State = {
  creating: false,
  loading: false,
  loadingMessages: false,
  messages: [],
  sending: false,
  threads: []
}

const actions = {
  fetch: (userId: string) => ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    const user = firebase
      .firestore()
      .collection('users')
      .doc(userId)

    firebase
      .firestore()
      .collection('threads')
      .where('users', 'array-contains', user)
      .orderBy('updatedAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        const threads = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Thread[]

        await Promise.all(
          threads.map(async thread => {
            const _users = await Promise.all(
              thread.users.map(async user => {
                const _user = await user.get()

                return {
                  id: _user.id,
                  ..._user.data()
                } as User
              })
            )

            thread._users = _users
          })
        )

        setState({
          loading: false,
          threads
        })
      })
  },
  fetchMessages: (threadId: string) => ({ setState }: StoreApi) => {
    setState({
      loadingMessages: true
    })

    const thread = firebase
      .firestore()
      .collection('threads')
      .doc(threadId)

    firebase
      .firestore()
      .collection('messages')
      .where('thread', '==', thread)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        const messages = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[]

        await Promise.all(
          messages.map(async message => {
            const user = await message.user.get()

            const _user = {
              id: user.id,
              ...user.data()
            } as User

            message._user = _user
          })
        )

        setState({
          loadingMessages: false,
          messages
        })
      })
  },
  reply: (threadId: string, userId: string, body: string) => async ({
    setState
  }: StoreApi) => {
    setState({
      sending: true
    })

    const thread = firebase
      .firestore()
      .collection('threads')
      .doc(threadId)

    const user = firebase
      .firestore()
      .collection('users')
      .doc(userId)

    await firebase
      .firestore()
      .collection('messages')
      .add({
        body,
        createdAt: new Date(),
        thread,
        user
      })

    setState({
      sending: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'messages'
})

export const useMessages = createHook(Store)
