<template>
  <div class="col">
    <div class="card h-100" :style="{ width: width }">
      <nuxtLink
        v-if="link"
        class="stretched-link"
        :to="`/${link}`"
        :aria-label="`Go to ${title}`"
      />
      <nuxt-img
        loading="lazy"
        placeholder="Loading_icon.gif"
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
      </div>
      <div v-if="hasFooterSlot" class="card-footer">
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
  computed: {
    hasFooterSlot() {
      return !!this.$slots.footer
    },
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
  height: 25vh;
}

.card-body {
  border-radius: 0 0 12px 12px;
}

.card {
  border: 0;
  border-radius: 12px;
  transition: 0.3s;
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.2);
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
