<template>
  <div class="container">
    <form @submit.prevent="onSearch">
      <div class="input-group input-group-lg mb-3">
        <span class="input-group-text bg-white">
          <b-icon icon="search"></b-icon>
        </span>
        <input
          v-model="keyword"
          class="form-control"
          type="search"
          placeholder="Search"
        />
        <span v-show="keyword" class="input-group-text bg-white">
          <b-icon
            width="25px"
            class="search-clear"
            icon="x-circle"
            @click="handleClear"
          ></b-icon>
        </span>
        <button
          v-if="loading"
          disabled
          type="submit"
          class="btn btn-secondary btn-lg search-button"
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
          class="btn btn-secondary search-button"
        />
      </div>
    </form>
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
.search-clear {
  cursor: pointer;
}
.container {
  padding: 0px;
  max-width: 600px;
}
</style>
