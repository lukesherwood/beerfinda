<template>
  <div class="banner pb-5">
    <div class="centered">
      <div></div>
      <div></div>
      <div>
        <h1 class="text-white">{{ text }}</h1>
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~static/beerWallpaper.jpg');
  width: 100%;
  height: 400px;
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
  font-size: 5em;
}
</style>
