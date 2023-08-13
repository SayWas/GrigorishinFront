import { DefaultAPIInstance } from '@/api'
import type { countrySchema } from '@/api/courses-api/countries-api'
import type { commentSchema } from '@/api/courses-api/comments-api'

export const CoursesAPI = {
  /**
   * @description Function that makes get course request to the server
   * @param id Course id
   * @returns Course
   * @throws {Error} Request error message
   */
  async getCourse(id: number): Promise<courseSchema> {
    const url: string = `/courses/${id}`
    let course: courseSchema | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.get(url)
      .then(async (r): Promise<void> => {
        if (r.status === 200) {
          course = r.data
        }
      })
      .catch((error) => (errorMessage = error.message))

    if (course) return course
    throw new Error(errorMessage)
  },

  /**
   * @description Function that makes get courses request to the server
   * @returns Courses
   * @throws {Error} Request error message
   */
  async getCourses(countryName: string | undefined = undefined): Promise<courseSchema[]> {
    const url: string = '/courses/'
    let courses: courseSchema[] | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.get(url, {
      params: {
        country_name: countryName
      }
    })
      .then(async (r): Promise<void> => {
        if (r.status === 200) {
          courses = r.data
        }
      })
      .catch((error) => (errorMessage = error.message))

    if (courses) return courses
    throw new Error(errorMessage)
  }
}

interface courseSchema {
  id: number
  title: string
  subtitle: string
  description: string
  price: number
  starting_at: string
  image_link: string
  country: countrySchema
  comments: commentSchema[]
}

interface courseProfileSchema {
  id: number
  title: string
  subtitle: string
  description: string
  link: string
  price: number
  starting_at: string
  image_link: string
  country: countrySchema
}

export type { courseSchema, courseProfileSchema };
