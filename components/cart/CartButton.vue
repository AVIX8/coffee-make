<template>
  <button class="cartBtn" :class="{ inCartBtn: inCart }" @click="buttonClick">
    <h6>{{ inCart ? 'В корзине' : 'Добавить в Корзину' }}</h6>
  </button>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    sku: { type: String, required: true },
    quantity: { type: Number, required: false, default: 1 },
  },
  data() {
    return {}
  },
  computed: {
    key() {
      return this.item._id + '/' + this.sku
    },
    inCart() {
      for (const itemData of this.$store.state.cart.items)
        if (itemData.sku === this.sku) return true
      return false
    },
  },
  watch: {},
  methods: {
    buttonClick() {
      if (this.inCart) this.goToCart()
      else this.addItem()
    },
    addItem() {
      if (this.sku === null) return
      this.$store.dispatch('cart/setItemToCart', {
        item: this.item,
        sku: this.sku,
        quantity: this.quantity,
      })
    },
    goToCart() {
      this.$router.push('/cart')
    },
  },
}
</script>

<style scoped lang="scss">
* {
  transition: all 0.15s;
}
.cartBtn {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 1rem 10%;
  width: 100%;
  background-color: $main-light-color;
  border-radius: 20px;
}
.cartBtn h6 {
  color: white;
}
.cartBtn:hover {
  background-color: $main-color;
}
.cartBtn:hover h6 {
  font-weight: bold;
}
.cartBtn:active {
  box-shadow: inset 3px 2px 0.2rem rgb(2, 87, 82);
}
.inCartBtn {
  border: 2px solid $main-light-color;
  background-color: white;
}
.inCartBtn h6 {
  color: $main-color;
}
.inCartBtn:hover {
  background-color: white;
}
@media screen and (max-width: $mobile) {
}
</style>
