<template>
  <div>
    <aside class="g--course--payment">
      <h3 class="g--course--available--status">
        {{ availabilityMessage }}
      </h3>
      <a :href="link" target="_blank" v-if="isOutdated" class="g--course--pay--button">
        <span>Посмотреть запись</span>
      </a>
      <a :href="link" target="_blank" v-else class="g--course--pay--button g--course--in--cart">
        <span>Присоединиться к семинару</span>
      </a>
      <span class="g--course--email--info"
        >Если у Вас есть вопросы или хотите оставить отзыв, пишите по адресу: gmail@gmail.com</span
      >
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const props = defineProps({
  price: {
    type: Number,
    required: true
  },
  starting_at: {
    type: String,
    required: true
  },
  atCart: {
    type: Boolean,
    required: true
  },
  isOutdated: {
    type: Boolean,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
const availabilityMessage = computed(() => {
  return Date.parse(props.starting_at) > Date.now()
    ? 'Семинар ещё не начался'
    : 'Семинар уже прошел'
})

const userStore = useUserStore()

const emit = defineEmits<{
  addToCart: []
}>()
const addToCart = () => {
  emit('addToCart')
}
</script>

<style scoped lang="scss">
.g--course--payment {
  top: 50px;
  position: sticky;
  max-width: 366px;
  display: block;
  flex-direction: column;
  margin-left: 200px;

  .g--course--available--status {
    font-size: 27px;
    line-height: 1.33;
    margin-bottom: 20px;
  }

  .g--course--price {
    font-size: 54px;
  }

  .g--course--pay--button {
    display: block;
    text-align: center;
    width: 100%;
    border: none;
    color: white;
    margin-top: 10px;
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
      font-weight: 600;
      line-height: 1.75;
    }
  }

  .g--course--in--cart {
    background-color: #a8a38c;

    &:hover {
      background-color: #79745f;
    }
  }

  .g--add--to--cart--button--disabled {
    color: rgba(0, 0, 0, 0.26);
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.12);
    cursor: default;

    &:hover {
      background-color: rgba(0, 0, 0, 0.12);
    }
  }

  .g--course--email--info {
    margin-top: 20px;
    font-size: 18px;
    line-height: 1.43;
  }
}
</style>