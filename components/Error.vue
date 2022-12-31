<template>
  <p v-show="error" class="alert alert-danger text-center">
    {{ error.message }}
    <br />
    <a href="" @click.prevent="$router.back()">Go Back</a>
  </p>
</template>

<script>
export default {
  props: {
    error: {
      default: '',
    },
  },
}
</script>

<style></style>
