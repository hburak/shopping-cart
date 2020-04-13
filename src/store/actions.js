import shop from "@/api/shop.js";

export default {
  fetchProducts({ commit }) {
    // make the call
    // run the setProducts mutation
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      shop.getProducts(products => {
        commit("setProducts", products);
        resolve();
      });
    });
  },
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
};
