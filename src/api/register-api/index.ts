import { DefaultAPIInstance } from '@/api'

export const RegisterAPI = {
  /**
   * @description Function that makes post register request to the server than calls an onAfterRegister function
   * @param email New user's email
   * @param firstName New user's first name
   * @param lastName New user's last name
   * @param password New user's password
   * @returns Status code (201 - Successfully registered)
   */
  async register(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<number> {
    const url: string = '/auth/register'
    let statusCode: number = 400

    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    await DefaultAPIInstance.post(url, data)
      .then(async (r): Promise<void> => {
        if (r.status === 201) {
          statusCode = 201
          await this.onAfterRegister()
        }
      })
      .catch((error) => console.error(error))
    if (statusCode !== 400) return statusCode
    throw new Error('Error occurred while registering')
  },

  /**
   * @description Function that executes after registering a new account
   */
  async onAfterRegister(): Promise<void> {
    try {
      // TODO make implementation of function
    } catch (error) {
      // TODO make implementation of catch for function
    }
  }
}
