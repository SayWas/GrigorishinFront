<template>
  <div class="g--account">
    <div class="g--acc--info g--full--w--container">
      <AccountTabs :tab-index="tabIndex" />
      <div class="g--acc--info--inner g--full--w--container">
        <h1>{{ tabTitle }}</h1>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountTabs from '@/components/account/AccountTabs.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const tabTitle = ref('Личный кабинет участника')
const tabIndex = ref(0)

const route = useRoute()
const update = () => {
  switch (route.name) {
    case 'profile':
      tabTitle.value = 'Личный кабинет участника'
      tabIndex.value = 0
      break
    case 'courses':
      tabTitle.value = 'Курсы'
      tabIndex.value = 1
      break
  }
}

watch(route, async (newValue, oldValue) => {
  update()
})

onMounted(() => {
  update()
})
</script>

<style scoped lang="scss">
.g--account {
  display: flex;
  justify-content: center;

  .g--full--w--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .g--acc--info {
    max-width: 1167px;
    margin-top: 100px;

    .g--acc--info--inner {
      padding-top: 120px;
      padding-bottom: 90px;
      border-left: 1px solid rgba(201, 193, 159, 0.5);
      border-right: 1px solid rgba(201, 193, 159, 0.5);
      border-bottom: 1px solid rgba(201, 193, 159, 0.5);

      h1 {
        font-size: 48px;
        font-style: italic;
      }
    }
  }
}
</style>