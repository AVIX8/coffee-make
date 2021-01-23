<template>
  <div class="catalog">
    <div v-for="(category, index) in categories" :key="index" class="container">
      <div class="card">
        <div class="visual">
          <div class="circle" />
          <img ref="img" :src="category.img" :alt="category.title" />
        </div>

        <div class="info">
          <h5 ref="title" class="title">{{ category.title }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'header&footer',
  data() {
    return {
      categories: [
        {
          title: 'Кофе',
          img: 'testCoffee.png',
          to: '/products',
        },
        {
          title: 'Сиропы',
          img: 'сироп зеленый банан.png',
          to: '/products',
        },
        {
          title: 'Аренда',
          img: 'сироп зеленый банан.png',
          to: '/products',
        },
        {
          title: 'Аксессуары',
          img: 'testCoffee.png',
          to: '/products',
        },
        {
          title: 'Услуги',
          img: 'testCoffee.png',
          to: '/products',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
@font-face {
}
@media screen and (max-width: $laptop) {
}
@media screen and (max-width: $mobile) {
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.5s;
}
.catalog {
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding: 0 2% 0 2%;
  margin: -1rem 0 4rem 0;

  // background: red;
}
.container {
  display: flex;
  justify-content: center;
}
.card {
  transform-style: preserve-3d;

  margin: 5%;
  padding: 5%;

  width: 100%;

  border-radius: 10%;
  box-shadow: 0 0 1rem 0.1rem lightgray;
  transition: all 0.1s ease;
  background: white;
}

.visual {
  display: flex;
  align-items: center;
  justify-content: center;

  // background: blue;
}
.visual img {
  width: 100%;
  z-index: 2;
  transition: all 0.75s ease-out;
}
.circle {
  // width: 9rem;
  // height: 9rem;
  width: 75%;
  height: 57%;
  background-image: radial-gradient(
    circle,
    #00e188,
    #00b9b0,
    #008ba9,
    #435f79,
    #3d3d3d
  );
  position: absolute;
  border-radius: 100%;
  z-index: 1;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.5rem 0 0 0;

  min-height: 2.5rem;

  color: #2db6b5;
  font-family: 'Ruda';
  font-weight: bold;
  text-align: center;

  transition: all 0.75s ease-out;
}
</style>
