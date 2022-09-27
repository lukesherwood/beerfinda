<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.currentPage - 1 == 0 }">
        <a class="page-link" href="#" @click="handler(pages.currentPage - 1)"
          >Previous</a
        >
      </li>
      <li
        v-if="pages.currentPage != 1 && pages.currentPage > 3"
        class="page-item"
      >
        <a class="page-link" href="#" @click="handler(1)">1</a>
      </li>
      <li
        v-if="pages.currentPage != 1 && pages.currentPage > 3"
        class="page-item disabled"
      >
        <a class="page-link" href="#"> ... </a>
      </li>
      <li v-if="pages.currentPage - 2 > 0" class="page-item">
        <a class="page-link" href="#" @click="handler(pages.currentPage - 2)">{{
          pages.currentPage - 2
        }}</a>
      </li>
      <li v-if="pages.currentPage - 1 > 0" class="page-item">
        <a class="page-link" href="#" @click="handler(pages.currentPage - 1)">{{
          pages.currentPage - 1
        }}</a>
      </li>
      <li class="page-item active">
        <a
          class="page-link disabled"
          href="#"
          @click="handler(pages.currentPage)"
          >{{ pages.currentPage }}</a
        >
      </li>
      <li v-if="pages.currentPage + 1 < pages.totalPages" class="page-item">
        <a class="page-link" href="#" @click="handler(pages.currentPage + 1)">{{
          pages.currentPage + 1
        }}</a>
      </li>
      <li v-if="pages.currentPage + 2 < pages.totalPages" class="page-item">
        <a class="page-link" href="#" @click="handler(pages.currentPage + 2)">{{
          pages.currentPage + 2
        }}</a>
      </li>
      <li
        v-if="
          pages.currentPage != pages.totalPages &&
          pages.currentPage + 3 < pages.totalPages
        "
        class="page-item disabled"
      >
        <a class="page-link" href="#"> ... </a>
      </li>
      <li v-if="pages.currentPage != pages.totalPages" class="page-item">
        <a class="page-link" href="#" @click="handler(pages.totalPages)">{{
          pages.totalPages
        }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pages.currentPage == pages.totalPages }"
      >
        <a class="page-link" href="#" @click="handler(pages.currentPage + 1)"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Pagination',
  // eslint-disable-next-line vue/require-prop-types
  props: ['pages'],
  methods: {
    ...mapMutations(['setCurrentPage']),
    handler(page) {
      this.setCurrentPage(page)
      this.$emit('pageChange')
    },
  },
}
</script>
<style lang="scss"></style>
