import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { courseSchema } from '@/api/courses-api'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<courseSchema[]>([])
  const totalPrice = computed(() => {
    return cart.value.reduce((acc, course) => acc + course.price, 0)
  })

  function addToCart(course: courseSchema) {
    cart.value.push(course)
  }

  function deleteFromCart(course_id: number) {
    const index = cart.value.findIndex((course) => course.id === course_id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  function checkOut() {
    cart.value = []
  }

  return { cart, totalPrice, addToCart, deleteFromCart, checkOut }
})
