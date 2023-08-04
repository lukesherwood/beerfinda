<template>
  <div class="w-100">
    <Banner text="Search for Breweries">
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
        :ordering="orderingTypes"
        @filter="filterBreweriesResults"
        @clear="handleClearFilter"
      />
      <Spinner
        v-if="$fetchState.pending"
        :loading="$fetchState.pending || isLoading"
      />
      <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
      <div v-else>
        <h4 v-if="getBreweries.length == 0" class="text-center pt-3">
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
            v-for="brewer in getBreweries"
            :key="'brewer-card' + brewer.brewer_id"
            :link="`breweries/${brewer.link}`"
            :title="brewer.name"
            :image="brewer.image_pre_link + brewer.link"
          >
            <template #text>
              <div class="brewer-est">
                <em>Est. {{ brewer.established }}</em>
              </div>
              <div class="brewer-location">
                <strong>{{ brewer.location }}</strong>
              </div>
              <div class="brewer-type">
                {{ brewer.type }}
              </div>
              <div class="brewer-beer-num">
                <small> Number of Beers: {{ brewer.numberbeers }}</small>
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
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { orderingTypes } from '../helpers/brewery'
export default {
  name: 'Breweries',
  data() {
    return {
      orderingTypes,
    }
  },
  async fetch() {
    this.setStateFromQuery()
    try {
      await this.$store.dispatch('brewer/fetchBreweries', {
        query: this.buildQuery(),
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  head() {
    return {
      title: `Beerfinda | Breweries`,
    }
  },
  computed: {
    ...mapGetters({
      getBreweries: 'brewer/getBreweries',
      getPages: 'brewer/getPages',
      isLoading: 'brewer/isLoading',
      getFilters: 'brewer/getFilters',
    }),
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    ...mapMutations({
      setCurrentPage: 'brewer/setCurrentPage',
      setSearchTerm: 'brewer/setSearchTerm',
      setOrder: 'brewer/setOrder',
    }),
    ...mapActions({
      fetchBreweries: 'brewer/fetchBreweries',
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
    filterBreweriesResults(filters) {
      this.setCurrentPage(1)
      this.setOrder(filters.order)
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.ordering = filters.order
      delete queries.page
      this.$router.push({
        path: 'breweries',
        query: queries,
      })
    },
    handleSearch(keyword) {
      this.setSearchTerm(keyword)
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.search = keyword
      delete queries.page
      this.$router.push({
        path: 'breweries',
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
        path: 'breweries',
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
        path: 'breweries',
        query: queries,
      })
    },
    handlePageChange(page) {
      this.setCurrentPage(page)
      this.$router.push({
        path: 'breweries',
        query: { ...this.$route.query, page },
      })
    },
  },
}
</script>
<style lang="scss"></style>
