import { DefaultAPIInstance } from '@/api'
import type { courseSchema } from '@/api/courses-api'

export const ScheduleAPI = {
  /**
   * @description Function that makes get schedule request to the server
   * @returns Schedule
   * @throws {Error} Request error message
   */
  async getSchedule(): Promise<scheduleSchema> {
    const url: string = '/schedule/'
    let schedule: scheduleSchema | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.get(url)
      .then(async (r): Promise<void> => {
        if (r.status === 200) {
          schedule = r.data
        }
      })
      .catch((error) => (errorMessage = error.message))

    if (schedule) return schedule
    throw new Error(errorMessage)
  }
}

interface scheduleRowSchema{
  id: number
  course: courseSchema
  start_time: string
  end_time: string
}

interface scheduleSchema {
  schedule: { [week_day: number]: scheduleRowSchema[] } | undefined
}

export type { scheduleSchema, scheduleRowSchema }
