<template>
  <div class="g--profile--courses">
    <EmptyListMessage
      message="Вы пока не записались ни на один курс."
      v-if="userStore.currentUser?.courses?.length === 0"
    />
    <CourseProfile
      v-for="course in userStore.currentUser?.courses"
      :key="course.id"
      :course="course"
    />
  </div>
</template>

<script setup lang="ts">
import CourseProfile from '@/components/courses/CourseProfile.vue'
import EmptyListMessage from '@/components/EmptyListMessage.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.g--profile--courses {
  display: flex;
  flex-direction: column;
  max-width: 856px;
  width: 100%;
  margin-top: 24px;
}
</style>