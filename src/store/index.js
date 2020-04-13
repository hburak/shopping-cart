import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },
    cart(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.id === cartItem.id
        );
        return {
          id: product.id,
          quantity: cartItem.quantity,
          price: product.price,
          title: product.title
        };
      });
    },
    total(state, getters) {
      return getters.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    productIsInStock() {
      return product => {
        return product.inventory > 0;
      };
    }
  },
  mutations: {
    setProducts(state, products) {
      this.state.products = products;
    },
    pushToCart(state, product) {
      this.state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      });
    },
    incrementItemCount(state, item) {
      item.quantity++;
    },
    decrementInventory(state, product) {
      product.inventory--;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    }
  },
  actions,
  modules: {}
});
