<template lang="">
  <div class="container">
    <div class="search">
      <form @submit.prevent="onSearch">
        <div class="input-group form-group mb-3">
          <b-icon
            v-show="!keyword"
            width="25px"
            icon="search"
            class="search-icon"
          ></b-icon>
          <input
            v-model="keyword"
            class="form-control form-control-lg border-end-0 border search-input"
            type="search"
            placeholder="Search for beer"
          />
          <b-icon
            v-show="keyword"
            icon="x-circle"
            class="search-clear"
            width="25px"
            @click="handleClear"
          ></b-icon>
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
    <form v-if="getBeerResults.length" @submit.prevent="submitHandler">
      <ul
        aria-labelledby="filterButton"
        class="dropdown-menu beer-select"
        :class="{ show: getBeerResults.length && keyword }"
      >
        <li v-for="beer in getBeerResults" :key="beer.id">
          <div class="dropdown-item">
            <label class="w-100">
              <h6>{{ beer.name }}</h6>
              {{ beer.brewer_name }}
              <input
                :id="beer.beer_id"
                v-model="beersSelected"
                class="float-end"
                type="checkbox"
                :value="beer.beer_id"
              />
            </label>
          </div>
        </li>
      </ul>
      <ul v-if="beersSelected.length">
        <li v-for="beer in beersSelected" :key="beer.id">
          {{ beer }}
        </li>
      </ul>
      <input type="submit" value="Save" class="btn btn-primary" />
    </form>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RegisterBeerSearch',
  data() {
    return {
      keyword: '',
      beersSelected: [],
    }
  },
  fetch() {
    this.debounceSearch = debounce(this.onSearch, 1000)
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading', // this doesn't work yet
      getBeerResults: 'user/getBeerResults',
    }),
  },
  watch: {
    keyword() {
      if (!this.keyword) return
      this.debounceSearch()
    },
  },
  methods: {
    ...mapActions({ fetchBeerResults: 'user/fetchBeerResults' }),
    onSearch() {
      console.log(this.keyword)
      this.fetchBeerResults({ keyword: this.keyword })
    },
    handleClear() {
      this.keyword = ''
    },
    submitHandler() {
      this.$emit('beersSave', this.beersSelected)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

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

.beer-select {
  max-height: 300px;
  overflow: scroll;
}
</style>
