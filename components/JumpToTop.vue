<template>
  <div>
    <button
      v-if="showButton"
      class="scroll-to-top-btn btn btn-warning p-3"
      @click="scrollToTop"
    >
      Top <b-icon icon="chevron-up"></b-icon>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    handleScroll() {
      if (window.pageYOffset > 100) {
        this.showButton = true
      } else {
        this.showButton = false
      }
    },
  },
}
</script>

<style>
.scroll-to-top-btn {
  position: fixed;
  z-index: 1;
  bottom: 2rem;
  right: 2rem;
  border-radius: 100%;
  font-size: 16px;
  cursor: pointer;
  opacity: 70%;
}
</style>
