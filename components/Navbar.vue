<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light pt-0">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target=".dual-collapse2"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"
      >
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a
              href="/beers"
              class="nav-link text-primary"
              aria-current="page"
              >Beers</a
            >
          </li>
          <li class="nav-item">
            <a
              href="/breweries"
              class="nav-link text-primary"
              aria-current="page"
              >Breweries</a
            >
          </li>
          <li class="nav-item">
            <a
              href="/merchants"
              class="nav-link text-primary"
              aria-current="page"
              >Merchants</a
            >
          </li>
        </ul>
      </div>
      <div class="mx-auto order-0">
        <a href="/">
          <nuxt-img
            loading="lazy"
            preload
            width="200px"
            src="/beerfinda.png"
            format="webp"
            class="navbar-brand pt-0"
          />
        </a>
      </div>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ms-auto">
          <li v-if="!$auth.loggedIn" class="nav-item">
            <a href="/login" class="nav-link text-primary">Login</a>
          </li>
          <li v-if="!$auth.loggedIn" class="nav-item">
            <a href="/register" class="nav-link text-primary"
              >Sign Up</a
            >
          </li>
          <li v-if="$auth.loggedIn" class="nav-item">
            <a href="#" class="nav-link text-primary" @click="$auth.logout()">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$auth
        .logout()
        .then(() =>
          this.$notify({ type: 'success', text: 'Logged out successfully' })
        )
    },
  },
}
</script>
<style lang="scss" scoped>
@media only screen and (min-width: 768px) {
  ul {
    padding-top: 25px;
  }
}

.nav-item {
  word-spacing: 3px;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 20px;
}
</style>
