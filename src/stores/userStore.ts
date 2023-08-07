import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { countrySchema } from '@/api/courses-api/countries-api'
import { UsersAPI } from '@/api/users-api'
import { AuthAPI } from '@/api/auth-api'
import type { changePasswordFormSchema } from '@/utils/validation'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<userSchema | undefined>()

  async function getCurrentUser(): Promise<userSchema | undefined> {
    await UsersAPI.getCurrentUser()
      .then((r) => {
        currentUser.value = r
      })
      .catch((error) => {
        console.error(error)
      })
    return currentUser.value
  }

  async function updateUser(userFields: {}): Promise<userSchema | undefined> {
    await UsersAPI.patchCurrentUser(userFields)
      .then((r) => {
        currentUser.value = r
      })
      .catch((error) => {
        console.error(error)
      })
    return currentUser.value
  }

  async function updatePassword(
    passwordFields: changePasswordFormSchema
  ): Promise<userSchema | undefined> {
    await AuthAPI.login(currentUser.value?.email ?? '', passwordFields['oldPassword'])
      .then(async () => {
        await UsersAPI.patchCurrentUser({ password: passwordFields['password1'] })
          .then((r) => {
            currentUser.value = r
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
    return currentUser.value
  }

  function removeUser(): void {
    currentUser.value = undefined
  }

  return { currentUser, getCurrentUser, updateUser, updatePassword, removeUser }
})

interface roleSchema {
  id: number
  name: string
  permissions: string[] | null
}

interface courseUserSchema {
  id: number
  title: string
  subtitle: string
  description: string
  image_link: string
  link: string
  price: number
  starting_at: string
  country: countrySchema
}

interface userSchema {
  id: number
  email: string
  firstName: string
  lastName: string
  role_id: number
  role: roleSchema
  courses: courseUserSchema[]
}

interface userCommentSchema {
  firstName: string
  lastName: string
}

export type { userSchema, userCommentSchema }
