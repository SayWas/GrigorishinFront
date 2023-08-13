<template>
  <div class="g--profile--course--item">
    <div class="g--profile--course--item--info">
      <h2 class="g--profile--course--item--title">{{ course.title }}</h2>
      <div>
        <label class="g--profile--course--item--tag"> {{ course.country.name }} </label>
      </div>
    </div>
    <div class="g--profile--course--item--tech--info">
      <div class="g--schedule--day--info">
        <p>
          {{
            new Date(course.starting_at).getDate().toString() +
            '.' +
            new Date(course.starting_at).getMonth().toString() +
            '.' +
            new Date(course.starting_at).getFullYear().toString() +
            ' - ' +
            new Date(course.starting_at).getHours().toString() +
            ':' +
            new Date(course.starting_at).getMinutes()
          }}
        </p>
      </div>
      <a :href="course.link" target="_blank" class="g--profile--course--item--link">Ссылка</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { courseProfileSchema } from '@/api/courses-api'
import type { PropType } from 'vue'

defineProps({
  course: {
    type: Object as PropType<courseProfileSchema>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.g--profile--course--item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.23);

  .g--profile--course--item--info {
    display: flex;
    flex-direction: column;

    .g--profile--course--item--title {
      font-size: 22px;
      line-height: 1.75;
    }

    .g--profile--course--item--tag {
      color: #a9a389;
      padding: 3px 10px;
      font-size: 12px;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 10px;
      font-weight: 600;
      user-select: none;
    }
  }

  .g--profile--course--item--tech--info {
    display: flex;
    align-items: center;

    p {
      font-size: 18px;
      margin-right: 20px;
    }

    .g--profile--course--item--link {
      font-size: 18px;
      border: none;
      border-bottom: 1px solid rgba(201, 193, 159, 0.5);
      background: none;
      line-height: 0.85;
      cursor: pointer;

      &:hover {
        border-bottom: 1px solid transparent;
      }
    }
  }
}
</style>