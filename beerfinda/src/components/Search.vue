<template lang="">
  <div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="search">
          <i v-show="!keyword" class="bi bi-search search-icon"></i>
          <form @submit.prevent="onSearch">
            <input
              v-model="keyword"
              type="text"
              class="form-control search-input"
              placeholder="Search for beer"
            />
            <button
              disabled
              v-if="isLoading"
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Search",
  computed: {
    ...mapGetters({
      isLoading: "isLoading",
      getFilters: "getFilters",
    }),
    keyword: {
      get() {
        return this.getFilters.searchTerm;
      },
      set(value) {
        this.setSearchTerm(value);
      },
    },
  },
  watch: {
    searchTerm() {
      if (!keyword) return;
      this.debounceSearch();
    },
  },
  methods: {
    ...mapMutations(["setSearchTerm"]),
    onSearchSubmit() {
      this.$emit("search");
    },
    onSearch() {
      this.$emit("search");
    },
  },
  created() {
    this.debounceSearch = debounce(this.onSearch, 1000);
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/variables.scss";
body {
  background-color: #eee;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.height {
  height: 10vh;
}

.search {
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
}

.search-input {
  padding: 0px;
  height: 38px;
  text-indent: 25px;
  border: 2px solid #d6d4d4;
}

.search input:focus {
  box-shadow: none;
  border: 2px solid $primary;
}

.search .search-icon {
  position: absolute;
  top: 7px;
  left: 8px;
  padding-right: 5px;
}

.search-button {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 10rem;
}
</style>
