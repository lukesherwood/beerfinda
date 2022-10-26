<template>
  <div class="container">
    <h1 class="text-center text-primary">BREWERIES</h1>
    <Search @search="filterBreweriesResults" />
    <Spinner v-if="$fetchState.pending" :loading="$fetchState.pending" />
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
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
          :key="brewer.brewer_id"
          :link="`brewer/${brewer.brewer_id}`"
          :title="brewer.name"
          :image="brewer.image_pre_link + brewer.image"
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
      <PaginationComponent
        class="p-5"
        :pages="getPages"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Breweries',
  async fetch() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.setStateFromQuery()
      },
      { immediate: true }
    )
    try {
      await this.$store.dispatch('brewer/fetchBreweries')
    } catch (error) {
      console.error(error)
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
  methods: {
    ...mapMutations(['brewer/setCurrentPage', 'brewer/setSearchTerm']),
    setStateFromQuery() {
      const query = this.$route.query
      if (query.search) {
        this.setSearchTerm(query.search)
      }
      if (query.page) {
        this.setCurrentPage(query.page)
      }
    },
    getBreweriesResults() {
      this.fetchBreweries()
    },
    filterBreweriesResults() {
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
    createUrl() {
      // have this as a build query instead??
      let url = 'brewer/?'
      const query = {}
      const page = this.getPages.currentPage
      if (page) {
        query.page = page
        const limit = 100
        const offset = (page - 1) * 100
        url += `limit=${limit}&offset=${offset}&`
      }
      const searchTerm = this.getFilters.searchTerm
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
