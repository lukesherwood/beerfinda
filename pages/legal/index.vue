<template>
  <div class="container">
    <Breadcrumbs />
    <h1 class="text-center pb-5">Legal</h1>
    <div class="text-center">
      <p>
        <nuxtLink
          to="/legal/privacy"
          class="nav-link text-primary p-5"
          aria-current="page"
          ><button class="btn btn-secondary">Privacy Policy</button></nuxtLink
        >
      </p>
      <p>
        <nuxtLink
          to="/legal/terms"
          class="nav-link text-primary p-5"
          aria-current="page"
          ><button class="btn btn-secondary">
            Terms and Conditions
          </button></nuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legal',
}
</script>

<style lang="scss" scoped>
.container {
  background: white;
  min-height: 90vh;
}
</style>
