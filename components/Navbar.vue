<template>
  <div class="wrapper">
    <nav>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <nuxtLink to="/">
            <nuxt-img
              loading="lazy"
              src="/beerfinda.png"
              class="navbar-brand"
            />
          </nuxtLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent" class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <nuxtLink
                  to="/beers"
                  class="nav-link text-primary"
                  aria-current="page"
                  >Beers</nuxtLink
                >
              </li>
              <li class="nav-item">
                <nuxtLink
                  to="/breweries"
                  class="nav-link text-primary"
                  aria-current="page"
                  >Breweries</nuxtLink
                >
              </li>
              <li class="nav-item">
                <nuxtLink
                  to="/merchants"
                  class="nav-link text-primary"
                  aria-current="page"
                  >Merchants</nuxtLink
                >
              </li>
              <li v-if="!$auth.loggedIn" class="nav-item">
                <nuxtLink to="/login" class="nav-link text-primary"
                  >Login</nuxtLink
                >
              </li>
              <li v-if="!$auth.loggedIn" class="nav-item">
                <nuxtLink to="/register" class="nav-link text-primary"
                  >Sign Up</nuxtLink
                >
              </li>
              <li v-if="$auth.loggedIn" class="nav-item">
                <a
                  href="#"
                  class="nav-link text-primary"
                  @click="$auth.logout()"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss"></style>
