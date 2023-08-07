<template>
  <div class="g--empty--list--message">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.g--empty--list--message {
  color: #a9a389;
  font-size: 20px;
  font-style: italic;
  margin-top: 20px;
}
</style>