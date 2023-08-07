<template>
  <div class="g--acc--tabs">
    <RouterLink to="/account/profile" class="g--acc--tab" :class="{'active': tabIndex === 0}">
      <h2>Личный кабинет</h2>
    </RouterLink>
    <RouterLink to="/account/courses" class="g--acc--tab" :class="{'active': tabIndex === 1}">
      <h2>Курсы</h2>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tabIndex: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped lang="scss">
.g--acc--tabs {
  display: flex;
  align-items: end;
  width: 100%;

  .g--acc--tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 50%;
    height: 60px;
    text-decoration: none;
    background-color: rgba(201, 193, 159, 0.5);
    cursor: pointer;

    h2 {
      font-size: 21px;
      color: black;
    }
  }

  .active {
    height: 72px;
    border-top: 1px solid rgba(201, 193, 159, 0.5);
    border-right: 1px solid rgba(201, 193, 159, 0.5);
    border-left: 1px solid rgba(201, 193, 159, 0.5);
    background-color: white;
  }
}
</style>