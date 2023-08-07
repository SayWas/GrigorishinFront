import { DefaultAPIInstance } from '@/api'
import type { courseSchema } from '@/api/courses-api'
import qs from 'qs'

export const LibraryAPI = {
  /**
   * @description Function that makes get library preview request to the server
   * @returns Library Preview
   * @throws {Error} Request error message
   */
  async getLibraryPreview(): Promise<libraryPreviewSchema> {
    const url: string = '/library/preview'
    let libPreview: libraryPreviewSchema | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.get(url)
      .then(async (r): Promise<void> => {
        if (r.status === 200) {
          libPreview = r.data
        }
      })
      .catch((error) => (errorMessage = error.message))

    if (libPreview) return libPreview
    throw new Error(errorMessage)
  },

  /**
   * @description Function that makes get library books request to the server
   * @param page Page number
   * @param coursesIds Courses ids for filtering
   * @returns Library Books
   * @throws {Error} Request error message
   */
  async getLibraryBooks(page: number, coursesIds: number[] = []): Promise<librarySchema> {
    const url: string = '/library/'
    let library: librarySchema | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.get(url, {
      params: {
        page: page,
        courses_ids: coursesIds
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
      .then(async (r): Promise<void> => {
        if (r.status === 200) {
          library = r.data
        }
      })
      .catch((error) => (errorMessage = error.message))

    if (library) return library
    throw new Error(errorMessage)
  }
}

interface libraryPreviewSchema {
  id: number
  quote: string
  quote_author: string
  book: bookSchema
}

interface bookSchema {
  id: number
  title: string
  author: string
  download_link: string | undefined
  courses: courseSchema[]
}

interface librarySchema {
  total_books: number,
  total_pages: number,
  books: bookSchema[]
}

export type { libraryPreviewSchema, bookSchema }
