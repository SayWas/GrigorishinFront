<template>
  <div class="g--cart--item">
    <div class="g--cart--item--info">
      <h2 class="g--cart--item--title">{{ course.title }}</h2>
      <div>
        <label class="g--cart--item--tag"> {{ course.country.name }} </label>
      </div>
    </div>
    <div class="g--cart--item--tech--info">
      <div class="g--cart--item--price">
        <span>{{ course.price }}₽</span>
      </div>
      <button @click="cartStore.deleteFromCart(course.id)" class="g--cart--item--remove">
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { courseSchema } from '@/api/courses-api'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

defineProps({
  course: {
    type: Object as PropType<courseSchema>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.g--cart--item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.23);

  .g--cart--item--info {
    display: flex;
    flex-direction: column;

    .g--cart--item--title {
      font-size: 22px;
      line-height: 1.75;
    }

    .g--cart--item--tag {
      color: #a9a389;
      padding: 3px 10px;
      font-size: 12px;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 10px;
      font-weight: 600;
      user-select: none;
    }
  }

  .g--cart--item--tech--info {
    display: flex;
    align-items: center;

    .g--cart--item--price {
      display: flex;
      align-items: center;
      margin-right: 50px;
      font-size: 24px;
      font-style: italic;
    }

    .g--cart--item--remove {
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