<template lang="">
  <div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="search">
          <i v-show="!searchTerm" class="bi bi-search search-icon"></i>
          <form ref="searchTerm" @submit.prevent="onSearch">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control search-input"
              placeholder="Search for beer"
            />
            <input
              type="submit"
              value="Search"
              class="btn btn-primary search-button"
            />
          </form>
        </div>
      </div>
    </div>
    <h6 v-if="searchTerm && searchDone">Results for '{{ searchTerm }}'</h6>
  </div>
</template>
<script>
export default {
  name: "Search",
  props: ["searchDone"],
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    onSearch(e) {
      this.$emit("search", this.searchTerm);
      this.$refs.searchTerm.reset();
    },
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
}
</style>
