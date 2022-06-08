<template lang="">
  <div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
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
                @click="handleClear"
                v-show="keyword"
                class="bi bi-x-circle search-clear"
              ></i>
              <span class="input-group-append">
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
              </span>
            </div>
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
    keyword() {
      if (!this.keyword) return;
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
    handleClear() {
      this.setSearchTerm("");
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
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
}

.search-input {
  border-radius: 15px 0px 0 15px;
  padding: 0px;
  height: 38px;
  text-indent: 40px;
  border: 2px solid #d6d4d4;
}

.search input:focus {
  box-shadow: none;
  border: 2px solid $primary;
}

.search-icon {
  z-index: 100;
  position: absolute;
  top: 7px;
  left: 8px;
  padding-right: 5px;
}

.search-clear {
  z-index: 100;
  position: absolute;
  top: 7px;
  right: 180px;
  cursor: pointer;
}

.search-button {
  border-radius: 0px 15px 15 0px;
  min-width: 10rem;
}
</style>
