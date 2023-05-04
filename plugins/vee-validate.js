import {
  extend,
  localize,
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import Vue from 'vue'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'

const dictionary = {
  en: {
    messages: {
      required: () => '* Required',
      min: () => 'Must be more than 6 characters',
      confirmed: () => 'Please confirm that passwords match',
    },
  },
}

// Install required rule.
extend('required', required)

// Install email rule.
extend('email', email)

extend('min', min)

extend('confirmed', confirmed)

localize(dictionary)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
