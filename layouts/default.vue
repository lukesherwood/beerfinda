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

<style></style>
