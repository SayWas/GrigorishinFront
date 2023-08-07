<template>
  <div class="g--reset--password--view">
    <h1 class="g--reset--pass--title g--text">ВОССТАНОВЛЕНИЯ ПАРОЛЯ</h1>
    <form v-if="!isHasToken" @submit.prevent class="g--reset--pass--form">
      <FormInput
        label="E-mail"
        v-model="email"
        autocomplete="username"
        name="email"
        type="text"
        :validation-error-message="forgotForm.errors.value.email"
      />
      <div class="g--reset--pass--form--field">
        <button @click="onForgotPassword" class="g--reset--pass--button" tabindex="0" type="submit">
          Восстановить
        </button>
      </div>
      <h3 v-if="emailSent">
        На вашу почту отправлено письмо с дальнейшими инструкциями по восстановлению пароля. Если
        письмо не пришло, напишите на почту gmail@gmail.com
      </h3>
    </form>
    <form v-if="isHasToken" @submit.prevent class="g--reset--pass--form">
      <FormInput
        label="Новый пароль"
        v-model="password1"
        autocomplete="new-password"
        name="password1"
        type="password"
        :validation-error-message="resetForm.errors.value.password1"
      />
      <FormInput
        label="Новый пароль ещё раз"
        v-model="password2"
        autocomplete="new-password"
        name="password2"
        type="password"
        :validation-error-message="resetForm.errors.value.password2"
      />
      <div class="g--reset--pass--form--field">
        <button @click="onResetPassword" class="g--reset--pass--button" tabindex="0" type="submit">
          Изменить пароль
        </button>
      </div>
      <h3 v-if="passwordChanged">Пароль успешно изменён. Можете закрыть эту страницу.</h3>
    </form>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue'
import { AuthAPI } from '@/api/auth-api'
import { useForm } from 'vee-validate'
import type { forgotPasswordFormSchema, resetPasswordFormSchema } from '@/utils/validation'
import { forgotPasswordSchema, resetPasswordSchema } from '@/utils/validation'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const isHasToken = computed(() => {
  return route.query.token !== undefined
})

const emailSent = ref(false)
const forgotForm = useForm<forgotPasswordFormSchema>({
  validationSchema: forgotPasswordSchema
})
const [email] = forgotForm.useFieldModel(['email'])

const onForgotPassword = forgotForm.handleSubmit(
  async (values) => {
    emailSent.value = true
    await AuthAPI.forgotPassword(values.email).catch((error) => {
      console.log(error)
    })
  },
  ({ values, results }) => {}
)

const passwordChanged = ref(false)
const resetForm = useForm<resetPasswordFormSchema>({
  validationSchema: resetPasswordSchema
})
const [password1, password2] = resetForm.useFieldModel(['password1', 'password2'])

const onResetPassword = resetForm.handleSubmit(
  async (values) => {
    console.log(route.query.token as string)
    await AuthAPI.resetPassword(route.query.token as string, values.password1)
      .then(() => {
        passwordChanged.value = true
      })
      .catch((error) => {
        console.log(error)
      })
  },
  ({ values, results }) => {}
)
</script>

<style scoped lang="scss">
.g--reset--password--view {
  margin: 0 auto;
  max-width: 570px;

  h3 {
    color: #3a3726;
    font-style: italic;
    text-align: center;
    font-size: 24px;
    margin: 10px 0 10px 0;
  }

  .g--text {
    font-weight: 500;
    text-decoration: none;
    color: black;
  }

  .g--reset--pass--title {
    font-style: italic;
    text-align: center;
    font-size: 48px;
    margin: 10px 0 10px 0;
  }

  .g--reset--pass--form--field {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    .g--reset--pass--button {
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
  }
}
</style>