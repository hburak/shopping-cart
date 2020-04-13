import shop from "@/api/shop";

export default {
  state: {
    cart: [],
    checkoutStatus: null
  },
  getters: {
    cart(state, getters, rootState) {
      return state.cart.map(cartItem => {
        const product = rootState.products.items.find(
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
    }
  },
  mutations: {
    pushToCart(state, product) {
      state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      });
    },
    incrementItemCount(state, item) {
      item.quantity++;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ state, commit, getters }, product) {
      if (getters.productIsInStock(product)) {
        const item = state.cart.find(item => item.id === product.id);
        if (!item) {
          // push to cart
          commit("pushToCart", product);
        } else {
          // increment the count
          commit("incrementItemCount", item);
        }
        //commit
        commit("decrementInventory", product);
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
    }
  }
};
