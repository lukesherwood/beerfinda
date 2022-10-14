<template lang="">
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-10">
        <div class="search">
          <form @submit.prevent="onSearch">
            <div class="input-group">
              <i v-show="!keyword" class="bi bi-search search-icon"></i>
              <input
                v-model="keyword"
                class="form-control border-end-0 border search-input"
                type="search"
                placeholder="Search for beer"
              />
              <i
                v-show="keyword"
                class="bi bi-x-circle search-clear"
                @click="handleClear"
              ></i>
              <span class="input-group-append">
                <button
                  v-if="isLoading"
                  disabled
                  type="submit"
                  class="btn btn-primary search-button"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
                <input
                  v-else
                  type="submit"
                  value="Search"
                  class="btn btn-primary search-button"
                />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Search',
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      getFilters: 'getFilters',
    }),
    keyword: {
      get() {
        return this.getFilters.searchTerm
      },
      set(value) {
        const queries = JSON.parse(JSON.stringify(this.$route.query))
        queries.search = value
        delete queries.page
        this.$router.push({
          path: 'beers',
          query: queries,
        })
        this.setSearchTerm(value)
      },
    },
  },
  watch: {
    keyword() {
      if (!this.keyword) return
      this.debounceSearch()
    },
  },
  created() {
    this.debounceSearch = debounce(this.onSearch, 1000)
  },
  methods: {
    ...mapMutations(['setSearchTerm']),
    onSearchSubmit() {
      this.$emit('search')
    },
    onSearch() {
      this.$emit('search')
    },
    handleClear() {
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      delete queries.search
      this.$router.push({
        path: 'beers',
        query: queries,
      })
      this.setSearchTerm('')
      this.$emit('search')
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
body {
  background-color: #eee;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
}

.search {
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
  height: 6rem;
}

.search-input {
  text-indent: 25px;
  border-top-left-radius: 0.5rem !important;
  border-bottom-left-radius: 0.5rem !important;
  margin-left: -8px !important;
  height: 4rem;
  font-size: 1.5rem;
}

.search-icon {
  z-index: 100;
  position: absolute;
  font-size: 1.5rem;
  top: 7px;
  padding-right: 5px;
}

.search-clear {
  z-index: 100;
  position: absolute;
  font-size: 1.5rem;
  top: 7px;
  right: 11rem;
  cursor: pointer;
}

.search-button {
  min-width: 10rem;
  height: 100%;
  cursor: pointer;
}
</style>
