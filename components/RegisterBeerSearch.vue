<template lang="">
  <div class="search">
    <form @submit.prevent="onSearch">
      <div class="input-group form-group">
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
    <form @submit.prevent="submitHandler">
      <ul
        v-if="getBeerResults.length"
        aria-labelledby="filterButton"
        class="dropdown-menu beer-select"
        :class="{ show: keyword && getBeerResults.length && !dropdownClosed }"
      >
        <li v-for="beer in getBeerResults" :key="beer.beer_id">
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
      <div v-if="beersSelected.length" class="pt-3">
        <h6>
          Beers Selected:
          {{ beersSelected.length }}
          <input
            v-if="beersSelected"
            type="submit"
            :value="saved && saved == beersSelected ? 'Saved' : 'Save'"
            class="float-end"
            :class="
              saved && saved == beersSelected
                ? 'btn btn-success'
                : 'btn btn-primary'
            "
            :disabled="saved && saved == beersSelected"
          />
        </h6>
      </div>
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
      saved: false,
      dropdownClosed: false,
    }
  },
  fetch() {
    this.debounceSearch = debounce(this.onSearch, 1000)
  },
  computed: {
    ...mapGetters({
      isLoading: 'user/isLoading',
      getBeerResults: 'user/getBeerResults',
    }),
  },
  watch: {
    keyword() {
      this.dropdownClosed = false
      if (!this.keyword) return
      this.debounceSearch()
    },
  },
  mounted() {
    document.addEventListener('click', this.close)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    ...mapActions({ fetchBeerResults: 'user/fetchBeerResults' }),
    onSearch() {
      this.fetchBeerResults({ keyword: this.keyword })
    },
    handleClear() {
      this.keyword = ''
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdownClosed = true
      }
    },
    submitHandler() {
      this.saved = this.beersSelected
      this.$emit('beersSave', this.beersSelected)
    },
  },
}
</script>
<style lang="scss" scoped>

.search-input {
  text-indent: 20px;
  border-top-left-radius: 0.5rem !important;
  border-bottom-left-radius: 0.5rem !important;
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
  margin-left: -10px;
  min-width: 340px;
}
</style>
