<template>
  <ul class="nav justify-content-center navbar-light bg-light">
    <li class="nav-item">
      <nuxtLink to="/about" class="nav-link text-primary" aria-current="page"
        >About</nuxtLink
      >
    </li>
    <li class="nav-item">
      <nuxtLink to="/legal" class="nav-link text-primary" aria-current="page"
        >Legal</nuxtLink
      >
    </li>
    <li class="nav-item">
      <nuxtLink to="/contact" class="nav-link text-primary" aria-current="page"
        >Contact</nuxtLink
      >
    </li>
  </ul>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.container-fluid-nav div {
  display: flex;
  justify-content: space-around;
}

li {
  font-family: 'Michroma';
  word-spacing: 5px;
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 20px;
}
</style>
