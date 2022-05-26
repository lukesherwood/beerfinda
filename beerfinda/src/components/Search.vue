<template lang="">
  <div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="search">
          <i class="bi bi-search search-icon"></i>
          <i class="fa fa-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Search for beer"
          />
          <button class="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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

.search input {
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
}

.search button {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
