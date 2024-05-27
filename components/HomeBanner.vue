<template>
  <div class="mb-3 banner pb-2">
    <div class="centered h-100">
      <div></div>
      <div></div>
      <div>
        <h1 class="text-white display-1">{{ text }}</h1>
      </div>
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: ['text'],
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 550px;
}
.banner {
  background-image: linear-gradient(
      rgba(74, 97, 99, 0.2),
      rgba(74, 97, 99, 0.2)
    ),
    url('~static/beerHeader3.jpg');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>
