<template>
  <div class="wrapper">
    <nav>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link to="/">
            <img src="../assets/beerfinda.png" class="navbar-brand" />
          </router-link>
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
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link
                  to="/beers"
                  class="nav-link text-primary"
                  aria-current="page"
                  >Beers</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/brewers"
                  class="nav-link text-primary"
                  aria-current="page"
                  >Brewers</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/merchants"
                  class="nav-link text-primary"
                  aria-current="page"
                  >Merchants</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/users" class="nav-link text-primary"
                  >Sign Up</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
export default {};
</script>
<style lang="scss"></style>
