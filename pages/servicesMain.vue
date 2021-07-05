<template>
  <div class="mainBox">
    <div class="deliveryBox">
      <h1>Доставка</h1>
    </div>
    <div class="repairBox">
      <h1>Ремонт и сервис</h1>
    </div>
    <div class="aboutUsBox">
      <h1>Как мы работаем</h1>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'header&footer',
}
</script>

<style scoped>
.mainBox {
  padding: 1rem 20rem 1rem 20rem;
  background: red;
}
.deliveryBox {
  height: 40rem;
  width: 100%;
  background: aqua;
}
.repairBox {
  height: 20rem;
  width: 100%;
  background: chartreuse;
}
.aboutUsBox {
  height: 15rem;
  width: 100%;
  background: darkorange;
}
</style>
