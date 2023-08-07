<template>
  <div class="g--lib--item">
    <div class="g--book">
      <h2 class="g--book--naming g--text">{{ book.author }}. {{ book.title }}</h2>
      <button v-if="book.download_link" class="g--book--download--button">
        <a :href="book.download_link" target="_blank" class="g--text">Скачать</a>
      </button>
    </div>
    <div class="g--book--info">
      <label v-for="course in book.courses" :key="course.id" class="g--book--tag">
        {{ course.title }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { bookSchema } from '@/api/library-api'
import type { PropType } from 'vue'

defineProps({
  book: {
    type: Object as PropType<bookSchema>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.g--lib--item {
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  margin-top: 19px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.23);

  .g--book {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .g--text {
      color: #000;
      font-weight: 500;
      text-decoration: none;
    }

    .g--book--download--button {
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

    .g--book--naming {
      font-size: 22px;
      line-height: 1.75;
    }
  }

  .g--book--info {
    display: flex;

    .g--book--tag {
      color: #a9a389;
      padding: 0 10px;
      margin: 10px 15px 0 0;
      font-size: 12px;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 10px;
      line-height: 1.75;
      font-weight: 600;
      user-select: none;
    }
  }
}
</style>