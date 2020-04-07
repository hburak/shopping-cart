import Vue from "vue";
import Vuex from "vuex";
// eslint-disable-next-line no-unused-vars
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
  },
  getters: {
    productsCount() {
      return this.state.products.length;
    },
  },
  mutations: {
    setProducts(state, products) {
      this.state.products = products;
    },
  },
  actions: {
    fetchProducts() {
      // make the call
      // run the setProducts mutation
    },
  },
  modules: {},
});
