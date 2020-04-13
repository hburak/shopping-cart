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
    <button @click="checkout">Buy items</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      total: "total",
      cartItems: "cart"
    }),
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    })
  },
  methods: {
    ...mapActions({
      checkout: "checkout"
    })
  }
};
</script>
