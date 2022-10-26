<template>
  <div class="container">
    <h1 class="text-center text-primary">BEERS</h1>
    <Search @search="filterBeerResults" />
    <BeerFilter @filter="filterBeerResults" @order="filterBeerResults" />
    <Spinner v-if="$fetchState.pending" :loading="$fetchState.pending" />
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <div v-else>
      <h4 v-if="getBeers.length == 0" class="text-center pt-5">
        <b-icon icon="search"></b-icon>
        Sorry, we couldn't find:
        <span v-if="getFilters.searchTerm">
          '{{ getFilters.searchTerm }}'
        </span>
      </h4>
      <div v-else>
        <div
          class="pt-5 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
        >
          <Card
            v-for="beer in getBeers"
            :key="beer.beer_id"
            :title="beer.name"
            :link="`beer/${beer.beer_id}`"
            :image="beerImageUrl(beer)"
          >
            <template #badge>
              <div
                class="beer-category badge rounded-pill"
                :style="{
                  'background-color': beerCategoryColors[beer.type_upper],
                }"
              >
                {{ beer.type_upper }}
              </div>
            </template>
            <template #text>
              <div class="brewer-name">
                <em>
                  {{ beer.brewer_name }}
                </em>
              </div>
              <div class="beer-type">
                <small>{{ beer.type }}</small>
              </div>
            </template>
          </Card>
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
import { mapGetters, mapMutations } from 'vuex'
import { beerCategoryColors, beerImageUrl } from '../helpers/beerHelpers.js'

export default {
  name: 'Beers',
  data() {
    return {
      beerCategoryColors,
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
      const page = this.getPages.currentPage
      await this.$store.dispatch('fetchBeers', { url: this.createUrl(page) })
    } catch (error) {
      console.error(error)
    }
  },
  fetchOnServer: true,
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
    ...mapMutations([
      'setCurrentPage',
      'setOrder',
      'setInStock',
      'setFilter',
      'setSearchTerm',
    ]),
    beerImageUrl,
    setStateFromQuery() {
      const query = this.$route.query
      if (query.page) {
        this.setCurrentPage(query.page)
      }
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
    filterBeerResults() {
      this.setCurrentPage(1)
      this.$fetch()
    },
    handlePageChange() {
      const page = this.getPages.currentPage
      this.$router.replace({
        path: 'beers',
        query: { ...this.$route.query, page },
      })
      this.$fetch()
    },
    createUrl(page) {
      let url = 'beer/?'
      const query = {}
      if (page) {
        query.page = page
        const limit = 100
        const offset = (page - 1) * 100
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
<style lang="scss">
.beer-category {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
}
</style>
