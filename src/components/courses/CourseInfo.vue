<template>
  <div class="g--course--full--info">
    <div class="g--course--tech--info">
      <div>
        <span>Дата начала: </span>
        <span class="g--course--tech--value">
          {{ startTime }}
        </span>
      </div>
      <div class="g--course--country">
        <span>Страна: </span>
        <span class="g--course--tech--value">
          {{ countryName }}
        </span>
      </div>
    </div>
    <div class="g--course--description">
      <h2>Описание курса</h2>
      <p>
        {{ description }}
        <!--                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium-->
        <!--                  alias asperiores aspernatur atque autem blanditiis consequatur-->
        <!--                  consequuntur corporis cumque cupiditate delectus deleniti dicta-->
        <!--                  dignissimos dolor doloremque doloribus dolorum ducimus ea earum eius-->
        <!--                  eligendi eos error esse est et eum eveniet excepturi exercitationem-->
        <!--                  expedita explicabo facere fugiat fugit harum hic id illum impedit-->
        <!--                  incidunt ipsa ipsum iste itaque iure laboriosam laborum laudantium-->
        <!--                  libero magnam magni maiores maxime minima minus molestiae mollitia-->
        <!--                  natus nemo neque nihil nisi nobis non nostrum nulla numquam obcaecati-->
        <!--                  odio officia officiis omnis optio pariatur perferendis perspiciatis-->
        <!--                  placeat porro possimus praesentium provident quae quam quasi quia-->
        <!--                  quisquam quod quos ratione recusandae rem repellat repellendus-->
        <!--                  reprehenderit repudiandae rerum saepe sapiente sequi similique sit-->
        <!--                  soluta sunt suscipit tempora tenetur totam ullam unde vel veniam-->
        <!--                  veritatis voluptas voluptate voluptatem voluptates voluptatibus-->
        <!--                  voluptatum. Ab accusamus accusantium ad adipisci alias aliquam-->
        <!--                  architecto asperiores aspernatur assumenda at atque aut autem-->
        <!--                  blanditiis consequatur consequuntur corporis culpa cum cupiditate-->
        <!--                  debitis delectus deleniti dicta dignissimos distinctio dolor-->
        <!--                  doloremque doloribus dolorum ducimus ea earum eius eligendi error-->
        <!--                  esse est et eum eveniet excepturi exercitationem expedita explicabo-->
        <!--                  facere facilis fuga fugiat fugit harum hic id illum impedit in-->
        <!--                  incidunt ipsa ipsum iste itaque iure labore laboriosam laborum laudantium-->
        <!--                  libero magnam magni maiores maxime minima minus molestiae mollitia-->
        <!--                  natus nemo neque nihil nisi nobis non nostrum nulla numquam obcaecati-->
        <!--                  odio officia officiis omnis optio pariatur perferendis perspiciatis-->
        <!--                  placeat porro possimus praesentium provident quae quam quasi quia-->
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  starting_at: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  countryName: {
    type: String,
    required: true
  }
})

const startTime = computed(() => {
  const date = new Date(props.starting_at)
  return date.toLocaleDateString()
})
</script>

<style scoped lang="scss">
.g--course--full--info {
  width: 634px;

  .g--course--tech--info {
    font-size: 18px;
    line-height: 1;

    .g--course--country {
      margin-top: 30px;
    }

    .g--course--tech--value {
      color: #a9a389;
    }
  }

  .g--course--description {
    margin-top: 50px;

    h2 {
      font-size: 36px;
      font-weight: 400;
      line-height: 1;
    }

    p {
      margin-top: 30px;
      font-size: 21px;
      line-height: 1.43;
    }
  }
}
</style>