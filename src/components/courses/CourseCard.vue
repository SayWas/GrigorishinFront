<template>
  <RouterLink :to="'courses/' + id" class="g--course--card">
    <img :src="imageLink" alt="course" class="g--course--image" />
    <div class="g--course--card--info">
      <div>
        <div class="g--course--title g--text">
          {{ title }}
        </div>
        <div class="g--course--subtitle g--text">{{ subtitle }}</div>
      </div>
      <div class="g--course--tech--info">
        <span class="g--text">
          {{ country.name }}
        </span>
        <div v-if="isAvailable" class="g--available--mark--out">
          <div class="g--available--mark--in" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { courseSchema } from '@/api/courses-api'
import type { countrySchema } from '@/api/courses-api/countries-api'
import { computed, ref, toRefs } from 'vue'

const props = defineProps({
  course: {
    type: Object as () => courseSchema,
    required: true,
    default: () =>
      ({
        id: 0,
        title: '',
        subtitle: '',
        description: '',
        link: '',
        price: 0,
        starting_at: '',
        image_link: '',
        country: {} as countrySchema,
        comments: []
      } as courseSchema)
  }
})
const { id, title, subtitle, starting_at, image_link, country } = toRefs(props.course)

let imageLink = ref(new URL('../../assets/course_covers/' + image_link.value, import.meta.url).href)
const isAvailable = computed(() => {
  return Date.parse(starting_at.value) > Date.now()
})
</script>

<style lang="scss" scoped>
.g--course--card {
  margin: 10px;
  text-decoration: none;

  &:hover .g--course--image {
    filter: brightness(0.3);
  }

  .g--course--image {
    position: absolute;
    width: 360px;
    height: 220px;
    filter: brightness(0.4);
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
  }

  .g--course--card--info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 360px;
    height: 220px;
    padding-left: 30px;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;

    .g--text {
      font-weight: 500;
      line-height: 1.43;
      color: white;
    }

    .g--course--title {
      width: 90%;
      margin-top: 26px;
      font-size: 27px;
      line-height: 1;
    }

    .g--course--subtitle {
      font-size: 18px;
      margin-top: 10px;
    }

    .g--course--tech--info {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 23px;

      .g--available--mark--out {
        align-self: flex-end;
        width: 16px;
        height: 16px;
        border: 1px solid white;
        border-radius: 50%;
        background-color: transparent;
        margin-right: 23px;

        .g--available--mark--in {
          width: 8px;
          height: 8px;
          margin: 3px 0 0 3px;
          border-radius: 50px;
          background-color: #7ed321;
        }
      }
    }
  }
}
</style>