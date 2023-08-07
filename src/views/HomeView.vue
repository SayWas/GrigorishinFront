<template>
  <div class="page--content">
    <LibraryPreview />
    <hr class="g--hr" />
    <GCourses />
  </div>
</template>

<script setup lang="ts">
import LibraryPreview from '@/components/library/LibraryPreview.vue'
import GCourses from '@/components/courses/GCourses.vue'
</script>

<style lang="scss" scoped>
.page--content {
  margin: 20px auto 0 auto;
  max-width: 1396px;
  .g--hr {
    margin: 50px auto 1rem auto;
    border: 0;
    height: 1px;
    max-width: 1167px;
    box-sizing: inherit;
    background-color: #e0e0e0;
  }
}
</style>