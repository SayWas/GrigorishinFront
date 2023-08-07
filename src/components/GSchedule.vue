<template>
  <div class="g--schedule">
    <div v-for="(scheduleRow, index) in schedule.schedule" :key="index" class="g--schedule--day">
      <p>
        <strong class="g--schedule--day--name">{{ weekDays[index] }}</strong>
      </p>
      <div class="g--schedule--day--info">
        <p v-for="courseTime in scheduleRow" :key="courseTime.id">
          {{
            new Date(courseTime.start_time).getHours().toString() +
            ':' +
            new Date(courseTime.start_time).getMinutes()
          }}
          /
          {{
            new Date(courseTime.end_time).getHours().toString() +
            ':' +
            new Date(courseTime.end_time).getMinutes()
          }}
          –
          <RouterLink :to="'/courses/' + courseTime.course.id" class="g--schedule--course--link">{{
            courseTime.course.title
          }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { scheduleSchema } from '@/api/schedule-api'
import type { PropType } from 'vue'

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

defineProps({
  schedule: {
    type: Object as PropType<scheduleSchema>,
    required: true
  }
})
</script>

<style scoped lang="scss">
p {
  margin-bottom: 1em;
}

strong {
  font-weight: bold;
}

.g--schedule--day--info {
  margin-bottom: 1em;
}

.g--schedule--course--link {
  color: #a9a389;
  text-decoration: underline;
  text-decoration-color: rgba(201, 193, 159, 0.5);
}
</style>