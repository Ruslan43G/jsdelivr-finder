import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topPackages: [],
    foundPackage: null,
  },
  mutations: {
    setTopPackages: (state, data) => {
      state.topPackages = data;
    },
    setFoundPackage: (state, data) => {
      state.foundPackage = data;
    },
  },
  actions: {
    loadPackages: ({ commit }, data) => {
      commit('setTopPackages', data);
    },
    loadFoundedPackage: ({ commit }, data) => {
      commit('setFoundPackage', data);
    },
  },
  getters: {
    getAllPackages: (state) => state.topPackages,
    findPackage: (state) => (name) => state
      .topPackages
      .filter((item) => item.name.toLowerCase().includes(name.toLowerCase())),
    getSearchResult: (state) => state.foundPackage,
  },
});
