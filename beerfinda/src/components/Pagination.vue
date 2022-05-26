<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" v-if="pages.currentPage != 1">
        <a class="page-link" href="#" @click="handler(1)">First</a>
      </li>
      <li class="page-item" :class="{ disabled: pages.currentPage - 1 == 0 }">
        <a class="page-link" href="#" @click="handler(pages.currentPage - 1)"
          >Previous</a
        >
      </li>
      <li class="page-item" v-if="pages.currentPage - 2 > 0">
        <a class="page-link" @click="handler(pages.currentPage - 2)" href="#">{{
          pages.currentPage - 2
        }}</a>
      </li>

      <li class="page-item" v-if="pages.currentPage - 1 > 0">
        <a class="page-link" @click="handler(pages.currentPage - 1)" href="#">{{
          pages.currentPage - 1
        }}</a>
      </li>
      <li class="page-item active">
        <a class="page-link" @click="handler(pages.currentPage)" href="#">{{
          pages.currentPage
        }}</a>
      </li>
      <li class="page-item" v-if="pages.currentPage + 1 < pages.totalPages">
        <a class="page-link" @click="handler(pages.currentPage + 1)" href="#">{{
          pages.currentPage + 1
        }}</a>
      </li>
      <li class="page-item" v-if="pages.currentPage + 2 < pages.totalPages">
        <a class="page-link" @click="handler(pages.currentPage + 2)" href="#">{{
          pages.currentPage + 2
        }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="handler(pages.currentPage + 1)" href="#"
          >Next</a
        >
      </li>
      <li class="page-item" v-if="pages.currentPage != pages.totalPages">
        <a class="page-link" href="#" @click="handler(pages.totalPages)"
          >Last</a
        >
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Pagination",
  props: ["pages"],
  methods: {
    handler(page) {
      this.$emit("pageChange", page);
    },
  },
};
</script>
<style lang="scss"></style>
