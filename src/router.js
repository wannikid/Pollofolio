import Portfolio from "./Portfolio";
import Insights from "./Insights";
import Details from "./Details";
import Form from "./Form.vue";
import Payouts from "./Payouts";
import Performance from "./Performance";
import News from "./News";
import store from "./store.js";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "*",
      name: "assets",
      component: Portfolio,
      props: true,
      beforeEnter: (to, from, next) => {
        store.state.selectedKpiIdx = 0;
        next();
      }
    },
    {
      path: "/assets",
      name: "details",
      components: {
        default: Portfolio,
        drawer: Details
      },
      children: [
        // will be rendered inside Details <router-view>
        {
          path: "/assets/:id",
          name: "show",
          components: {
            news: News,
            performance: Performance,
            payouts: Payouts,
            form: Form
          }
        },
        {
          path: "/assets/add",
          name: "add",
          components: {
            form: Form
          }
        }
      ],
      props: { default: true, drawer: true },
      beforeEnter: (to, from, next) => {
        store.state.drawer = true;
        next();
      }
    },
    {
      path: "/insights",
      name: "insights",
      components: {
        default: Portfolio,
        drawer: Insights
      },
      beforeEnter: (to, from, next) => {
        store.state.drawer = true;
        next();
      }
    }
  ],
  // This will simply make the page scroll to top for all route navigations.
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
