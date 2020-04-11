import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null,
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    },
    cart(state) {
      return state.cart.map((cartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id
        );
        return {
          id: product.id,
          quantity: cartItem.quantity,
          price: product.price,
          title: product.title,
        };
      });
    },
    total(state, getters) {
      return getters.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
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
        price: product.price,
        quantity: 1,
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
        context.commit("decrementInventory", product);
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "fail");
        }
      );
    },
  },
  modules: {},
});
