import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap"


const app = createApp(App);
app.config.globalProperties.$hostname = 'https://drspgoa.digifern.com/'
app.use(router).use(store);
app.mount("#app");
