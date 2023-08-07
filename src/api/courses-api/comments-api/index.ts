import { DefaultAPIInstance } from '@/api'
import type { userCommentSchema } from '@/stores/userStore'

export const CommentsAPI = {
  /**
   * @description Function that makes post comment request to the server
   * @returns Comment
   * @throws {Error} Request error message
   */
  async postComment(courseId: number, commentText: string): Promise<void> {
    const url: string = '/comments/'
    let comment: commentSchema | undefined
    let errorMessage: string = ''

    await DefaultAPIInstance.post(url, {
      course_id: courseId,
      text: commentText
    })
      .then(async (r): Promise<void> => {
        if (r.status === 201) {
          comment = r.data
        }
      })
      .catch((error) => (errorMessage = error.message))

    if (!comment) throw new Error(errorMessage)
  }
}

interface commentSchema {
  id: number
  text: string
  user: userCommentSchema
}

export type { commentSchema }
