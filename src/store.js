import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    combinations: [],
    contracts: [],
    events: []
  },
  mutations: {
    setUsers(state, list) {
      state.users = [...list];
    },
    setCombinations(state, list) {
      state.combinations = [...list];
    },
    setContracts(state, list) {
      state.contracts = [...list];
    },
    setEvents(state, list) {
      state.events = [...list];
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
    },
    async getContracts({ commit }) {
      const res = await axios
        .get(`${config.apiHost}/api/contracts`)
        .then(resp => resp.data);
      commit("setContracts", res);
    },
    async getEvents({ commit }) {
      const res = await axios
        .get(`${config.apiHost}/api/events`)
        .then(resp => resp.data);
      commit("setEvents", res);
    }
  }
});
