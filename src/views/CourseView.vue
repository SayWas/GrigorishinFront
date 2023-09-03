<template>
  <CourseMainInfo :title="course.title" :subtitle="course.subtitle" />
  <div class="g--course--info">
    <CourseInfo
      :starting_at="course.starting_at"
      :description="course.description"
      :country-name="course.country.name"
    />
    <PaymentInfo
      :price="course.price"
      :starting_at="course.starting_at"
      :at-cart="atCart"
      :is-outdated="isOutdated"
      :link="course.link"
      @add-to-cart="addToCart"
    />
  </div>
  <hr />
  <h2>Отзывы</h2>
  <form v-if="!notLoggedInOrNotBought" @submit.prevent class="g--comment--form">
    <FormInput label="Комментарий" v-model="commentText" name="comment" type="text" />
    <button @click="onComment" class="g--comment--button">
      <span>Оставить комментарий</span>
    </button>
  </form>
  <div class="g--course--comments">
    <EmptyListMessage
      message="Отзывов пока никто не оставил."
      v-if="course?.comments?.length === 0"
    />
    <GComment v-for="comment in course.comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script setup lang="ts">
import GComment from '@/components/courses/comments/GComment.vue'
import CourseMainInfo from '@/components/courses/CourseMainInfo.vue'
import CourseInfo from '@/components/courses/CourseInfo.vue'
import PaymentInfo from '@/components/courses/PaymentInfo.vue'
import type { courseSchema } from '@/api/courses-api'
import type { Ref, UnwrapRef } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCoursesStore } from '@/stores/coursesStore'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import FormInput from '@/components/forms/FormInput.vue'
import { useForm } from 'vee-validate'
import type { commentFormSchema } from '@/utils/validation'
import { commentSchema } from '@/utils/validation'
import { CommentsAPI } from '@/api/courses-api/comments-api'
import EmptyListMessage from '@/components/EmptyListMessage.vue'

const route = useRoute()
const coursesStore = useCoursesStore()
const cartStore = useCartStore()
const userStore = useUserStore()

const notLoggedInOrNotBought = computed(() => {
  return (
    userStore.currentUser === undefined ||
    userStore.currentUser?.courses?.every((crs) => crs.id !== course.value.id)
  )
})

let course: Ref<UnwrapRef<courseSchema>> = ref({
  id: 0,
  title: '',
  subtitle: '',
  description: '',
  price: 0,
  starting_at: '',
  image_link: '',
  country: {
    id: 0,
    name: ''
  },
  comments: []
})

const atCart = computed(() => {
  return cartStore.cart.includes(course.value)
})
const isOutdated = computed(() => {
  return new Date(course.value.starting_at) < new Date()
})

const addToCart = () => {
  cartStore.addToCart(course.value)
}

const { useFieldModel, handleSubmit } = useForm<commentFormSchema>({
  validationSchema: commentSchema
})
const commentText = useFieldModel('commentText')

const onComment = handleSubmit(
  async (values) => {
    await CommentsAPI.postComment(course.value.id, values.commentText)
      .then(async () => {
        commentText.value = ''
        await coursesStore.getCourse(course.value.id)
      })
      .catch((e) => {
        console.log(e)
      })
  },
  ({ values, results }) => {}
)

onMounted(async () => {
  const id = Number(route.params.id)
  await coursesStore.getCourse(id)
  course.value = coursesStore.coursesByIds[id]
})
</script>

<style scoped lang="scss">
.g--course--info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  font-weight: 500;
}

hr {
  margin: 50px auto 9px auto;
  max-width: 90%;
  border: 0;
  height: 1px;
  background-color: rgba(201, 193, 159, 0.5);
}

h2 {
  font-style: italic;
  margin: 20px 0 40px 0;
  text-align: center;
  font-size: 48px;
  line-height: 1;
}

.g--comment--form {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  margin: auto auto 30px;

  .g--comment--button {
    display: block;
    text-align: center;
    align-self: end;
    width: 27%;
    border: none;
    color: white;
    margin-top: 13px;
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
}

.g--course--comments {
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
}
</style>