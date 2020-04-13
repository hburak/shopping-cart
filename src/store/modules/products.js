import shop from "@/api/shop";

export default {
  state: {
    items: []
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },
    productIsInStock() {
      return product => {
        return product.inventory > 0;
      };
    }
  },
  mutations: {
    setProducts(state, products) {
      state.items = products;
    },
    decrementInventory(state, product) {
      product.inventory--;
    }
  },
  actions: {
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
    }
  }
};
