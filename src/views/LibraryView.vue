<template>
  <div class="g--library">
    <h1 class="g--title">Библиотека</h1>
    <LibraryFilter :length="libraryStore.totalBooks" :courses="coursesStore.courses" />
    <hr class="g--lib--hr" />
    <div class="g--lib--list">
      <div class="g--book--list">
        <LibraryItem
          v-for="book in libraryStore.libraryBooks[libraryStore.page]"
          :key="book.id"
          :book="book"
        />
      </div>
      <div class="g--lib--pagination">
        <button
          @click="changePage(pg + 1)"
          v-for="pg in Array(libraryStore.totalPages).keys()"
          :key="pg + 1"
          class="g--lib--page--button"
          :class="{ 'g--lib--page--button--active': libraryStore.page === pg + 1 }"
        >
          {{ pg + 1 }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LibraryFilter from '@/components/library/LibraryFilter.vue'
import LibraryItem from '@/components/library/LibraryItem.vue'
import { useLibraryStore } from '@/stores/libraryStore'
import { useCoursesStore } from '@/stores/coursesStore'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const libraryStore = useLibraryStore()
const coursesStore = useCoursesStore()

let isGettingFromUrl = false
watch(
  () => libraryStore.coursesIds,
  async (newCoursesIds, oldCoursesIds) => {
    await libraryStore.resetLibrary()
    console.log('reseted')
    if (isGettingFromUrl) {
      isGettingFromUrl = false
      return
    }
    libraryStore.page = 1
    await changeValues()
  }
)

const changePage = async (newPage: number) => {
  libraryStore.page = newPage
  await changeValues()
}

const changeValues = async () => {
  if (libraryStore.coursesIds.length === 0) {
    await router.push({
      query: {
        page: libraryStore.page
      }
    })
    return
  }
  await router.push({
    query: {
      page: libraryStore.page,
      courses: libraryStore.coursesIds.join(',')
    }
  })
}

const getFromUrl = () => {
  if (route.query.page && route.query.page !== libraryStore.page.toString()) {
    libraryStore.page = Number(route.query.page)
  }
  if (route.query.courses && route.query.courses !== libraryStore.coursesIds.join(',')) {
    isGettingFromUrl = true
    libraryStore.coursesIds = route.query.courses
      .toString()
      .split(',')
      .map((id: string) => Number(id))
  }
  if (!route.query.courses && libraryStore.coursesIds.length !== 0) {
    isGettingFromUrl = true
    libraryStore.coursesIds = []
  }
}

const route = useRoute()
watch(route, async (newRoute, oldRoute) => {
  await getFromUrl()
  await libraryStore.getLibraryBooks()
})

onMounted(async () => {
  getFromUrl()
  await libraryStore.getLibraryBooks()
  await coursesStore.getCourses()
})
</script>

<style scoped lang="scss">
.g--library {
  display: flex;
  flex-direction: column;
  align-items: center;

  .g--title {
    font-size: 48px;
    font-style: italic;
    font-weight: 500;
    line-height: 1;
  }

  .g--lib--hr {
    width: 100%;
    height: 1px;
    border: none;
    background-color: #e0e0e0;
    margin-top: 40px;
  }

  .g--lib--list {
    margin: auto;
    max-width: 1167px;
    width: 100%;

    .g--book--list {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .g--lib--pagination {
      display: flex;
      width: 100%;
      margin-top: 9px;

      .g--lib--page--button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: 1px solid #3a3726;
        background-color: white;
        color: #a9a389;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        font-size: 1.1rem;
        font-weight: 600;
        margin-right: 20px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }

      .g--lib--page--button--active {
        color: white;
        background-color: #3a3726;

        &:hover {
          background-color: #4b4939;
        }
      }
    }
  }
}
</style>