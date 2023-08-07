<template>
  <div class="g--lib--filtering">
    <div class="g--lib--tools">
      <div class="g--lib--tech--button--zone">
        <button
          @click="toggleFilters"
          class="g--lib--button g--text"
          :class="{ 'g--lib--button--active': filtersAreShown }"
        >
          <span>Фильтр</span>
        </button>
      </div>
      <span class="g--text g--lib--total--count">Всего {{ lengthMessage }}</span>
      <div class="g--lib--tech--button--zone g--lib--reset--filter">
        <button @click="libraryStore.resetFilters" class="g--lib--button g--text">
          <span>Все материалы</span>
        </button>
      </div>
    </div>
    <div v-show="filtersAreShown" class="g--lib--filter--list">
      <h2 class="g--lib--filter--title">КУРСЫ</h2>
      <div class="g--lib--filter">
        <label v-for="course in courses" :key="course.id" class="g--lib--filter--option">
          <input
            class="g--lib--filter--option--checkbox"
            type="checkbox"
            :value="course.id"
            v-model="libraryStore.coursesIds"
          />
          <span class="g--filter--text">{{ course.title }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import type { courseSchema } from '@/api/courses-api'
import { useLibraryStore } from '@/stores/libraryStore'

const libraryStore = useLibraryStore()

const props = defineProps({
  length: {
    type: Number,
    required: true
  },
  courses: {
    type: Array as PropType<courseSchema[]>,
    required: true
  }
})

const lengthWordForms = ['материал', 'материала', 'материалов']
const lengthMessage = computed(() => {
  const length = props.length
  const lastDigit = Number(String(length).slice(-1))
  const lastTwoDigits = Number(String(length).slice(-2))
  const lastWord =
    lastDigit === 1 && lastTwoDigits !== 11
      ? lengthWordForms[0]
      : lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)
      ? lengthWordForms[1]
      : lengthWordForms[2]
  return `${length} ${lastWord}`
})

let filtersAreShown = ref(false)
const toggleFilters = () => {
  filtersAreShown.value = !filtersAreShown.value
}
</script>

<style scoped lang="scss">
.g--lib--filtering {
  max-width: 1167px;
  width: 100%;
  margin-top: 50px;

  .g--lib--tools {
    display: flex;

    .g--text {
      font-weight: 500;
      line-height: 1.75;
      text-transform: none;
      font-size: 1.1rem;
    }

    .g--lib--total--count {
      color: #a9a389;
      font-style: italic;
    }

    .g--lib--button {
      border: 1px solid rgba(201, 193, 159, 0.5);
      padding: 6px 22px;
      border-radius: 30px;
      min-width: 56px;
      background-color: white;
      box-sizing: border-box;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #edece7;
      }
    }

    .g--lib--button--active {
      background-color: #3a3726;
      color: white;

      &:hover {
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
          0 1px 10px 0 rgba(0, 0, 0, 0.12);
        background-color: #4b4939;
      }
    }

    span {
      flex-basis: 50%;
      text-align: center;
    }

    .g--lib--tech--button--zone {
      flex-basis: 25%;
    }

    .g--lib--reset--filter {
      text-align: right;
    }
  }

  .g--lib--filter--list {
    .g--lib--filter--title {
      font-weight: 500;
      line-height: 1.5;
      text-align: center;
      font-size: 21px;
      margin-top: 20px;
    }

    .g--lib--filter {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 20px;

      .g--lib--filter--option {
        margin: 10px 16px 10px -11px;
        cursor: pointer;

        .g--lib--filter--option--checkbox {
          cursor: pointer;
          margin: 9px;
        }

        .g--filter--text {
          font-size: 18px;
          line-height: 1.43;
          user-select: none;
        }
      }
    }
  }
}
</style>