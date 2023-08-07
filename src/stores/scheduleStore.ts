import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { scheduleSchema } from '@/api/schedule-api'
import { ScheduleAPI } from '@/api/schedule-api'

export const useScheduleStore = defineStore('schedule', () => {
  const schedule: scheduleSchema = reactive({
    schedule: undefined
  })

  async function getSchedule(): Promise<void> {
    if (schedule.schedule) return
    await ScheduleAPI.getSchedule()
      .then((r) => {
        Object.assign(schedule, r)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  return { schedule, getSchedule }
})
