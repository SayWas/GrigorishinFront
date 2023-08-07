import { DefaultAPIInstance, LoginAPIInstance } from '@/api'

import { useUserStore } from '@/stores/userStore'

export const AuthAPI = {
  /**
   * @description Function that makes post login request to the server than calls an onAfterLogin function
   * @param email User's email
   * @param password User's password
   * @returns Status code (204 - Success)
   */
  async login(email: string, password: string): Promise<number> {
    const url: string = '/auth/login'
    let statusCode: number = 400

    const formData: FormData = new FormData()
    formData.set('username', email)
    formData.set('password', password)

    await LoginAPIInstance.post(url, formData)
      .then(async (r): Promise<void> => {
        if (r.status === 204) {
          statusCode = 204
          await this.onAfterLogin()
        }
      })
      .catch((error) => console.error(error))
    if (statusCode !== 400) return statusCode
    throw new Error('Error occurred while logging in')
  },

  /**
   * @description Function that makes post logout request to the server than calls an onAfterLogout function
   * @returns Status code (204 - Success)
   */
  async logout(): Promise<number> {
    const url: string = '/auth/logout'
    let statusCode: number = 400

    await DefaultAPIInstance.post(url)
      .then(async (r): Promise<void> => {
        if (r.status === 204) {
          statusCode = 204
          this.onAfterLogout()
        }
      })
      .catch((error) => console.error(error))
    if (statusCode !== 400) return statusCode
    throw new Error('Error occurred while logging out')
  },

  /**
   * @description Function that makes post forgot password request to the server
   * @param email
   * @returns Status code (202 - Success)
   */
  async forgotPassword(email: string): Promise<number> {
    const url: string = '/auth/forgot-password'
    let statusCode: number = 400

    const data = {
      email: email
    }

    await DefaultAPIInstance.post(url, data)
      .then(async (r): Promise<void> => {
        if (r.status === 202) {
          statusCode = 202
        }
      })
      .catch((error) => console.error(error))
    if (statusCode !== 400) return statusCode
    throw new Error('Error occurred while resetting password')
  },

  /**
   * @description Function that makes post reset password request to the server
   * @param token
   * @param password
   */
  async resetPassword(token: string, password: string): Promise<number> {
    const url: string = '/auth/reset-password'
    let statusCode: number = 400

    const data = {
      token: token,
      password: password
    }
    console.log(data)

    await DefaultAPIInstance.post(url, data)
      .then(async (r): Promise<void> => {
        if (r.status === 200) {
          statusCode = 200
        }
      })
      .catch((error) => console.error(error))
    if (statusCode !== 400) return statusCode
    throw new Error('Error occurred while resetting password')
  },

  /**
   * @description Function that executes after logging into account
   */
  async onAfterLogin(): Promise<void> {
    try {
      const userStore = useUserStore()
      await userStore.getCurrentUser()
    } catch (error) {
      console.error(error)
    }
  },

  /**
   * @description Function that executes after logging out of the account
   */
  onAfterLogout(): void {
    try {
      const userStore = useUserStore()
      userStore.removeUser()
    } catch (error) {
      console.error(error)
    }
  }
}
