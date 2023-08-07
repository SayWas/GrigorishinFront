<template>
  <h1 class="g--schedule--title">Расписание</h1>
  <div class="g--schedule--container">
    <div class="g--schedule--description">
      <h2>Занятия указаны на текущую неделю</h2>
      <p>Время указано CET / московское. Подробнее см. описание каждого курса по ссылке.</p>
    </div>
    <GSchedule :schedule="scheduleStore.schedule" />
  </div>
</template>

<script setup lang="ts">
import GSchedule from '@/components/GSchedule.vue'
import { onMounted } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore'

const scheduleStore = useScheduleStore()

onMounted(async () => {
  await scheduleStore.getSchedule()
})
</script>

<style scoped lang="scss">
.g--schedule--title {
  margin-bottom: 40px;
  font-style: italic;
  font-size: 48px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
}

.g--schedule--container {
  margin: 20px auto 0 auto;
  font-size: 21px;
  max-width: 1024px;
  line-height: 1.43;

  .g--schedule--description {
    h2 {
      font-size: 21px;
      margin-bottom: 1em;
      font-weight: bold;
      line-height: 1.2;
    }

    p {
      margin-bottom: 1em;
    }
  }
}
</style>