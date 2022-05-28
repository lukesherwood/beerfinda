<template>
  <div class="btn-group" role="group">
    <button
      id="btnGroupDrop1"
      type="button"
      class="btn btn-primary dropdown-toggle btn-sm"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Filter by Type
    </button>
    <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <li v-for="type in type_upper" :key="type">
        <a
          @click="handler('type_upper', type)"
          class="dropdown-item"
          href="#"
          >{{ type }}</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Filter",
  methods: {
    handler(filterType, keyword) {
      this.$emit("filter", { filterType, keyword });
    },
  },
  data() {
    return {
      type_upper: [
        "Pale Ales",
        "Lager",
        "India Pale Ales",
        "Belgium Style",
        "Stout",
        "Strong Ales",
        "Brown Ales",
        "Porter",
        "Wheat Beer",
        "Specialty",
        "Hybrid Beer",
        "Dark Lager",
        "Cider",
        "Pilsener",
        "Sour Beer",
        "Belgium-Style Ales",
        "Anglo-American Ales",
        "Stout and Porter",
        "Other Styles",
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.btn-group {
  padding-bottom: 15px;
}
.dropdown-menu {
  height: 200px;
  width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
