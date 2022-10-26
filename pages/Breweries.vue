<template>
  <div class="container">
    <h1 class="text-center text-primary">BREWERIES</h1>
    <Search @search="filterBreweriesResults" />
    <Spinner v-if="isLoading" />
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Breweries',
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
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.setStateFromQuery()
      },
      { immediate: true }
    )
    this.getBreweriesResults()
  },
  methods: {
    ...mapActions({ fetchBreweries: 'brewer/fetchBreweries' }),
    ...mapMutations(['brewer/setCurrentPage', 'brewer/setSearchTerm']),
    setStateFromQuery() {
      const query = this.$route.query
      if (query.search) {
        this.setSearchTerm(query.search)
      }
      const page = parseInt(this.$route.query.page)
      if (page) {
        this.setCurrentPage(page)
      }
    },
    getBreweriesResults() {
      this.fetchBreweries()
    },
    filterBreweriesResults() {
      this.setCurrentPage(1)
      this.fetchBreweries({ url: this.createUrl() })
    },
    handlePageChange() {
      const page = this.getPages.currentPage
      this.$router.replace({
        path: 'beers',
        query: { ...this.$route.query, page },
      })
      const url = this.createUrl({ page })
      this.fetchBreweries({ url })
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
