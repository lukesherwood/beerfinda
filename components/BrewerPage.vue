<template>
  <div class="p-5">
    <div class="header">
      <h1 class="display-2">
        <strong>{{ brewer.name }} </strong>
      </h1>
    </div>
    <div class="row py-5">
      <div class="col-sm-6 col-xs-12">
        <div v-if="brewer.description" class="brewer-desc">
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
        <div class="pt-5">
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
      <div class="col-sm-6 col-xs-12 pb-5 d-flex justify-content-center">
        <nuxt-img
          loading="lazy"
          placeholder="/index.png"
          format="webp"
          class="img-fluid beer-image"
          :src="image"
          alt="default-beer"
        />
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
.beer-image {
  max-height: 100vh;
  width: 100%;
  object-fit: contain;
}
</style>
