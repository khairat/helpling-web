import { countries } from './countries'

class Places {
  countries() {
    return Object.keys(countries)
  }

  cities(country: string) {
    return countries[country]
  }
}

export const places = new Places()
