<template lang="">
  <div class="container">
    <div class="search">
      <form @submit.prevent="onSearch">
        <div class="input-group form-group mb-3">
          <i v-show="!keyword" class="bi bi-search search-icon"></i>
          <input
            v-model="keyword"
            class="form-control form-control-lg border-end-0 border search-input"
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
</template>
<script>
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
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
      console.log(this.keyword)
      //   this.$emit('search')
    },
    handleClear() {
      this.keyword = ''
    },
  },
}
</script>
<style lang="scss">
@import '../assets/scss/variables.scss';
body {
  background-color: #eee;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
}

.search-input {
  text-indent: 20px;
  border-top-left-radius: 0.5rem !important;
  border-bottom-left-radius: 0.5rem !important;
  margin-left: -8px !important;
}

.search-icon {
  z-index: 100;
  position: absolute;
  font-size: 1.5rem;
  top: 5px;
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
