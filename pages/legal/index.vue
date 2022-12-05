<template>
  <div class="container">
    <h1 class="text-center pb-5">Legal</h1>
    <div class="text-center">
      <p>
        <nuxtLink
          to="/legal/privacy"
          class="nav-link text-primary p-5"
          aria-current="page"
          ><h4>Privacy Policy</h4></nuxtLink
        >
      </p>
      <p>
        <nuxtLink
          to="/legal/terms"
          class="nav-link text-primary p-5"
          aria-current="page"
          ><h4>Terms and Conditions</h4></nuxtLink
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

<style lang="scss" scoped></style>
