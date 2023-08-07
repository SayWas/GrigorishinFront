<template>
  <hr />
  <div class="g--cart">
    <h1>Ваша корзина</h1>
    <div class="g--cart--items">
      <EmptyListMessage message="Ваша корзина пуста." v-if="cartStore.cart.length === 0" />
      <CartItem v-for="course in cartStore.cart" :key="course.id" :course="course"></CartItem>
    </div>
    <div v-if="cartStore.cart.length !== 0" class="g--cart--checkout">
      <CheckoutInfo @check-out="cartStore.checkOut" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue'
import CheckoutInfo from '@/components/cart/CheckoutInfo.vue'
import EmptyListMessage from '@/components/EmptyListMessage.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped lang="scss">
hr {
  margin: 30px auto 9px auto;
  max-width: 90%;
  border: 0;
  height: 1px;
  background-color: rgba(201, 193, 159, 0.5);
}

.g--cart {
  margin: 22px auto 0 auto;
  max-width: 900px;
  line-height: 1.5;

  h1 {
    font-style: italic;
    margin: 20px 0 40px 0;
    text-align: center;
    font-size: 48px;
    line-height: 1;
  }

  .g--cart--items {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1167px;
    width: 100%;
  }

  .g--cart--checkout {
    margin-top: 40px;
    display: flex;
    justify-content: end;
  }
}
</style>