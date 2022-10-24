<template>
  <div class="container">
    <h1 class="text-center text-primary">BEERS</h1>
    <Search @search="filterBeerResults" />
    <BeerFilter @filter="filterBeerResults" @order="filterBeerResults" />
    <Spinner v-if="isLoading" />
    <div v-else>
      <h4 v-if="getBeers.length == 0" class="text-center pt-3">
        <b-icon icon="search"></b-icon>
        Sorry, we couldn't find:
        <span v-if="getFilters.searchTerm">
          '{{ getFilters.searchTerm }}'
        </span>
      </h4>
      <div v-else>
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
        >
          <BeerCard
            v-for="beer in getBeers"
            :key="beer.beer_id"
            :beer="beer"
          ></BeerCard>
        </div>
        <PaginationComponent
          class="p-5"
          :pages="getPages"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Beers',
  async fetch() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.setStateFromQuery()
      },
      { immediate: true }
    )
    await this.getBeerResults()
  },
  head() {
    return {
      title: `Beerfinda | Beers`,
    }
  },
  computed: {
    ...mapGetters({
      getBeers: 'getBeers',
      getPages: 'getPages',
      isLoading: 'isLoading',
      getFilters: 'getFilters',
      isInStockSet: 'isInStockSet',
    }),
  },
  methods: {
    ...mapActions({ fetchBeers: 'fetchBeers' }),
    ...mapMutations([
      'setCurrentPage',
      'setOrder',
      'setInStock',
      'setFilter',
      'setSearchTerm',
    ]),
    setStateFromQuery() {
      const query = this.$route.query
      if (query.ordering) {
        this.setOrder(query.ordering)
      }
      if (query.inStock) {
        // if 'false' is entered change to strict boolean, otherwise its true as a strict boolean
        query.inStock === 'false'
          ? // eslint-disable-next-line no-extra-boolean-cast
            this.setInStock(!!!query.inStock)
          : this.setInStock(!!query.inStock)
      }
      if (query.search) {
        this.setSearchTerm(query.search)
      }
      if (query.filter) {
        const splitFilter = query.filter.split('=')
        const filterType = splitFilter[0]
        const keywords = splitFilter[1].split(',')
        this.setFilter({
          filterType,
          keyword: keywords,
        })
      }
    },
    getBeerResults() {
      const page = parseInt(this.$route.query.page)
      if (page) {
        this.setCurrentPage(page)
        this.fetchBeers({ url: this.createUrl({ page }) })
      } else {
        this.fetchBeers({ url: this.createUrl() })
      }
    },
    filterBeerResults() {
      this.setCurrentPage(1)
      this.fetchBeers({ url: this.createUrl() })
    },
    handlePageChange() {
      const page = this.getPages.currentPage
      this.$router.replace({
        path: 'beers',
        query: { ...this.$route.query, page },
      })
      const limit = 100
      const offset = (page - 1) * 100
      const url = this.createUrl({ page }) + `limit=${limit}&offset=${offset}&`
      this.fetchBeers({ url })
    },
    createUrl(page) {
      let url = 'beer/?'
      const query = {}
      if (page) {
        query.page = page.page
        const limit = 100
        const offset = (page.page - 1) * 100
        url += `limit=${limit}&offset=${offset}&`
      }
      const filters = this.getFilters.filter
      const order = this.getFilters.order
      const searchTerm = this.getFilters.searchTerm
      const isInStockSet = this.isInStockSet
      if (filters.length) {
        filters.forEach((filter) => {
          query.filterType = filter.filterType
          query.keywords = filter.keywords
          const keyword =
            filter.keywords.length > 1
              ? filter.keywords.join(', ')
              : filter.keywords
          url += `${filter.filterType}=${keyword}&`
        })
      }
      if (order) {
        url += `ordering=${order}&`
        query.ordering = order
      }
      if (isInStockSet === true) {
        url += `merchantsellsfound__isnull=${!isInStockSet}&`
      }
      if (searchTerm) {
        url += `search=${searchTerm}&`
        query.search = searchTerm
      }
      return url
    },
  },
}
</script>
<style lang="scss"></style>
