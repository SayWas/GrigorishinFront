import { DefaultAPIInstance } from '@/api'

export const CountriesAPI = {
  /**
   * @description Function that makes get countries request to the server
   * @returns Countries
   * @throws {Error} Request error message
   */
  async getCountryBlocks(): Promise<countryBlockSchema[]> {
    const url: string = '/countries/blocks'
    let countryBlocks: countryBlockSchema[] | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.get(url)
      .then(async (r): Promise<void> => {
        if (r.status === 200) {
          countryBlocks = r.data
        }
      })
      .catch((error) => (errorMessage = error.message))

    if (countryBlocks) return countryBlocks
    throw new Error(errorMessage)
  }
}

interface countryBlockSchema {
  id: number
  name: string
  countries: countrySchema[]
}

interface countrySchema {
  id: number
  name: string
}

export type { countryBlockSchema, countrySchema }