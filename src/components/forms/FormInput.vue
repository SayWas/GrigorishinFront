<template>
  <div class="g--form-field">
    <label
      class="g--form-label"
      :class="{ 'input-active': modelValue !== '' || isFocused }"
      data-shrink="false"
    >
      {{ label }}
    </label>
    <div class="g--input-field" :class="{ 'input-failed': validationErrorMessage }">
      <input
        :value="modelValue"
        @input="updateInput"
        aria-invalid="false"
        class="g--form-input"
        v-bind="$attrs"
        @focusin="isFocused = true"
        @focusout="isFocused = false"
      />
    </div>
    <p v-if="validationErrorMessage">{{ validationErrorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false
})

let isFocused = ref<boolean>(false)

defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  modelValue: {
    type: String as () => string | boolean,
    default: ''
  },
  validationErrorMessage: String
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const updateInput = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped lang="scss">
.g--form-field {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 100%;

  .g--form-label {
    color: #a9a389;
    position: absolute;
    transform: translate(0, 27px) scale(1);
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transform-origin: top left;
  }

  .input-active {
    transform: translate(0, 1.5px) scale(0.75);
  }

  .g--input-field {
    margin-top: 25px;

    &:before {
      content: '\00a0';
      position: absolute;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid rgba(201, 193, 159, 0.5);
      pointer-events: none;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .g--form-input {
      width: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 18px;
      padding-bottom: 5px;
    }

    &:hover:before,
    &:focus:before,
    &:focus-within:before {
      border-bottom-width: 2px;
    }
  }

  .input-failed {
    &:before {
      border-bottom-color: #f44336;
    }
  }

  p {
    font-size: 0.75rem;
    margin: 8px 0 0;
    min-height: 1em;
    text-align: right;
    font-weight: 500;
    line-height: 1em;
    color: #f44336;
  }
}
</style>