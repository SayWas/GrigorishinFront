<template>
  <hr />
  <div class="g--about">
    <h1>О Сайте</h1>
    <p>
      Надо написать.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
hr {
  margin: 30px auto 9px auto;
  max-width: 90%;
  border: 0;
  height: 1px;
  background-color: rgba(201, 193, 159, 0.5);
}

.g--about {
  margin: 22px auto 0 auto;
  max-width: 900px;
  line-height: 1.5;

  h1 {
    font-style: italic;
    margin: 20px 0 40px 0;
    text-align: center;
    font-size: 48px;
    line-height: 1;
  }

  p {
    font-size: 21px;
  }
}
</style>
