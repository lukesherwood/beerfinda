<template>
  <div class="w-100 text-wrap">
    <header>
      <Navbar />
      <notifications position="top center" />
    </header>
    <div class="body">
      <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    </div>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
a.nuxt-link-active {
  color: $secondary !important;
}
.body {
  background: #dcd8cf;
  margin-top: -5px;
}
.card {
  background: white;
}
.card-body {
  background: $primary;
  color: $light;
}
.card-footer {
  background: $primary;
}
.section {
  background: $light;
}
</style>
