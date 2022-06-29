<template>
  <ul class="nav justify-content-center navbar-light bg-light">
    <li class="nav-item">
      <router-link to="/about" class="nav-link text-primary" aria-current="page"
        >About</router-link
      >
    </li>
    <li class="nav-item">
      <router-link to="/blog" class="nav-link text-primary" aria-current="page"
        >Blog</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/brewers"
        class="nav-link text-primary"
        aria-current="page"
        >Legal</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/brewers"
        class="nav-link text-primary"
        aria-current="page"
        >Contact</router-link
      >
    </li>
  </ul>
</template>
<script>
export default {};
</script>
<style lang="scss">
.container-fluid-nav div {
  display: flex;
  justify-content: space-around;
}
</style>
