<template>
  <header class="g--header">
    <RouterLink to="/" class="g--text g--title">GRIGORISHIN</RouterLink>
    <div v-if="userStore.currentUser === undefined" class="g--authorize">
      <RouterLink to="/register" class="g--button g--register g--text"> Регистрация</RouterLink>
      <RouterLink to="/login" class="g--button g--underline--button g--text"> Войти</RouterLink>
    </div>
    <div v-if="userStore.currentUser !== undefined" class="g--header--actions">
      <RouterLink to="/cart" class="g--header--cart">
        <CartIcon class="g--header--cart--icon" />
        <div v-if="cartStore.cart.length !== 0" class="g--header--cart--count">
          <span> {{ cartStore.cart.length }} </span>
        </div>
      </RouterLink>
      <RouterLink to="/account/profile" class="g--button g--underline--button g--text"
        >{{ userStore.currentUser?.firstName + ' ' + userStore.currentUser?.lastName }}
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import CartIcon from '@/components/icons/CartIcon.vue'
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore'

const userStore = useUserStore()
const cartStore = useCartStore()
</script>

<style lang="scss" scoped>
.g--header {
  display: flex;
  justify-content: space-between;
  padding: 50px;

  .g--text {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.43;
    text-decoration: none;
    color: black;
  }

  .g--title {
    font-size: 30px;
  }

  .g--authorize {
    display: flex;
    align-items: center;

    .g--button {
      padding: 10px 20px;
      cursor: pointer;
    }

    .g--register {
      color: white;
      font-weight: 600;
      border-radius: 30px;
      background-color: #a8a38c;

      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      &:hover {
        background-color: #79745f;
      }
    }
  }

  .g--underline--button {
    text-decoration: none;
    font-size: 18px;
    border: none;
    background: none;
    line-height: 0.85;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      text-decoration-color: rgba(201, 193, 159, 0.5);
    }
  }

  .g--header--actions {
    display: flex;
    align-items: center;

    .g--header--cart {
      padding: 8px 0;
      margin-right: 20px;

      .g--header--cart--icon {
        margin-right: 3px;
      }

      .g--header--cart--count {
        display: block;
        position: absolute;
        top: -1px;
        right: -2px;
        background-color: #a8a38c;
        color: white;
        border-radius: 9px;
        min-width: 16px;
        height: 16px;

        span {
          display: block;
          padding: 2px 5px;
          font-size: 11px;
          line-height: 1;
          font-weight: bold;
        }
      }
    }
  }
}
</style>