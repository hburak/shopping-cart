<template>
  <div>
    <p v-if="products.length <= 0">No products available</p>
    <div v-else>
      <h1>Product List</h1>
      <img v-if="loading" src="https://i.gifer.com/7plQ.gif" />
      <ul v-else>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price }} - {{ product.inventory }}
          <button
            @click="addToCart(product)"
          >Add to cart</button>
        </li>
      </ul>
    </div>
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">{{ item.title }} - {{ item.quantity }}</li>
    </ul>
    <p>Total cart price: {{ this.$store.getters.total }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
    cart() {
      return this.$store.getters.cart;
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    }
  },
  created() {
    /* coupling to api removed from the component
        shop.getProducts(products => {
        store.commit("setProducts", products);
    }); */
    this.loading = true;
    setTimeout(() => {
      this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
    }, 500);
  }
};
</script>

<style scoped></style>
