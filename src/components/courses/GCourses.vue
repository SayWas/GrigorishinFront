<template>
  <div class="g--courses">
    <GNavigation />
    <h1 class="g--title">{{ title }}</h1>
    <div class="g--schedule--container">
      <RouterLink to="/schedule" class="g--schedule">Расписание текущих занятий</RouterLink>
    </div>
    <div class="g--course--list">
      <CourseCard v-for="course in coursesStore.courses" :key="course.id" :course="course" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GNavigation from '@/components/GNavigation.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCoursesStore } from '@/stores/coursesStore'

const coursesStore = useCoursesStore()
let title: Ref<string> = ref('Все курсы')

const update = () => {
  if (route.query.country) {
    coursesStore.getCoursesByCountry(route.query.country as string)
    title.value = `Курсы раздела ${route.query.country}`
  } else {
    coursesStore.getCoursesByCountry()
    title.value = 'Все курсы'
  }
}

const route = useRoute()
watch(route, async (newValue, oldValue) => {
  update()
})

onMounted(async () => {
  await coursesStore.getCourses()
  update()
})
</script>

<style lang="scss" scoped>
.g--courses {
  .g--text {
    font-weight: 500;
    line-height: 1.43;
  }

  .g--title {
    text-align: center;
    font-size: 48px;
    margin-bottom: 15px;
  }

  .g--schedule--container {
    display: flex;
    justify-content: center;

    .g--schedule {
      color: #a9a389;
      font-size: 20px;
      text-decoration: underline;
      text-decoration-color: rgba(201, 193, 159, 0.5);
      margin-bottom: 15px;
    }
  }

  .g--course--list {
    display: flex;
    flex-wrap: wrap;
    max-width: 1140px;
    margin: auto;
  }
}
</style>