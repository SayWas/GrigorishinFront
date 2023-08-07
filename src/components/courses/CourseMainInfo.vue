<template>
  <div class="g--title-container">
    <h1 class="g--title">
      {{ title }}
<!--      Раннее христианство: портрет на фоне-->
    </h1>
    <h2 class="g--subtitle">
      {{ subtitle }}
<!--      Курс лекций-->
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.g--title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../assets/course_covers/back_for_course_title.jpeg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
  background-attachment: fixed;

  .g--text {
    color: white;
    text-align: center;
    line-height: 1.2;
  }

  .g--title {
    color: white;
    font-size: 60px;
    font-style: italic;
    font-weight: 400;
    margin-bottom: 15px;
  }

  .g--subtitle {
    color: white;
    font-size: 36px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>