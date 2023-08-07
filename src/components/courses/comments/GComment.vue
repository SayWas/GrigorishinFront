<template>
  <div class="g--comment">
    <p>
      {{ comment.text }}
    </p>
    <span>
      <b>{{ comment.user.firstName + ' ' + comment.user.lastName }}</b>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { commentSchema } from '@/api/courses-api/comments-api'
import type { PropType } from 'vue'

defineProps({
  comment: {
    type: Object as PropType<commentSchema>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.g--comment {
  margin: 22px auto 0 auto;
  max-width: 900px;
  line-height: 1.43;
  font-size: 21px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(201, 193, 159, 0.5);

  span {
    display: block;
    margin-top: 30px;
    font-size: 18px;
    font-style: italic;
  }
}
</style>