import { createApp } from "vue";
import VueLazyLoad from 'vue3-lazyload'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap"


const app = createApp(App);
app.config.globalProperties.$hostname = 'https://drspgoa.digifern.com/'
app.use(router).use(store).use(VueLazyLoad, {
    loading: '/Loading_icon.gif',
    error: '/index.png',
});
app.mount("#app");
