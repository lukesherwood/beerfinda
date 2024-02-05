<template lang="">
  <div class="search">
    <Search
      :loading="isLoading"
      :search-term="keyword"
      @search="onSearch"
      @clear="handleClear"
    />
    <form @submit.prevent="submitHandler">
      <ul
        v-if="getBeerResults?.length"
        aria-labelledby="filterButton"
        class="dropdown-menu beer-select"
        :class="{ show: keyword && getBeerResults?.length && !dropdownClosed }"
      >
        <li
          v-for="beer in getBeerResults"
          :key="'register-beer' + beer.beer_id"
        >
          <div
            class="dropdown-item"
            :class="{ highlight: beersSelected.includes(beer.beer_id) }"
          >
            <label class="w-100 pointer text-truncate" style="max-width: 300px">
              <h6 class="text-truncate">{{ beer.name }}</h6>
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
      <div v-if="beersSelected?.length" class="pt-3">
        <div v-for="beer in beersSelectedInfo" :key="beer.beer_id">
          <div
            v-if="beersSelected.includes(beer.beer_id)"
            class="badge rounded-pill text-bg-light"
          >
            <span class="text-truncate d-inline-block" style="max-width: 200px">
              {{ beer.name }} - <em>{{ beer.brewer_name }}</em>
            </span>
            <b-icon
              class="clear-beer"
              icon="x-circle"
              @click="clearBeer(beer.beer_id)"
            ></b-icon>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RegisterBeerSearch',
  props: ['beersLike'],
  data() {
    return {
      keyword: '',
      beersSelected: this.beersLike || [],
      dropdownClosed: false,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'user/isLoading',
      getBeerResults: 'user/getBeerResults',
      beersSelectedInfo: 'user/beersSelectedInfo',
    }),
  },
  watch: {
    beersSelected() {
      this.updateBeerInfo()
      this.submitHandler()
    },
  },
  mounted() {
    document.addEventListener('click', this.close)
    this.updateBeerInfo()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    ...mapActions({
      fetchBeerResults: 'user/fetchBeerResults',
      fetchBeerInfo: 'user/fetchBeerInfo',
    }),
    onSearch(searchTerm) {
      this.dropdownClosed = true
      this.keyword = searchTerm
      this.fetchBeerResults({ keyword: this.keyword }).then(() => {
        this.dropdownClosed = false
      })
    },
    handleClear() {
      this.keyword = ''
    },
    clearBeer(beerId) {
      // remove beer from beersSelected
      this.beersSelected = this.beersSelected.filter((beer) => beer !== beerId)
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdownClosed = true
      }
    },
    submitHandler() {
      this.$emit('beersSave', this.beersSelected)
    },
    updateBeerInfo() {
      if (this.beersSelected?.length > 0) {
        this.beersSelected.forEach((beerId) => {
          this.fetchBeerInfo(beerId)
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.highlight {
  background-color: $warning;
  border: 1px solid $secondary;
}
input[type='checkbox'] {
  display: none;
}

.search-clear {
  cursor: pointer;
}
.clear-beer {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 1rem;
  cursor: pointer;
  color: $danger;
}

.search-button {
  min-width: 3rem;
  height: 100%;
  cursor: pointer;
}

.beer-select {
  position: relative;
  margin-top: -20px;
  max-height: 300px;
  overflow: scroll;
  min-width: 340px;
}
.pointer {
  cursor: pointer;
}
</style>
