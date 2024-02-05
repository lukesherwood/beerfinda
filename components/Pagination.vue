<template>
  <nav>
    <ul class="pagination justify-content-center pagination-lg">
      <!-- Previous Button -->
      <li class="page-item" :class="{ disabled: pages.currentPage - 1 == 0 }">
        <div
          role="button"
          class="page-link"
          @click="handler(pages.currentPage - 1)"
        >
          Prev
        </div>
      </li>
      <!-- Page 1 Button -->
      <li
        v-if="pages.currentPage != 1 && pages.currentPage > 3"
        class="page-item mobile"
      >
        <div role="button" class="page-link mobile" @click="handler(1)">1</div>
      </li>
      <!-- '...' showing gap in range -->
      <li
        v-if="pages.currentPage != 1 && pages.currentPage > 4"
        class="page-item disabled"
      >
        <div role="button" class="page-link">...</div>
      </li>
      <!-- Go back 2 Button -->
      <li v-if="pages.currentPage - 2 > 0" class="page-item mobile">
        <div
          role="button"
          class="page-link"
          @click="handler(pages.currentPage - 2)"
        >
          {{ pages.currentPage - 2 }}
        </div>
      </li>
      <!-- Go back 1 Button -->
      <li v-if="pages.currentPage - 1 > 0" class="page-item mobile">
        <div
          role="button"
          class="page-link"
          @click="handler(pages.currentPage - 1)"
        >
          {{ pages.currentPage - 1 }}
        </div>
      </li>
      <!-- GCurrent Page -->
      <li class="page-item active">
        <div
          role="button"
          class="page-link"
          @click="handler(pages.currentPage)"
        >
          {{ pages.currentPage }}
        </div>
      </li>
      <!-- Go forward 1 Button -->
      <li v-if="pages.currentPage + 1 < pages.totalPages" class="page-item">
        <div
          role="button"
          class="page-link"
          @click="handler(pages.currentPage + 1)"
        >
          {{ pages.currentPage + 1 }}
        </div>
      </li>
      <!-- Go forward 2 Button -->
      <li
        v-if="pages.currentPage + 2 < pages.totalPages"
        class="page-item mobile"
      >
        <div
          role="button"
          class="page-link"
          @click="handler(pages.currentPage + 2)"
        >
          {{ pages.currentPage + 2 }}
        </div>
      </li>
      <!-- '...' showing gap in range -->
      <li
        v-if="
          pages.currentPage != pages.totalPages &&
          pages.currentPage + 2 < pages.totalPages
        "
        class="page-item disabled"
      >
        <div role="button" class="page-link">...</div>
      </li>
      <!-- Last Page Button -->
      <li
        v-if="pages.totalPages && pages.currentPage != pages.totalPages"
        class="page-item"
      >
        <div role="button" class="page-link" @click="handler(pages.totalPages)">
          {{ pages.totalPages }}
        </div>
      </li>
      <!-- Next Button -->
      <li
        class="page-item"
        :class="{
          disabled: pages.currentPage == pages.totalPages || !pages.totalPages,
        }"
      >
        <div
          role="button"
          class="page-link"
          @click="handler(pages.currentPage + 1)"
        >
          Next
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    handler(page) {
      this.$emit('pageChange', page)
    },
  },
}
</script>
<style lang="scss">
@media only screen and (max-width: 400px) {
  .mobile {
    display: none;
  }
}
</style>
