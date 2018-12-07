import Vue from "vue";
import Router from "vue-router";
import Events from "./views/Events.vue";
import Contracts from "./views/Contracts.vue";
import EmployeesMap from "./views/Map.vue";
import Statistic from "./views/Statistic.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "events",
      component: Events
    },
    {
      path: "/contracts",
      name: "contracts",
      component: Contracts
    },
    {
      path: "/map",
      name: "map",
      component: EmployeesMap
    },
    {
      path: "/statistic",
      name: "statistic",
      component: Statistic
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
