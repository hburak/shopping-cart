<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.gifer.com/7plQ.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">{{ product.title }} - {{ product.price }}</li>
    </ul>
  </div>
</template>

<script>
import store from "@/store/index";
export default {
  computed: {
    products() {
      return store.getters.availableProducts;
    }
  },
  data() {
    return {
      loading: false
    };
  },
  created() {
    /* coupling to api removed from the component
        shop.getProducts(products => {
        store.commit("setProducts", products);
    }); */
    this.loading = true;
    setTimeout(() => {
      store.dispatch("fetchProducts").then(() => (this.loading = false));
    }, 500);
  }
};
</script>

<style scoped></style>
