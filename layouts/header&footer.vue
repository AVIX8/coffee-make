<template>
  <div class="mainBox">
    <div class="HEADER">
      <div class="Cover"></div>
      <div class="Categories">
        <nuxt-link to="/" exact-active-class="test"> Кофе </nuxt-link>
        <nuxt-link to="/" exact-active-class="test">
          Аренда кофемашин
        </nuxt-link>
        <nuxt-link to="/" exact-active-class="test"> Сиропы </nuxt-link>
        <nuxt-link to="/" exact-active-class="test"> Аксессуары </nuxt-link>
      </div>
    </div>
    <!-- index --><nuxt />
    <div class="FOOTER">d</div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.mainBox {
  position: relative;
}
.HEADER {
  position: relative;
  background-color: red;
}
.FOOTER {
  position: relative;
  background-color: gray;
}
.Cover {
  height: 100px;
  background-color: #272523;
}
.Categories {
  height: 40px;
  background-color: #27b4b3;
}
.test {
  color: white;
  font-size: 1vw;
  font-family: Ubuntu;
}
</style>
