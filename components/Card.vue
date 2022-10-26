<template>
  <div class="col">
    <div class="card h-100 mb-3" :style="{ width: width }">
      <nuxtLink class="stretched-link" :to="`/${link}`" />
      <nuxt-img
        loading="lazy"
        placeholder="Loading_icon.gif"
        quality="25"
        :src="imageUrl"
        class="card-img-top"
        alt="card-img"
        @error="handleError"
      />
      <div class="card-body d-flex flex-column pt-4">
        <slot name="badge" />
        <h5 class="card-title">{{ title }}</h5>
        <div class="card-text">
          <slot name="text" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: ['image', 'link', 'width', 'title'],
  data() {
    return {
      imageUrl: this.image,
    }
  },
  methods: {
    handleError(e) {
      this.imageUrl = 'index.png'
    },
  },
}
</script>
<style lang="scss" scoped>
.card img {
  object-fit: contain;
  height: 30rem;
}
</style>
