<template>
  <div id="catalogBox">
    <div id="path"></div>
    <div class="content">
      <div class="filtres"><Filtres /></div>
      <ProductList style="grid-column: 2" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'leftLayout',
  data() {
    return {}
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    // this.$store.dispatch('api/getCategories', '').then((res) => {
    //   console.log(res)
    // })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {},
}
</script>

<style scoped lang="scss">
#catalogBox {
  position: relative;
  display: flex;
}
.content {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 0 15rem 5rem 15rem;
  cursor: default;
  height: 100%;
  background: white;
}
.filtres {
  position: relative;
  margin: 10% 0;
  width: 100%;
  background: greenyellow;
}
</style>
