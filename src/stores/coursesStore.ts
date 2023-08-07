import type { Ref, UnwrapRef } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { courseSchema } from '@/api/courses-api'
import { CoursesAPI } from '@/api/courses-api'

export const useCoursesStore = defineStore('courses', () => {
  const allCourses: Ref<UnwrapRef<courseSchema[]>> = ref([])
  const courses: Ref<UnwrapRef<courseSchema[]>> = ref([])
  const coursesByIds: Ref<UnwrapRef<courseStorageSchema>> = ref({})

  function getCoursesByCountry(countryName: string | undefined = undefined): void {
    if (!countryName) {
      courses.value = allCourses.value
      return
    }
    courses.value = allCourses.value.filter((course) => course.country.name === countryName)
  }

  async function getCourses(): Promise<void> {
    if (allCourses.value.length) {
      courses.value = allCourses.value
      return
    }
    await CoursesAPI.getCourses()
      .then((crs) => {
        allCourses.value = crs
        courses.value = crs
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getCourse(id: number): Promise<void> {
    if (coursesByIds.value[id]) return
    await CoursesAPI.getCourse(id)
      .then((course) => {
        coursesByIds.value[id] = course
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    getCourses,
    getCourse,
    getCoursesByCountry,
    courses,
    coursesByIds
  }
})

interface courseStorageSchema {
  [id: number]: courseSchema
}
