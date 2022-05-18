import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import Beers from "../views/Beers.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/beers",
      name: "beers",
      component: Beers,
    }
  ],
});

export default router;
