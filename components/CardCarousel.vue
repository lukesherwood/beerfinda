<template>
  <agile :options="myOptions">
    <div v-for="beer in beers" :key="beer.beer_id" class="card-wrapper">
      <BeerCard :beer="beer" :featured="true" width="300px"/>
    </div>
  </agile>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['beers'],
  data() {
    return {
      myOptions: {
        autoplay: 'true',
        navButtons: false,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: '1',
              dots: false,
            },
          },

          {
            breakpoint: 900,
            settings: {
              navButtons: true,
              slidesToShow: '3',
              dots: true,
            },
          },
        ],
      },
    }
  },
}
</script>

<style lang="sass">
.agile
  margin-top: 20px
  &__actions
    margin-top: 20px
  &__nav-button
    background: transparent
    border: none
    color: #ccc
    cursor: pointer
    font-size: 24px
    transition-duration: .3s
    &:hover
      color: #888
  &__dot
    margin: 0 10px
    button
      background-color: #eee
      border: none
      border-radius: 50%
      cursor: pointer
      display: block
      height: 10px
      font-size: 0
      line-height: 0
      margin: 0
      padding: 0
      transition-duration: .3s
      width: 10px
    &--current,
    &:hover
      button
        background-color: #888
</style>
