/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Document from "../views/Document.vue";
import Audio from "../views/Audio.vue";
import Video from "../views/Video.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/document",
    name: "Document",
    component: Document
  },
  {
    path: '/audio',
    name: 'Audio',
    component: Audio
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
