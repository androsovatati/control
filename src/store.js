import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "@/config/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    combinations: []
  },
  mutations: {
    setUsers(state, list) {
      state.users = [...list];
    },
    setCombinations(state, list) {
      state.combinations = [...list];
    }
  },
  actions: {
    async getUsers({ commit }) {
      const res = await axios
        .get(`${config.apiHost}/api/users`)
        .then(resp => resp.data);
      commit("setUsers", res);
    },
    async getCombinations({ commit }) {
      const res = await axios
        .get(`${config.apiHost}/api/combinations`)
        .then(resp => resp.data);
      commit("setCombinations", res);
    }
  }
});
