<template>
  <div class="g--library--preview">
    <div class="g--lib--quote g--text">«{{ quote }}»</div>
    <div class="g--lib--source">
      <div class="g--quote--source">
        <div class="g--quote--author g--text">
          {{ quote_author }}
        </div>
        <RouterLink
          :to="'courses/' + (book.courses[0] !== undefined ? randomCourse.id : 0)"
          class="g--source--name g--text"
        >
          Из материалов к курсу
          {{ book.courses[0] !== undefined ? randomCourse.title : '' }}
        </RouterLink>
      </div>
      <div class="g--lib--link--container">
        <RouterLink to="/library" class="g--lib--link g--text"> Библиотека</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { libraryPreviewSchema } from '@/api/library-api'
import { LibraryAPI } from '@/api/library-api'
import type { courseSchema } from '@/api/courses-api'
import type { ComputedRef } from 'vue'
import { computed, onMounted, reactive, toRefs } from 'vue'

let libraryPreview: libraryPreviewSchema = reactive({
  id: 0,
  quote: '',
  quote_author: '',
  book: {
    id: 0,
    title: '',
    author: '',
    download_link: undefined,
    courses: []
  }
})
const { quote, quote_author, book } = toRefs(libraryPreview)
const randomCourse: ComputedRef<courseSchema> = computed(() => {
  return book.value.courses[Math.floor(Math.random() * book.value.courses.length)]
})

onMounted(async () => {
  await LibraryAPI.getLibraryPreview()
    .then((r) => {
      Object.assign(libraryPreview, r)
    })
    .catch((e) => {
      console.log(e.message)
    })
})
</script>

<style lang="scss" scoped>
.g--library--preview {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 900px;

  .g--text {
    font-weight: 500;
    line-height: 1.43;
    text-decoration: none;
  }

  .g--lib--quote {
    display: flex;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 30px;
  }

  .g--lib--source {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .g--quote--source {
      display: flex;
      flex-direction: column;

      .g--quote--author {
        font-size: 21px;
      }

      .g--source--name {
        font-size: 18px;
        color: #a9a389;
        text-decoration: underline;
        text-decoration-color: rgba(201, 193, 159, 0.5);
        cursor: pointer;
      }
    }

    .g--lib--link--container {
      display: flex;
      align-items: end;

      .g--lib--link {
        font-size: 21px;
        text-decoration: underline;
        text-decoration-color: rgba(201, 193, 159, 0.5);
        color: #a9a389;
        cursor: pointer;
      }
    }
  }
}
</style>