<template>
  <div class="col d-flex justify-content-center">
    <div
      class="card h-100 rounded-0"
      :style="{ width: width || '300px' }"
    >
      <nuxtLink
        v-show="link"
        class="stretched-link"
        :to="`/${link}`"
        :aria-label="`Go to ${title}`"
      />
      <svg
        v-if="loading"
        class="bd-placeholder-img card-img-top placeholder-wave"
        width="100%"
        height="180"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect
          class="placeholder"
          width="100%"
          height="100%"
          fill="#868e96"
        ></rect>
      </svg>
      <nuxt-img
        v-else
        loading="lazy"
        placeholder="/Loading_icon.gif"
        format="webp"
        quality="25"
        :src="imageUrl"
        class="card-img-top"
        alt="card-img"
        @error="handleError"
      />
      <div v-if="loading" class="card-body placeholder-glow">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow pb-4">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
      </div>
      <div v-else class="card-body pt-3">
        <div>
          <slot name="badge" />
          <h5 class="card-title">{{ title }}</h5>
          <div class="card-text">
            <slot name="text" />
          </div>
          <slot name="rating" />
        </div>
        <slot name="body" />
        <div class="card-footer text-center">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['image', 'link', 'width', 'title', 'loading'],
  data() {
    return {
      imageUrl: this.image,
    }
  },
  methods: {
    handleError(e) {
      this.imageUrl = 'blank.jpg'
    },
  },
}
</script>

<style lang="scss" scoped>
.card img {
  object-fit: contain;
  height: 25vh;
}
.card-body {
  padding-bottom: 0px;
}
.card {
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  min-width: 200px;
}

.card:hover {
  outline: 2px solid $secondary;
}
.card-footer {
  padding-top: 0px;
  border-radius: 0 0 12px 12px;
  border: 0px;
}
</style>
