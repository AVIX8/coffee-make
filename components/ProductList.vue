<template>
  <div id="catalog-box">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="card-card"
      @click="$emit('openProduct', item)"
    >
      <Card :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selected: { type: Object, required: true },
  },
  data() {
    return {
      items: [],
    }
  },
  computed: {},
  watch: {
    selected: {
      deep: true,
      handler() {
        this.update()
      },
    },
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      // Получение товаров
      this.$store
        .dispatch('api/getProducts', {
          category: '/Кофе',
          characteristics: JSON.parse(JSON.stringify(this.selected)),
        })
        .then((res) => {
          // this.products
          // console.log('Товары:', res)
          this.items = res
        })
    },
  },
}
</script>

<style scoped lang="scss">
#catalog-box {
  // overflow: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  // height: 100rem;
  // width: 100%;
  // background: forestgreen;
}
.card-card {
  margin: 2rem;
}
.card-card:last-child {
  // margin-bottom: 4rem;
}
#paginationBox {
  height: 10%;
  width: 100%;
  background: brown;
}
@media screen and (max-width: $mobile) {
  .card-card {
    margin: 0rem;
  }
}
</style>
