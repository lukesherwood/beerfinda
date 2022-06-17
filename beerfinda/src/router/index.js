import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Beers from "../views/Beers.vue"
import Beer from "../views/Beer.vue"
import Merchants from "../views/Merchants.vue"
import Brewers from '../views/Brewers.vue'
import Users from '../views/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/beers",
      name: "beers",
      component: Beers,
    },
    {
      path: "/beer/:id",
      name: "beer",
      component: Beer,
    },
    {
      path: "/merchants",
      name: "merchants",
      component: Merchants,
    },
    {
      path: "/brewers",
      name: "brewers",
      component: Brewers,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
  ],
});

export default router;
