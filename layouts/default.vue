<template>
  <div>
    <header>
      <Navbar />
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

  head() {
    return {
      script: [
        { src: '/bootstrap/bootstrap.bundle.min.js', type: 'text/javascript' },
      ],
    }
  },
}
</script>

<style></style>
