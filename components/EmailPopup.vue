<template>
  <div v-if="displayMailingListModal">
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
          <ValidationProvider
            v-slot="{ errors, valid, validate }"
            name="Email"
            rules="email"
          >
            <div class="modal-body" @keyup.enter="handleKeySubmit(valid)">
              <p>Subscribe to our newsletter for the latest updates.</p>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Enter your email"
                @input="handleInput(validate)"
                @blur="handleBlur(validate)"
              />
              <span v-if="showError" class="text-danger">{{ errors[0] }}</span>
              <Error v-if="getError" :error="getError" />
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
              <button
                :disabled="!valid || !email"
                type="button"
                class="btn btn-primary"
                @click="handleSubmit"
              >
                Submit
              </button>
            </div>
          </ValidationProvider>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Cookies from 'js-cookie'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      displayMailingListModal: false,
      email: '',
      isVisible: false,
      showError: false,
    }
  },
  computed: {
    ...mapGetters({
      getMailingList: 'user/getMailingList',
      getError: 'user/getError',
    }),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.initPopup()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions({ postMailingList: 'user/postMailingList' }),
    ...mapMutations({ setMailingList: 'user/setMailingList' }),
    handleInput(validate) {
      this.showError = false
      clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => {
        validate().then(() => {
          this.showError = true
        })
      }, 1500)
    },
    handleBlur(validate) {
      validate().then(() => {
        this.showError = true
      })
    },
    initPopup() {
      if (!this.getMailingList.submitted) {
        const cookieDate = Cookies.get('mailingList')
        if (cookieDate) {
          this.setMailingList({
            submitted: true,
            date: cookieDate,
          })
        } else {
          this.displayMailingListModal = true
        }
      }
    },
    handleScroll() {
      if (window.scrollY > 100 && !this.isVisible) {
        this.isVisible = true
        document.body.classList.add('modal-open')
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
    handleKeySubmit(valid) {
      if (valid && this.email) {
        this.handleSubmit()
      }
    },
    async handleSubmit() {
      const date = new Date(Date.now()).toString()
      await this.postMailingList({ email: this.email, date })
        .then(() => {
          Cookies.set('mailingList', date, { expires: 1 })
          this.isVisible = false
        })
        .catch(() => {})
    },
    handleClose() {
      const date = new Date(Date.now()).toString()
      Cookies.set('mailingList', date, { expires: 1 })
      this.setMailingList({
        submitted: true,
        date: new Date(Date.now()).toString(),
      })
      this.isVisible = false
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
  backdrop-filter: blur(4px);
}
.modal-open .modal {
  background-color: rgba(0, 0, 0, 0.5); /* Grey overlay for the background */
}
</style>
