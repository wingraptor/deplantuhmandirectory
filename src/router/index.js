import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from '../views/ContactPage.vue'

Vue.use(VueRouter)

  const routes = [
    {
      // Optional Parameter: https://stackoverflow.com/a/49410475
      path: "/category/:category?",
      alias: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
      path: "/contact/:id",
      name: "ContactPage",
      component: ContactPage,
    },
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
