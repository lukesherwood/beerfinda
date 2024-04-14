<template>
  <div class="w-100">
    <Banner text="Search for Merchants">
      <Search
        :loading="isLoading"
        :search-term="getFilters.searchTerm"
        @search="handleSearch"
        @clear="handleClearResults"
      />
    </Banner>
    <div class="container">
      <Breadcrumbs />
      <FilterComponent
        v-if="getMerchants?.length > 0"
        :ordering="orderingTypes"
        @filter="filterMerchantsResults"
        @clear="handleClearFilter"
      />
      <Error v-if="$fetchState.error" :error="$fetchState.error" />
      <div v-else>
        <h4
          v-if="getMerchants?.length == 0 && !isLoading"
          class="text-center pt-3 h-100"
        >
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
            :key="'merchant-card' + merchant.merchant_id"
            :link="`merchants/${merchant.link}`"
            :title="merchant.name"
            :image="merchant.image_pre_link + merchant.image"
            :loading="$fetchState.pending || isLoading"
          >
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
          v-if="getMerchants?.length > 0"
          class="p-5"
          :pages="getPages"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <JumpToTop />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { orderingTypes } from '../helpers/merchant'
export default {
  name: 'Merchants',
  data() {
    return {
      orderingTypes,
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('merchant/fetchMerchants', {
        query: this.buildQuery(),
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  head() {
    return {
      title: `Beerfinda | Merchants`,
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4030304334636114',
          async: true,
          crossorigin: 'anonymous',
        },
      ],
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
  watch: {
    '$route.query': '$fetch',
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
    buildQuery() {
      const query = {}
      const searchTerm = this.getFilters.searchTerm
      if (searchTerm) {
        query.search = searchTerm
      }
      const page = this.getPages.currentPage
      if (page > 1) {
        query.limit = 100
        query.offset = (page - 1) * 100
      }
      const order = this.getFilters.order
      if (order) {
        query.ordering = order
      }
      return query
    },
    setStateFromQuery() {
      const query = this.$route.query
      if (query.search) {
        this.setSearchTerm(query.search)
      }
      if (!query.page) {
        this.setCurrentPage(1)
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
    },
    handleSearch(keyword) {
      this.setSearchTerm(keyword)
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.search = keyword
      if (!keyword) {
        delete queries.search
      }
      delete queries.page
      this.$router.push({
        path: 'merchants',
        query: queries,
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
    },
    handlePageChange(page) {
      this.setCurrentPage(page)
      this.$router.push({
        path: 'merchants',
        query: { ...this.$route.query, page },
      })
    },
  },
}
</script>
<style lang="scss"></style>
