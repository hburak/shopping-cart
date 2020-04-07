import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    },
  },
  mutations: {
    setProducts(state, products) {
      this.state.products = products;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      // make the call
      // run the setProducts mutation
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        shop.getProducts((products) => {
          commit("setProducts", products);
          resolve();
        });
      });
    },
  },
  modules: {},
});
