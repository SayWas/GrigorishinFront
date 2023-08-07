<template>
  <div class="g--checkout">
    <div class="g--cart--total">
      <span>Итого</span>
      <span class="g--cart--total--price">{{ cartStore.totalPrice }}₽</span>
    </div>
    <p>После оплаты курсы появятся в вашем личном кабинете во вкладке "Курсы"</p>
    <button @click="checkOutClick" class="g--checkout--button">
      <span>Перейти к оплате</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const emit = defineEmits<{
  checkOut: []
}>()

const checkOutClick = () => {
  emit('checkOut')
}
</script>

<style scoped lang="scss">
.g--checkout {
  display: flex;
  flex-direction: column;
  max-width: 250px;
  width: 100%;

  .g--cart--total {
    display: flex;
    justify-content: space-between;

    span {
      font-size: 27px;
    }

    .g--cart--total--price {
      font-style: italic;
    }
  }

  p {
    font-size: 13px;
    line-height: 1;
  }

  .g--checkout--button {
    display: block;
    text-align: center;
    width: 100%;
    border: none;
    color: white;
    margin-top: 10px;
    padding: 6px 22px;
    font-size: 1.1rem;
    box-shadow: none;
    border-radius: 30px;
    text-transform: none;
    text-decoration: none;
    background-color: #3a3726;
    -webkit-box-shadow: none;
    cursor: pointer;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      background-color: #54513d;
    }

    span {
      font-weight: 520;
      line-height: 1.75;
    }
  }
}
</style>