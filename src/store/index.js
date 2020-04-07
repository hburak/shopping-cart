import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    total: 0,
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    },
    cart(state) {
      return state.cart;
    },
    total(state) {
      return state.total;
    },
  },
  mutations: {
    setProducts(state, products) {
      this.state.products = products;
    },
    pushToCart(state, product) {
      this.state.cart.push({
        id: product.id,
        title: product.title,
        quantity: 1,
      });
    },
    incrementItemCount(state, item) {
      item.quantity++;
    },
    decrementInventory(state, product) {
      product.inventory--;
    },
    incrementTotal(state, productPrice) {
      this.state.total += productPrice;
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
    addToCart(context, product) {
      if (product.inventory > 0) {
        const item = context.state.cart.find((item) => item.id === product.id);
        if (!item) {
          // push to cart
          context.commit("pushToCart", product);
        } else {
          // increment the count
          context.commit("incrementItemCount", item);
        }
        //commit
        context.commit("incrementTotal", product.price);
        context.commit("decrementInventory", product);
      }
    },
  },
  modules: {},
});
