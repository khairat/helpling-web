import { NextPageContext } from 'next'
import cookies from 'next-cookies'

import { firebase } from './firebase'

class Auth {
  getUserId(context: NextPageContext): string | undefined {
    if (process.browser) {
      return firebase.auth().currentUser?.uid
    }

    const { userId } = cookies(context)

    return userId
  }

  isLoggedIn(context: NextPageContext): boolean {
    return !!this.getUserId(context)
  }
}

export const auth = new Auth()
