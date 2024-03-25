<template>
  <div>
    <button
      v-if="showButton"
      class="scroll-to-top-btn btn btn-warning p-2"
      @click="scrollToTop"
    >
      TOP <b-icon icon="chevron-up"></b-icon>
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
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 100%;
  font-size: 16px;
  cursor: pointer;
  opacity: 70%;
}
</style>
