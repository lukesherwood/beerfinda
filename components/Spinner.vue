<template>
  <div
    v-if="isLoading"
    class="d-flex justify-content-center align-items-center spinner-container"
  >
    <div class="spinner-grow" style="width: 5rem; height: 5rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow" style="width: 5rem; height: 5rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow" style="width: 5rem; height: 5rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Spinner',
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
  },
}
</script>
<style lang="scss">
.spinner-container {
  height: 65vh;
}
</style>
