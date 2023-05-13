<template>
  <div class="container">
    <Spinner
      v-if="$fetchState.pending || isLoading"
      :loading="$fetchState.pending || isLoading"
    />
    <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
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
<style lang="scss" scoped>
.container {
  background-color: white !important;
  min-height: 80vh;
}
</style>
