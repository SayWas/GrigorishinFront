<template>
  <div class="g--login--view">
    <h1 class="g--log--title g--text">ВХОД НА САЙТ</h1>
    <form @submit.prevent class="g--log--form">
      <FormInput
        label="E-mail"
        v-model="email"
        autocomplete="username"
        name="email"
        type="text"
        :validation-error-message="errors.email"
      />
      <FormInput
        label="Пароль"
        v-model="password"
        autocomplete="current-password"
        name="password"
        type="password"
        :validation-error-message="errors.password"
      />
      <div class="g--log--form--field">
        <button @click="onLogin" class="g--log--button" tabindex="0" type="submit">Войти</button>
      </div>
      <div class="g--log--form--field">
        <RouterLink to="reset-password" class="g--reset--password g--text">
          Забыли пароль?
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue'

import { AuthAPI } from '@/api/auth-api'
import { useForm } from 'vee-validate'
import type { loginFormSchema } from '@/utils/validation'
import { loginSchema } from '@/utils/validation'

const { errors, useFieldModel, handleSubmit } = useForm<loginFormSchema>({
  validationSchema: loginSchema
})
const [email, password] = useFieldModel(['email', 'password'])

const onLogin = handleSubmit(
  async (values) => {
    await AuthAPI.login(values.email, values.password)
  },
  ({ values, results }) => {}
)
</script>

<style lang="scss" scoped>
.g--login--view {
  margin: 0 auto;
  max-width: 570px;

  .g--text {
    font-weight: 500;
    text-decoration: none;
    color: black;
  }

  .g--log--title {
    font-style: italic;
    text-align: center;
    font-size: 48px;
    margin: 10px 0 10px 0;
  }

  .g--log--form--field {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    .g--log--button {
      color: white;
      margin-top: 20px;
      border: none;
      padding: 10px 20px;
      font-size: 18px;
      cursor: pointer;
      border-radius: 30px;
      background-color: #3a3726;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      &:hover {
        background-color: #54513d;
      }
    }

    .g--reset--password {
      margin-top: 30px;
      font-size: 18px;
    }
  }
}
</style>