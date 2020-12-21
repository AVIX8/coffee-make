<template>
  <div class="mainBox">
    <div class="slider">
      <Slider :slides="slides" />
    </div>
    <div class="bestsellers">
      <h1>ХИТЫ ПРОДАЖ</h1>
      <div class="item">
        <ParallaxShowcase
          v-for="(bestseller, i) in bestsellers"
          :key="i"
          :product="bestseller"
        />
      </div>
    </div>
  </div>
</template>

<script>
import parallaxShowcase from '../components/parallaxShowcase.vue'
export default {
  components: { parallaxShowcase },
  layout: 'header&footer',
  data() {
    return {
      bestsellers: [
        {
          title: 'FRESH COFFEE AROME',
          price: '1100,00',
          img: '/testCoffee.png',
        },
        {
          title: 'FRESH COFFEE AROME',
          price: '1100,00',
          img: '/testCoffee.png',
        },
        {
          title: `Сироп ARGENTO "ЗЕЛЕНЫЙ БАНАН", 1л`,
          price: '1300,00',
          img: '/сироп зеленый банан.png',
        },
        {
          title: `Помпа для бутылки сиропа, 10 мл`,
          price: '320,00',
          img: '/помпа.png',
        },
        {
          title: 'FRESH COFFEE AROME',
          price: '1100,00',
          img: '/testCoffee.png',
        },
        {
          title: 'FRESH COFFEE AROME',
          price: '1100,00',
          img: '/testCoffee.png',
        },
      ],
      slides: [
        {
          title: 'Slide 1',
          description: '...',
          img: '',
        },
        {
          title: 'Slide 2',
          description: '...',
          img: '',
        },
        {
          title: 'Slide 3',
          description: '...',
          img: '',
        },
        {
          title: 'Slide 4',
          description: '...',
          img: '',
        },
        {
          title: 'Slide 5',
          description: '...',
          img: '',
        },
      ],
    }
  },
}
</script>

<style scoped>
* {
  transition: all 1s;
}
.mainBox {
  position: relative;
  min-height: 100%;
  width: 100%;
}
.slider {
  position: relative;

  /* margin: 1rem 0; */
  /* margin: 2rem 5rem 2rem 5rem; */
  /* padding: 1rem; */
  border: none;
  /* border-radius: 30px; */

  /* background: green; */
}
.bestsellers {
  position: relative;
  display: block;

  margin: 1rem 5rem 1rem 5rem;
}
.bestsellers h1 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
.bestsellers .item {
  position: relative;
  display: flex;
  justify-content: center;

  /* background-color: red; */
}
</style>
