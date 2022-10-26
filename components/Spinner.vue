<template>
  <div
    v-if="loading"
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
export default {
  name: 'Spinner',
  props: ['loading'],
}
</script>
<style lang="scss">
.spinner-container {
  height: 65vh;
}
</style>
