import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import config from '@/config/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, list) {
      state.users = [...list];
    }
  },
  actions: {
    async getUsers({ commit }) {
      const res = await axios.get(`${config.apiHost}/api/employees`).then(resp => resp.data);
      commit('setUsers', res);
    },
  }
});
