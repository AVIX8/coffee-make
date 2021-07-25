<template>
  <div class="cartBtn">
    <button @click="addItem"><h6>Добавить в Корзину</h6></button>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    sku: { type: String, required: true },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    addItem() {
      if (this.sku === null) return
      this.$store.commit('cart/addItem', this.item)
    },
  },
}
</script>

<style scoped lang="scss">
.cartBtn {
  display: flex;
  justify-content: center;

  width: 100%;
}
.cartBtn button {
  padding: 1rem 10%;

  background-color: $main-light-color;

  border-radius: 20px;
}
.cartBtn button h6 {
  color: white;
}
.cartBtn button:hover {
  background-color: $main-color;
  transition: all 0.15s;
}
.cartBtn button:hover h6 {
  font-weight: bold;
}
.cartBtn button:active {
  box-shadow: inset 3px 2px 0.2rem rgb(2, 87, 82);
}
@media screen and (max-width: $mobile) {
}
</style>
