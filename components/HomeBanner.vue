<template>
  <div class="banner pb-5">
    <div class="centered">
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
.banner {
  background-image: linear-gradient(
      rgba(74, 97, 99, 0.8),
      rgba(74, 97, 99, 0.8)
    ),
    url('~static/beerWallpaper.jpg');
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(90% - 5vw));
  width: 100%;
  height: 450px;
  background-size: cover;
}
</style>
