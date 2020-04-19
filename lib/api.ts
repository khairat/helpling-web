import axios from 'axios'

class API {
  async fetchRequest(kind: 'offer' | 'request', id: string) {
    const { data } = await axios(
      `${process.env.API_URI}/fetchRequest?id=${id}&kind=${kind}`
    )

    return {
      comments: data.comments,
      [kind]: data[kind]
    }
  }
}

export const api = new API()
