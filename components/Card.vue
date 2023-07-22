<template>
  <div class="col">
    <div class="card h-100" :style="{ width: width }">
      <nuxtLink
        v-show="link"
        class="stretched-link"
        :to="`/${link}`"
        :aria-label="`Go to ${title}`"
      />
      <nuxt-img
        loading="lazy"
        placeholder="/Loading_icon.gif"
        format="webp"
        quality="25"
        :src="imageUrl"
        class="card-img-top"
        alt="card-img"
        @error="handleError"
      />
      <div class="card-body pt-3">
        <slot name="badge" />
        <h5 class="card-title">{{ title }}</h5>
        <div class="card-text">
          <slot name="text" />
        </div>
        <slot name="rating" />
      </div>
      <slot name="body" />
      <div class="card-footer">
        <slot name="footer" />
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
@import '../assets/scss/variables.scss';
.card img {
  object-fit: contain;
  height: 25vh;
}
.card-body {
  padding-bottom: 0px;
}
.card {
  border: 0;
  border-radius: 12px;
  transition: 0.3s;
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card:hover {
  border: 2px solid $secondary;
}
.card-footer {
  padding-top: 0px;
  border-radius: 0 0 12px 12px;
  border: 0px;
}
</style>
