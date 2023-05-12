<template>
  <div class="banner pb-1">
    <div class="centered">
      <div></div>
      <div></div>
      <div>
        <h1 class="text-white display-4">{{ text }}</h1>
      </div>
      <div class="w-100">
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
.centered {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  height: 100%;
}
.banner {
  background-image: linear-gradient(
      rgba(74, 97, 99, 0.7),
      rgba(74, 97, 99, 0.7)
    ),
    url('~static/beerWallpaper.jpg');
  width: 100%;
  height: 30vh;
  background-size: cover;
}
.centered > div:first-child {
  margin-top: auto;
  visibility: hidden;
}
.centered > div:nth-child(2) {
  margin-top: auto;
  visibility: hidden;
}
.centered > div:nth-child(3) {
  margin-top: auto;
  display: flex;
}
.centered > div:last-child {
  margin-top: auto;
  margin-bottom: auto;
}

h1 {
  font-family: 'Michroma';
  word-spacing: 5px;
}
</style>
