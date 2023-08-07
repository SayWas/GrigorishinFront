<template>
  <div class="g--person--info">
    <div class="g--person--info--row">
      <div class="g--person--input">
        <FormInput
          label="Имя"
          v-model="firstName"
          autocomplete="name"
          name="firstName"
          type="text"
          :disabled="!isEditing"
          :validation-error-message="personalForm.errors.value.firstName"
        />
      </div>
      <div class="g--person--input">
        <FormInput
          label="Фамилия"
          v-model="lastName"
          autocomplete="family-name"
          name="lastName"
          type="text"
          :disabled="!isEditing"
          :validation-error-message="personalForm.errors.value.lastName"
        />
      </div>
    </div>
    <div class="g--person--info--row">
      <div class="g--person--input">
        <FormInput
          label="E-mail"
          v-model="email"
          autocomplete="username"
          name="email"
          type="text"
          :disabled="!isEditing"
          :validation-error-message="personalForm.errors.value.email"
        />
      </div>
    </div>
    <div v-if="!isEditing" class="g--person--info--row g--person--buttons--row g--person--actions">
      <div class="g--account--button--container">
        <button @click="toggleEdit" class="g--account--button">
          <span>Редактировать</span>
        </button>
      </div>
      <div class="g--account--button--container">
        <button @click="onLogOut" class="g--account--button g--account--button--logout">
          <span>Выйти</span>
        </button>
      </div>
    </div>
    <div
      v-if="isEditing"
      class="g--person--info--row g--person--buttons--row g--person--editor--actions"
    >
      <div class="g--account--button--container">
        <button @click="onPersonalDataChange" class="g--account--button">
          <span>Сохранить</span>
        </button>
      </div>
      <button @click="toggleEdit" class="g--account--button--cancel">
        <span>Отменить</span>
      </button>
    </div>
    <div v-if="isEditing" class="g--person--info--row">
      <div class="g--person--input g--person--input--password">
        <FormInput
          label="Текущий пароль"
          v-model="oldPassword"
          name="oldPassword"
          type="password"
          :disabled="!isEditing"
          :validation-error-message="passwordForm.errors.value.oldPassword"
        />
      </div>
      <div class="g--person--input g--person--input--password">
        <FormInput
          label="Новый пароль"
          v-model="password1"
          autocomplete="new-password"
          name="password1"
          type="password"
          :disabled="!isEditing"
          :validation-error-message="passwordForm.errors.value.password1"
        />
      </div>
      <div class="g--person--input g--person--input--password">
        <FormInput
          label="Новый пароль ещё раз"
          v-model="password2"
          autocomplete="new-password"
          name="password2"
          type="password"
          :disabled="!isEditing"
          :validation-error-message="passwordForm.errors.value.password2"
        />
      </div>
    </div>
    <div
      v-if="isEditing"
      class="g--person--info--row g--person--buttons--row g--person--editor--actions"
    >
      <div class="g--account--button--container">
        <button @click="onPasswordChange" class="g--account--button">
          <span>Сохранить</span>
        </button>
      </div>
      <button @click="toggleEdit" class="g--account--button--cancel">
        <span>Отменить</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useForm } from 'vee-validate'
import type { changePasswordFormSchema, changePersonalDataFormSchema } from '@/utils/validation'
import { changePasswordSchema, changePersonalDataSchema } from '@/utils/validation'
import { AuthAPI } from '@/api/auth-api'

const isEditing = ref(false)
const toggleEdit = () => {
  isEditing.value = !isEditing.value
  if (!isEditing.value) {
    resetForm()
  }
}

const resetForm = () => {
  email.value = userStore.currentUser?.email ?? ''
  firstName.value = userStore.currentUser?.firstName ?? ''
  lastName.value = userStore.currentUser?.lastName ?? ''
}

const userStore = useUserStore()

const personalForm = useForm<changePersonalDataFormSchema>({
  validationSchema: changePersonalDataSchema
})
const [email, firstName, lastName] = personalForm.useFieldModel(['email', 'firstName', 'lastName'])
const onPersonalDataChange = personalForm.handleSubmit(
  async (values) => {
    await userStore.updateUser(values)
    toggleEdit()
  },
  ({ values, results }) => {}
)

const passwordForm = useForm<changePasswordFormSchema>({
  validationSchema: changePasswordSchema
})
const [oldPassword, password1, password2] = passwordForm.useFieldModel([
  'oldPassword',
  'password1',
  'password2'
])
const onPasswordChange = passwordForm.handleSubmit(
  async (values) => {
    await userStore.updatePassword(values)
    toggleEdit()
  },
  ({ values, results }) => {}
)

const onLogOut = async () => {
  await AuthAPI.logout()
}

onMounted(() => {
  resetForm()
})
</script>

<style scoped lang="scss">
.g--person--info {
  max-width: 840px;
  width: 100%;

  .g--person--info--row {
    display: flex;
    margin-top: 24px;

    .g--person--input {
      display: flex;
      padding-left: 25px;
      padding-right: 25px;
      max-width: 50%;
      flex-basis: 50%;
    }

    .g--person--input--password {
      max-width: 33.333333%;
      flex-basis: 33.333333%;
    }
  }

  .g--person--buttons--row {
    margin-top: 40px;
  }

  .g--person--actions {
    justify-content: space-between;
  }

  .g--account--button--container {
    margin-left: 25px;
    margin-right: 25px;
    width: 200px;
  }

  .g--account--button {
    display: block;
    text-align: center;
    width: 100%;
    border: none;
    color: white;
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

  .g--account--button--logout {
    color: white;
    background-color: #a8a38c;

    &:hover {
      background-color: #79745f;
    }
  }

  .g--account--button--cancel {
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
}
</style>