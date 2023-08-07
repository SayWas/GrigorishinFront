import { DefaultAPIInstance } from '@/api'
import type { userSchema } from '@/stores/userStore'

export const UsersAPI = {
  /**
   * @description Function that makes get current user request to the server than returns user's JSON
   * @description Use along with try...catch
   * @return The User's JSON object
   */
  async getCurrentUser(): Promise<userSchema> {
    const url: string = '/users/me'
    let user: userSchema | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.get(url)
      .then((r): void => {
        if (r.status === 200) user = r.data
      })
      .catch((error) => (errorMessage = error.message))

    if (user) return user
    throw new Error(errorMessage)
  },

  /**
   * @description Function that makes put current user request to the server than returns updated user's JSON
   * @description Use along with try...catch
   * @return The User's JSON object
   */
  async patchCurrentUser(userFields: {}): Promise<userSchema> {
    const url: string = '/users/me'
    let updatedUser: userSchema | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.patch(url, userFields)
      .then((r): void => {
        if (r.status === 200) updatedUser = r.data
      })
      .catch((error) => (errorMessage = error.message))

    if (updatedUser) return updatedUser
    throw new Error(errorMessage)
  }
}
