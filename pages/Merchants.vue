<template>
  <div class="container">
    <h1 class="text-center text-primary">MERCHANTS</h1>
    <Search
      :loading="isLoading"
      @search="handleSearch"
      @clear="handleClearResults"
    />
    <FilterComponent
      :ordering="orderingTypes"
      @filter="filterMerchantsResults"
      @clear="handleClearFilter"
    />
    <Spinner
      v-if="$fetchState.pending"
      :loading="$fetchState.pending || isLoading"
    />
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <div v-else>
      <h4 v-if="getMerchants.length == 0" class="text-center pt-3">
        <b-icon icon="search"></b-icon>
        Sorry, we couldn't find:
        <span v-if="getFilters.searchTerm">
          '{{ getFilters.searchTerm }}'
        </span>
      </h4>
      <div
        v-else
        class="pt-5 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
      >
        <Card
          v-for="merchant in getMerchants"
          :key="merchant.merchant_id"
          :link="`merchant/${merchant.link}`"
          :title="merchant.name"
          image="index.png"
        >
          <!-- :image="merchant.image_pre_link + merchant.image" -->
          <template #text>
            <div class="merchant-est">
              <em>Est. {{ merchant.established }}</em>
            </div>
            <div class="merchant-location">
              <strong>{{ merchant.location }}</strong>
            </div>
            <div class="merchant-type">
              {{ merchant.type }}
            </div>
            <div class="merchant-beer-num">
              <small> Number of Beers: {{ merchant.numberbeers }}</small>
            </div>
          </template>
        </Card>
      </div>
      <Pagination
        class="p-5"
        :pages="getPages"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { orderingTypes } from '../helpers/brewery'
export default {
  name: 'Merchants',
  data() {
    return {
      orderingTypes,
    }
  },
  async fetch() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.setStateFromQuery()
      },
      { immediate: true }
    )
    try {
      await this.$store.dispatch('merchant/fetchMerchants', {
        url: this.createUrl(),
      })
    } catch (error) {
      console.error(error)
    }
  },
  head() {
    return {
      title: `Beerfinda | Merchants`,
    }
  },
  computed: {
    ...mapGetters({
      getMerchants: 'merchant/getMerchants',
      getPages: 'merchant/getPages',
      isLoading: 'merchant/isLoading',
      getFilters: 'merchant/getFilters',
    }),
  },
  methods: {
    ...mapMutations({
      setCurrentPage: 'merchant/setCurrentPage',
      setSearchTerm: 'merchant/setSearchTerm',
      setOrder: 'merchant/setOrder',
    }),
    ...mapActions({
      fetchMerchants: 'merchant/fetchMerchants',
    }),
    setStateFromQuery() {
      const query = this.$route.query
      if (query.search) {
        this.setSearchTerm(query.search)
      }
      if (query.page) {
        // need to convert from string because pagination component needs ints for correct calculations
        this.setCurrentPage(parseInt(query.page))
      }
      if (query.ordering) {
        this.setOrder(query.ordering)
      }
    },
    filterMerchantsResults(filters) {
      this.setCurrentPage(1)
      this.setOrder(filters.order)
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.ordering = filters.order
      delete queries.page
      this.$router.push({
        path: 'merchants',
        query: queries,
      })
      this.fetchMerchants({
        url: this.createUrl(),
      })
    },
    handleSearch(keyword) {
      this.setSearchTerm(keyword)
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.search = keyword
      delete queries.page
      this.$router.push({
        path: 'merchants',
        query: queries,
      })
      this.fetchmerchants({
        url: this.createUrl(),
      })
    },
    handleClearResults() {
      this.setCurrentPage(1)
      this.setSearchTerm('')
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      delete queries.search
      delete queries.page
      this.$router.push({
        path: 'merchants',
        query: queries,
      })
      this.fetchMerchants({
        url: '/merchant',
      })
    },
    handleClearFilter() {
      this.setCurrentPage(1)
      this.setOrder('')
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      delete queries.ordering
      delete queries.page
      this.$router.push({
        path: 'merchants',
        query: queries,
      })
      this.fetchMerchants({
        url: this.createUrl(),
      })
    },
    handlePageChange(page) {
      this.setCurrentPage(page)
      this.$router.replace({
        path: 'merchants',
        query: { ...this.$route.query, page },
      })
      this.fetchMerchants({
        url: this.createUrl(),
      })
    },
    createUrl() {
      // have this as a build query instead??
      let url = 'merchant/?'
      const query = {}
      const searchTerm = this.getFilters.searchTerm
      if (searchTerm) {
        url += `search=${searchTerm}&`
        query.search = searchTerm
      }
      const page = this.getPages.currentPage
      if (page > 1) {
        query.page = page
        const limit = 100
        const offset = (page - 1) * 100
        url += `limit=${limit}&offset=${offset}&`
      }
      const order = this.getFilters.order
      if (order) {
        url += `ordering=${order}&`
        query.ordering = order
      }
      return url
    },
  },
}
</script>
<style lang="scss"></style>
