<template>
  <div>
    <header>
      <Navbar />
      <notifications position="top right" />
    </header>
    <div class="body">
      <Nuxt />
    </div>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
a.nuxt-link-active {
  color: $secondary !important;
}
</style>
