<template>
  <div class="container">
    <div class="card" style="width: 90%">
      <div class="card-header bg-warning">
        <h3 class="pt-2">
          {{ brewer.name }}
        </h3>
      </div>
      <div class="card-body p-3">
        <div class="w-50 float-end">
          <nuxt-img
            loading="lazy"
            placeholder="/index.png"
            class="img-fluid"
            style="height: 100%; width: 100%; object-fit: contain"
            :src="image"
            alt="default-beer"
          />
        </div>
        <div class="brewer-desc">
          {{ brewer.description.substring(1, brewer.description.length - 1) }}
        </div>
        <div class="brewer-est">
          <em>Est. {{ brewer.established }}</em>
        </div>
        <div class="brewer-location">
          <strong>{{ brewer.location }}</strong>
        </div>
        <div class="brewer-type">
          {{ brewer.type }}
        </div>
        <div>Beers: {{ brewer.numberbeers }}</div>
        <div>
          <h4>Contact</h4>
          <div v-if="brewer.email" class="float-start p-2">
            <a :href="brewer.email"> <b-icon icon="envelope"></b-icon> </a>
          </div>
          <div v-if="brewer.twitter" class="float-start p-2">
            <a :href="brewer.twitter" target="_blank">
              <b-icon icon="twitter"></b-icon>
            </a>
          </div>
          <div v-if="brewer.facebook" class="float-start p-2">
            <a :href="brewer.facebook" target="_blank">
              <b-icon icon="facebook"></b-icon>
            </a>
          </div>
          <div v-if="brewer.instagram" class="float-start p-2" target="_blank">
            <a :href="brewer.instagram" target="_blank">
              <b-icon icon="instagram"></b-icon>
            </a>
          </div>
          <div v-if="brewer.phone" class="float-start p-2">
            <a :href="'tel:' + brewer.phone">
              <b-icon icon="telephone"></b-icon
            ></a>
          </div>
          <div v-if="brewer.address" class="float-start p-2">
            <b-icon icon="mailbox2"></b-icon>
            {{ brewer.address }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BrewerPage',
  props: ['brewer'],
  data() {
    return {
      image: this.imageUrl(),
    }
  },
  methods: {
    imageUrl() {
      return this.brewer.image_pre_link + this.brewer.image || 'index.png'
    },
    formatString(string) {
      return string.replace(/.+?[.?!](\s|$)/g, function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 500px) {
  .card {
    box-shadow: none;
    border: none;
  }
}
.card img {
  max-height: 400px;
}
</style>
