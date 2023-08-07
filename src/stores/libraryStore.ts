import type { Ref, UnwrapRef } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { bookSchema } from '@/api/library-api'
import { LibraryAPI } from '@/api/library-api'

export const useLibraryStore = defineStore('library', () => {
  const page = ref(1)
  const libraryBooks: Ref<UnwrapRef<librarySchema>> = ref({})
  const totalBooks = ref(0)
  const totalPages = ref(0)
  const coursesIds: Ref<number[]> = ref([])

  async function getLibraryBooks(): Promise<void> {
    if (libraryBooks.value[page.value]) return
    await LibraryAPI.getLibraryBooks(page.value, coursesIds.value)
      .then((library) => {
        libraryBooks.value[page.value] = library.books
        totalBooks.value = library.total_books
        totalPages.value = library.total_pages
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function resetLibrary(): Promise<void> {
    libraryBooks.value = {}
    totalBooks.value = 0
    totalPages.value = 0
  }

  function resetFilters(): void {
    coursesIds.value = []
  }

  return {
    page,
    libraryBooks,
    totalBooks,
    totalPages,
    coursesIds,
    getLibraryBooks,
    resetLibrary,
    resetFilters
  }
})

interface librarySchema {
  [page: number]: bookSchema[]
}
