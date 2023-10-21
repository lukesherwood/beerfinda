<template>
  <div class="header">
    <h1 class="display-1 text-secondary fw-bold">
      <strong>{{ header }} </strong>
    </h1>
    <h4 class="py-1">
      <slot name="subheader" />
    </h4>
  </div>
</template>

<script>
export default {
  props: ['header'],
}
</script>

<style>
</style>