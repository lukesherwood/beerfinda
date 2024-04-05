<template>
  <div class="w-100">
    <Banner text="Search for Beers">
      <Search
        :loading="isLoading"
        :search-term="getFilters.searchTerm"
        @search="handleSearch"
        @clear="handleClearSearch"
      />
    </Banner>
    <div class="container">
      <Breadcrumbs />
      <BeerFilter
        :logged-in="Boolean($store.state.auth.user?.email)"
        @filter="filterBeerResults"
        @order="filterBeerResults"
      />
      <Spinner
        v-if="$fetchState.pending || isLoading"
        :loading="$fetchState.pending || isLoading"
      />
      <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
      <div v-else>
        <h4 v-if="getBeers?.length == 0" class="text-center pt-5">
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
              :key="'beer-card' + beer.beer_id + '-' + Math.random(10)"
              :title="beer.name"
              :link="`beers/${beer.beer_id}`"
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
                <div class="beer-price float-end">
                  <small>{{ price(beer) }}</small>
                </div>
                <div class="brewer-name">
                  <em>
                    {{ beer.brewer_name }}
                  </em>
                </div>
                <div class="beer-type">
                  <small>{{ beer.type }}</small>
                </div>
              </template>
              <template #rating>
                <div
                  class="beer-rating badge rounded-pill"
                  :style="{
                    'background-color': beerRatingColor(
                      Math.round(beer.rating * 10) / 10
                    ),
                  }"
                >
                  <b-icon icon="star-fill"></b-icon>
                  {{ Math.round(beer.rating * 10) / 10 }}
                </div>
              </template>
              <template #heart>
                <button class="float-end heart">
                  <i
                    v-if="isLoggedIn && beersLiked.includes(beer.beer_id)"
                    class="bi bi-heart-fill"
                    @click="handleHearted(beer.beer_id)"
                  ></i>
                  <i
                    v-else-if="isLoggedIn"
                    class="bi bi-heart"
                    @click="handleHearted(beer.beer_id)"
                  ></i>
                </button>
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
    </div>
    <JumpToTop />
  </div>
</template>
<script>
import { isEmpty } from 'lodash'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import {
  beerCategoryColors,
  beerImageUrl,
  priceToString,
  beerRatingColor,
} from '../helpers/beer.js'

export default {
  name: 'Beers',
  data() {
    return {
      beerCategoryColors,
    }
  },
  async fetch() {
    this.setStateFromQuery()
    const query = this.buildQuery()
    const array = Object.keys(query)
    let shouldFetch = false
    if (isEmpty(query)) {
      shouldFetch = true
    }
    // query != getLastQuery for strange reasons as it has state gibberish as well
    if (query) {
      array.forEach((key) => {
        if (query[key] !== this.getLastQuery[key]) shouldFetch = true
      })
      if (this.getLastQuery) {
        Object.keys(this.getLastQuery).forEach((key) => {
          if (query[key] !== this.getLastQuery[key]) shouldFetch = true
        })
      }
    }

    try {
      // if query matches last query, don't refetch
      if (!shouldFetch) {
        return
      }
      await this.$store.dispatch('beer/fetchBeers', {
        query,
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  head() {
    return {
      title: `Beerfinda | Beers`,
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
      getBeers: 'beer/getBeers',
      getPages: 'beer/getPages',
      isLoading: 'beer/isLoading',
      getFilters: 'beer/getFilters',
      isInStockSet: 'beer/isInStockSet',
      getLastQuery: 'beer/getLastQuery',
    }),
    isLoggedIn() {
      return Boolean(this.$store.state.auth.user?.email)
    },
    beersLiked() {
      return this.$store.state.auth.user?.beers_like
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  activated() {
    // Call fetch again if last fetch more than a 10 minutes ago
    if (this.$fetchState.timestamp <= Date.now() - 600000) {
      this.$fetch()
    }
  },
  methods: {
    ...mapMutations({
      setCurrentPage: 'beer/setCurrentPage',
      setOrder: 'beer/setOrder',
      setInStock: 'beer/setInStock',
      setFilter: 'beer/setFilter',
      setSearchTerm: 'beer/setSearchTerm',
    }),
    ...mapActions({
      fetchBeers: 'beer/fetchBeers',
      userUpdate: 'user/userUpdate',
    }),
    buildQuery() {
      const query = {}
      const searchTerm = this.getFilters.searchTerm
      if (searchTerm) {
        query.search = searchTerm
      } else if (!searchTerm && query.search) {
        // remove 'search' from query if no search term
        delete query.search
      }
      const page = this.getPages.currentPage
      if (page > 1) {
        query.limit = 100
        query.offset = (page - 1) * 100
      }
      const filters = this.getFilters.filter
      if (filters?.length) {
        filters.forEach((filter) => {
          query[filter.filterType] = ''
          const keyword =
            filter.keywords?.length > 1
              ? filter.keywords.join(',')
              : filter.keywords
          // API doesn't like array
          query[filter.filterType] = keyword.toString()
        })
      }
      const order = this.getFilters.order
      if (order) {
        query.ordering = order
      }
      const isInStockSet = this.isInStockSet
      if (isInStockSet === true) {
        query.merchantsellsfound__active = isInStockSet
      } else {
        delete query.merchantsellsfound__active
      }
      return query
    },
    setStateFromQuery() {
      const query = this.$route.query
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
    price(beer) {
      if (beer.merchantsellsfound) {
        if (!beer.merchantsellsfound?.length) return ''
        if (beer.merchantsellsfound?.length === 1) {
          return priceToString(beer.merchantsellsfound[0].price)
        }
        return priceToString(
          beer.merchantsellsfound.reduce((prev, curr) =>
            prev.price < curr.price ? prev : curr
          ).price
        )
      } else {
        return ''
      }
    },
    beerImageUrl,
    beerRatingColor,
    filterBeerResults() {
      this.setCurrentPage(1)
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
        path: 'beers',
        query: queries,
      })
    },
    handleClearSearch() {
      this.setCurrentPage(1)
      this.setSearchTerm('')
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      delete queries.search
      delete queries.page
      this.$router.push({
        path: 'beers',
        query: queries,
      })
    },
    handlePageChange(page) {
      this.setCurrentPage(page)
      this.$router
        .push({
          path: 'beers',
          query: { ...this.$route.query, page },
        })
        .then(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        })
    },
    handleHearted(beerId) {
      this.beersLiked.includes(beerId)
        ? this.userUpdate({
            beers_like: this.beersLiked.filter((beer) => beer !== beerId),
          })
        : this.userUpdate({ beers_like: [...this.beersLiked, beerId] })
    },
  },
}
</script>
<style lang="scss">
.beer-category {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 1rem;
}

.beer-rating {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  font-size: 1rem;
}

.heart {
  position: absolute;
  z-index: 100;
  color: red;
  top: 200px;
  right: 5px;
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
}

.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
}
</style>
