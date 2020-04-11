<template>
  <div>
    <h2>Cart</h2>
    <ul>
      <li
        v-for="item in cartItems"
        :key="item.id"
      >{{ item.title }} - {{item.price | currency}} - {{ item.quantity }}</li>
    </ul>
    <p>Total cart price: {{ total | currency }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    total() {
      return this.$store.getters.total;
    },
    cartItems() {
      return this.$store.getters.cart;
    }
  }
};
</script>
