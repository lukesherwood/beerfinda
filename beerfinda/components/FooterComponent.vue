<template>
  <ul class="nav justify-content-center navbar-light bg-light">
    <li class="nav-item">
      <nuxtLink to="/about" class="nav-link text-primary" aria-current="page"
        >About</nuxtLink
      >
    </li>
    <li class="nav-item">
      <nuxtLink to="/blog" class="nav-link text-primary" aria-current="page"
        >Blog</nuxtLink
      >
    </li>
    <li class="nav-item">
      <nuxtLink to="/brewers" class="nav-link text-primary" aria-current="page"
        >Legal</nuxtLink
      >
    </li>
    <li class="nav-item">
      <nuxtLink to="/brewers" class="nav-link text-primary" aria-current="page"
        >Contact</nuxtLink
      >
    </li>
  </ul>
</template>
<script>
export default {}
</script>
<style lang="scss">
.container-fluid-nav div {
  display: flex;
  justify-content: space-around;
}
</style>
