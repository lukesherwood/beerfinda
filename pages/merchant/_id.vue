<template>
  <div class="container">
    <h1 class="text-center text-primary">MERCHANT</h1>
    <Spinner v-if="isLoading" />
    <MerchantPage v-else :merchant="getMerchant" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Merchant',
  asyncData({ route }) {
    return {
      id: route.params.id,
    }
  },
  async fetch() {
    await this.fetchMerchant(this.id)
  },
  head() {
    return {
      title: `Beerfinda | Merchant | ${this.getMerchant.name}`,
    }
  },
  computed: {
    ...mapGetters({
      getMerchant: 'merchant/getMerchant',
      isLoading: 'merchant/isLoading',
    }),
  },

  methods: {
    ...mapActions({ fetchMerchant: 'merchant/fetchMerchant' }),
  },
}
</script>
<style lang="scss"></style>
