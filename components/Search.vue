<template lang="">
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-10">
        <div class="search">
          <form @submit.prevent="onSearch">
            <div class="input-group">
              <b-icon
                v-show="!keyword"
                width="25px"
                class="search-icon"
                icon="search"
              ></b-icon>
              <input
                v-model="keyword"
                class="form-control border-end-0 border search-input"
                type="search"
                placeholder="Search"
              />
              <b-icon
                v-show="keyword"
                width="25px"
                class="search-clear"
                icon="x-circle"
                @click="handleClear"
              ></b-icon>
              <span class="input-group-append">
                <button
                  v-if="loading"
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
export default {
  name: 'Search',
  props: ['loading', 'searchTerm'],
  data() {
    return {
      keyword: this.searchTerm || '',
    }
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
    onSearch() {
      this.$emit('search', this.keyword)
    },
    handleClear() {
      this.keyword = ''
      this.$emit('clear')
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.search {
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
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
  font-size: 1.75rem;
  top: 10px;
  padding-right: 5px;
}

.search-clear {
  z-index: 100;
  position: absolute;
  font-size: 1.75rem;
  top: 10px;
  right: 11rem;
  cursor: pointer;
}

.search-button {
  min-width: 10rem;
  height: 100%;
  cursor: pointer;
}
</style>
