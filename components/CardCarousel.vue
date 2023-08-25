<template>
  <agile :options="myOptions">
    <div
      v-for="beer in beers"
      :key="'carousel-beer' + beer.beer_id"
      class="p-5"
    >
      <Card
        :key="beer.beer_id"
        :title="beer.name"
        :link="`beers/${beer.beer_id}`"
        :image="beerImageUrl(beer)"
        width="300px"
      >
        <template #text>
          <div class="brewer-name">
            <em>
              {{ beer.brewer_name }}
            </em>
          </div>
          <div class="badge rounded-pill bg-danger featured">Featured</div>
        </template>
      </Card>
    </div>
  </agile>
</template>
<script>
import { beerImageUrl, beerCategoryColors } from '../helpers/beer'
export default {
  props: ['beers'],
  data() {
    return {
      myOptions: {
        autoplay: 'true',
        navButtons: true,

        responsive: [
          {
            breakpoint: 300,
            settings: {
              slidesToShow: '1',
              dots: true,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: '2',
              dots: true,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: '3',
              dots: true,
            },
          },
        ],
      },
      beerCategoryColors,
    }
  },
  methods: {
    beerImageUrl,
  },
}
</script>

<style lang="scss">
.featured {
  position: absolute;
  top: 5px;
  left: 5px;
}

.agile {
  margin-top: 20px;

  &__list {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &__nav-button {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 24px;
    transition-duration: .3s;

    &:hover {
      color: #888;
    }
  }

  &__dot {
    margin: 0 10px;

    button {
      background-color: #eee;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: block;
      height: 10px;
      font-size: 0;
      line-height: 0;
      margin: 0;
      padding: 0;
      transition-duration: .3s;
      width: 10px;
    }

    &--current,
    &:hover {
      button {
        background-color: #888;
      }
    }
  }
}
</style>
