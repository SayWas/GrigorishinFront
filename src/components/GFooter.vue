<template>
  <div class="g--footer">
    <RouterLink to="/about" class="g--footer--link">
      О сайте
    </RouterLink>
<!--    <RouterLink to="/policy" class="g&#45;&#45;footer&#45;&#45;link">-->
<!--      Политика конфиденциальности-->
<!--    </RouterLink>-->
  </div>
</template>

<style lang="scss" scoped>
.g--footer {
  padding: 50px;
  font-size: 21px;
  margin-top: 150px;

  .g--footer--link{
    color: #000;
    margin-right: 25px;
    line-height: 0.85;
    border-bottom: 1px solid rgba(201, 193, 159, 0.5);
    text-decoration: none;
  }
}
</style>
