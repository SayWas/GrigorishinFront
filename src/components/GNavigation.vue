<template>
  <nav class="g--navigation">
    <ul>
      <li
        v-for="(cB, index) in countriesStore.countryBlocks"
        :key="cB.id"
        class="g--nav--item"
        :class="{ 'g--no--border': index === countriesStore.countryBlocks.length - 1 }"
      >
        {{ cB.name }}
        <ul v-if="cB.countries" class="g--nav--dropdown">
          <RouterLink
            :to="{ path: '/', query: { country: country.name } }"
            v-for="country in cB.countries"
            :key="country.id"
            class="g--nav--dropdown--item"
          >
            {{ country.name }}
          </RouterLink>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountriesStore } from '@/stores/countriesStore'

const countriesStore = useCountriesStore()

onMounted(async () => {
  await countriesStore.getCountryBlocks()
})
</script>

<style scoped lang="scss">
.g--navigation {
  display: flex;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 15px;

  .g--nav--item {
    display: inline-block;
    text-align: center;
    min-width: 350px;
    padding: 10px 20px;
    border-right: solid #e0e0e0 1px;
    cursor: pointer;
    transition: all 0.05s ease-in-out;

    &:hover {
      background-color: rgba(201, 193, 159, 0.5);
    }
    &:hover > ul {
      visibility: visible;
      opacity: 1;
      display: flex;
    }
  }

  .g--no--border {
    border: none;
  }

  ul {
    padding: 0;
  }

  .g--nav--dropdown--item {
    text-decoration: none;
    color: black;
    list-style: none;
    text-align: left;
    padding: 10px 0 10px 30px;
    transition: all 0.05s ease-in-out;

    &:hover {
      color: #a9a389;
    }
  }

  .g--nav--dropdown {
    display: none;
    flex-direction: column;
    position: absolute;
    min-width: 350px;
    visibility: hidden;
    opacity: 0;
    margin-top: 10px;
    padding-left: 0;
    left: 0;
    background: white;
    box-shadow: 0 3px 5px -1px #ccc;
    z-index: 999;
  }
}
</style>