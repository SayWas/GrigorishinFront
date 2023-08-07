import type { Ref, UnwrapRef } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { countryBlockSchema } from '@/api/courses-api/countries-api'
import { CountriesAPI } from '@/api/courses-api/countries-api'

export const useCountriesStore = defineStore('countries', () => {
  const countryBlocks: Ref<UnwrapRef<countryBlockSchema[]>> = ref([])

  async function getCountryBlocks(): Promise<void> {
    if (countryBlocks.value.length) return
    await CountriesAPI.getCountryBlocks()
      .then((blocks) => {
        countryBlocks.value = blocks
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    getCountryBlocks,
    countryBlocks
  }
})
