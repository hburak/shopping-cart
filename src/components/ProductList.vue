<template>
  <div>
    <p v-if="products.length <= 0">No products available</p>
    <div v-else>
      <h1>Product List</h1>
      <img v-if="loading" src="https://i.gifer.com/7plQ.gif" />
      <ul v-else>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
          <button
            :disabled="!productIsInStock(product)"
            @click="addToCart(product)"
          >Add to cart</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      products: state => state.products.items
    }),
    ...mapGetters({
      productIsInStock: "productIsInStock"
    })
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions({
      addToCart: "addToCart",
      fetchProducts: "fetchProducts"
    })
  },
  created() {
    /* coupling to api removed from the component
        shop.getProducts(products => {
        store.commit("setProducts", products);
    }); */
    this.loading = true;
    setTimeout(() => {
      this.fetchProducts().then(() => (this.loading = false));
    }, 500);
  }
};
</script>

<style scoped></style>
