<template>
  <div class="g--register-view">
    <h1 class="g--reg-title g--text">РЕГИСТРАЦИЯ НОВОГО УЧАСТНИКА</h1>
    <form @submit.prevent class="g--reg-form">
      <FormInput
        label="E-mail"
        v-model="email"
        autocomplete="username"
        name="email"
        type="text"
        :validation-error-message="errors.email"
      />
      <FormInput
        label="Имя"
        v-model="firstName"
        autocomplete="name"
        name="firstName"
        type="text"
        :validation-error-message="errors.firstName"
      />
      <FormInput
        label="Фамилия"
        v-model="lastName"
        autocomplete="family-name"
        name="lastName"
        type="text"
        :validation-error-message="errors.lastName"
      />
      <FormInput
        label="Пароль"
        v-model="password1"
        autocomplete="new-password"
        name="password1"
        type="password"
        :validation-error-message="errors.password1"
      />
      <FormInput
        label="Пароль ещё раз"
        v-model="password2"
        autocomplete="new-password"
        name="password2"
        type="password"
        :validation-error-message="errors.password2"
      />
      <div class="g--reg-form-field">
        <div class="g--reg-policy">
          <input type="checkbox" class="g--reg-checkbox" v-model="policyConfirmation" />
          <span>Принимаю условия </span>
          <RouterLink to="policy" class="g--text">политики конфиденциальности</RouterLink>
        </div>
        <p v-if="errors.policyConfirmation">{{ errors.policyConfirmation }}</p>
      </div>
      <div class="g--reg-form-field">
        <button @click="onRegister" class="g--reg-button" tabindex="0" type="submit">
          Зарегистрироваться
        </button>
      </div>
      <h3 v-if="successRegisterMessageShown">Регистрация прошла успешно</h3>
    </form>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue'

import { RegisterAPI } from '@/api/register-api'
import { useForm } from 'vee-validate'
import type { registerFormSchema } from '@/utils/validation'
import { registerSchema } from '@/utils/validation'
import { ref } from 'vue'

let successRegisterMessageShown = ref(false)

const { errors, useFieldModel, handleSubmit } = useForm<registerFormSchema>({
  validationSchema: registerSchema
})
const [email, firstName, lastName, password1, password2, policyConfirmation] = useFieldModel([
  'email',
  'firstName',
  'lastName',
  'password1',
  'password2',
  'policyConfirmation'
])

const onRegister = handleSubmit(
  async (values) => {
    await RegisterAPI.register(values.email, values.firstName, values.lastName, values.password1)
      .then(() => {
        successRegisterMessageShown.value = true
      })
      .catch((e) => {
        console.log(e)
      })
  },
  ({ values, results }) => {}
)
</script>

<style lang="scss" scoped>
.g--register-view {
  margin: 0 auto;
  max-width: 570px;

  .g--text {
    font-weight: 500;
    text-decoration: none;
    color: black;
  }

  .g--reg-title {
    font-style: italic;
    text-align: center;
    font-size: 48px;
    margin: 10px 0 10px 0;
  }

  h3 {
    font-style: italic;
    color: #3a3726;
    text-align: center;
    font-size: 24px;
    margin: 10px 0 10px 0;
  }

  .g--reg-form-field {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    p {
      font-size: 0.75rem;
      margin: 8px 0 0;
      min-height: 1em;
      line-height: 1em;
      color: #f44336;
    }

    .g--reg-button {
      color: white;
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

    .g--reg-policy {
      display: flex;

      span {
        white-space: pre;
        margin-left: 5px;
      }
    }
  }
}
</style>