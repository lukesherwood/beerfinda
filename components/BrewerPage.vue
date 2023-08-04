<template>
  <div class="p-5 row">
    <div class="col-sm-6 col-xs-12 pb-5">
      <nuxt-img
        loading="lazy"
        placeholder="/brewer.jpg"
        format="webp"
        class="img-fluid beer-image"
        :src="image"
        alt="default-beer"
      />
    </div>
    <div class="col-sm-6 col-xs-12">
      <div class="header">
        <h1 class="display-3 text-secondary fw-bold">
          <strong>{{ brewer.name }} </strong>
        </h1>
      </div>
      <div class="py-2 border-top border-bottom">
        <h4 class="text-center w-100">Contact</h4>
        <div class="d-flex justify-content-evenly">
          <div v-if="brewer.email" class="p-2">
            Email:
            <a :href="`mailto:${brewer.email}`">
              <b-icon icon="envelope"></b-icon>
            </a>
          </div>
          <div v-if="brewer.twitter" class="p-2">
            <a :href="brewer.twitter" target="_blank">
              <b-icon icon="twitter"></b-icon>
            </a>
          </div>
          <div v-if="brewer.facebook" class="p-2">
            <a :href="brewer.facebook" target="_blank">
              <b-icon icon="facebook"></b-icon>
            </a>
          </div>
          <div v-if="brewer.instagram" class="p-2" target="_blank">
            <a :href="brewer.instagram" target="_blank">
              <b-icon icon="instagram"></b-icon>
            </a>
          </div>
          <div v-if="brewer.phone" class="p-2">
            Call:
            <a :href="'tel:' + brewer.phone">
              <b-icon icon="telephone"></b-icon> {{ brewer.phone }}</a
            >
          </div>
        </div>
        <div v-if="brewer.address" class="p-2 text-center">
          Address:
          <b-icon icon="mailbox2"></b-icon>
          {{ brewer.address }}
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="brewer-text pt-3">
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
        <div v-if="brewer.description" class="brewer-desc py-3">
          {{ brewer.description.substring(1, brewer.description.length - 1) }}
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
      return this.brewer.image_pre_link + this.brewer.link || 'brewer.jpg'
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
