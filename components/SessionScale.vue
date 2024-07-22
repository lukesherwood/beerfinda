<template>
  <div class="mb-3">
    <h5 class="d-flex justify-content-between">
      <span>Saviour</span>
      <span>Session</span>
    </h5>
    <div
      class="segmented-progress-bar d-flex bg-primary-subtle position-relative rounded"
    >
      <div
        v-for="n in 10"
        :key="n"
        class="segment flex-grow-1 border-end border-white"
        :class="{ 'bg-warning': n <= value }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style lang="scss" scoped>
.segment {
  transition: background-color 0.3s;
  &:last-child {
    border-right: none;
  }
}

.segmented-progress-bar {
  height: 30px;
}
</style>
