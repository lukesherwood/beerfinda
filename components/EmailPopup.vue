<template>
  <div>
    <!-- Modal -->
    <div
      id="exampleModal"
      class="modal fade"
      :class="{ show: isVisible }"
      :style="{
        display: isVisible ? 'block' : 'none',
        backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      }"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">Welcome!</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="handleClose"
            ></button>
          </div>
          <div class="modal-body">
            <p>Subscribe to our newsletter for the latest updates.</p>
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="handleClose"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="handleSubmit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      email: '',
      isVisible: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions({ postMailingList: 'user/postMailingList' }),
    handleScroll() {
      if (window.scrollY > 100 && !this.isVisible) {
        this.isVisible = true
        document.body.classList.add('modal-open')
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
    async handleSubmit() {
      await this.postMailingList(this.email)
        .then(() => {
          this.isVisible = false
        })
        .catch(() => {})
    },
    handleClose() {
      this.isVisible = false
      document.body.classList.remove('modal-open')
    },
  },
}
</script>

<style scoped>
.modal.fade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1050;
  backdrop-filter: blur(4px); /* Optional for a blur effect */
}
.modal-open .modal {
  background-color: rgba(0, 0, 0, 0.5); /* Grey overlay for the background */
}
</style>
