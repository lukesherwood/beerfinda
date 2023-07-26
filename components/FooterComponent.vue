<template>
  <footer class="text-center text-lg-start bg-primary text-white">
    <div class="container pt-4 text-center">
      <section class="mb-4">
        <div
          class="btn btn-link btn-floating btn-lg text-white m-1"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <b-icon icon="facebook"></b-icon>
        </div>
        <div
          class="btn btn-link btn-floating btn-lg text-white m-1"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <b-icon icon="twitter"></b-icon>
        </div>
        <div
          class="btn btn-link btn-floating btn-lg text-white m-1"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <b-icon icon="google"></b-icon>
        </div>
        <div
          class="btn btn-link btn-floating btn-lg text-white m-1"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <b-icon icon="instagram"></b-icon>
        </div>
      </section>
    </div>
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <nuxtLink class="nav-link" to="/about" aria-current="page"
              ><h6 class="text-uppercase fw-bold mb-4">About</h6></nuxtLink
            >
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <nuxtLink class="nav-link" to="/legal/terms" aria-current="page"
              ><h6 class="text-uppercase fw-bold mb-4">
                Terms and Conditions
              </h6></nuxtLink
            >
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <nuxtLink class="nav-link" to="/legal/privacy" aria-current="page"
              ><h6 class="text-uppercase fw-bold mb-4">
                Privacy Policy
              </h6></nuxtLink
            >
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <nuxtLink class="nav-link" to="/contact" aria-current="page"
              ><h6 class="text-uppercase fw-bold mb-4">Contact</h6></nuxtLink
            >
          </div>
        </div>
      </div>
    </section>
    <div class="text-center p-4 text-dark" style="background-color: #dcd8cf">
      © 2022 Copyright:
      <a class="text-reset fw-bold" href="https://beerfinda.com/"
        >BeerFinda.co.nz</a
      >
    </div>
  </footer>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped></style>
