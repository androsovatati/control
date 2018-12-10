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
  getters: {
    contracts: (state) => {
      if (!state.combinations.length || !state.users.length) {
        return [];
      }
      const contracts = [];
      state.combinations.forEach((c) => {
        const res = c.contracts.map(r => ({
          ...r,
          ...c.user
        }));
        contracts.push(...res);
      });
      return contracts.sort((a, b) => a.isFinished);
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
