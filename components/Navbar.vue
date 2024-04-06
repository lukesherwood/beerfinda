<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light pt-0">
    <div class="container">
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
        </ul>
      </div>
      <div class="mx-auto order-0">
        <nuxtLink to="/">
          <nuxt-img
            loading="lazy"
            preload
            width="246px"
            height="52px"
            src="/beerfinda.png"
            format="webp"
            class="navbar-brand py-1 px-2"
          />
        </nuxtLink>
      </div>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ms-auto">
          <li v-if="$auth.user?.email" class="nav-item">
            <nuxtLink
              to="/user"
              class="nav-link text-primary"
              aria-current="page"
              ><b-icon class="pe-1" icon="person-circle"></b-icon>
            </nuxtLink>
          </li>
          <li v-show="!$auth.user?.email" class="nav-item">
            <nuxtLink to="/login" class="nav-link text-primary">Login</nuxtLink>
          </li>
          <li v-show="!$auth.user?.email" class="nav-item">
            <nuxtLink to="/register" class="nav-link text-primary"
              >Sign Up</nuxtLink
            >
          </li>
          <li v-if="$auth.user?.email" class="nav-item">
            <div role="button" class="nav-link text-primary" @click="logout()">
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Vue from 'vue'
export default {
  methods: {
    logout() {
      this.$auth
        .logout()
        .then(() => this.$router.push('/'))
        .then(() =>
          Vue.notify({ type: 'success', text: 'Logged out successfully' })
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
  display: flex;
  overflow: auto;
  white-space: nowrap;
  margin-right: 30px;
}

.nav-link {
  margin-top: auto;
  margin-bottom: auto;
}

@media (max-width: 990px) {
  .nav-item {
    margin-right: 10px;
  }
}
</style>
