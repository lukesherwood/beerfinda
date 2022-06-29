<script setup>
import Navbar from "./components/Navbar.vue";
import FooterComponent from "./components/FooterComponent.vue";
import Spinner from "./components/Spinner.vue";
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>
    <div class="body">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <template #default>
            <div>
              <component :is="Component"></component>
            </div>
          </template>
          <template #fallback>
            <div>
              <Spinner />
            </div>
          </template>
        </Suspense>
      </RouterView>
    </div>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<style lang="scss">
@import "./assets/_custom.scss";
</style>
