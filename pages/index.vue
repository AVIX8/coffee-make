<template>
  <div class="mainBox">
    <div class="slider">
      <Slider :slides="slides" />
    </div>
    <div class="bestsellers">
      <h2>ХИТЫ ПРОДАЖ</h2>
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
          title: '01234567890123456789',
          description: `0123456789 0123456789 0123456789 0123456789 0123456789
            0123456789 0123456789 0123456789 0123456789 0123456789 0123456789
            0123456789 0123456789 0123456789 0123456789 0123456789 0123456789`,
          button: '0123456789 0123456789',
          img: '/banner_kofe1.jpg',
          settings: {
            left: true,
          },
        },
        {
          title: 'ЗЕРНОВОЙ КОФЕ СВЕЖЕЙ ОБЖАРКИ С ДОСТАВКОЙ',
          description: `Поможем Вам насладиться вкусным и ароматным кофе свежей обжарки прямо не выходя из офиса. Устройте у себя мини-кофейню. Дегустация кофе - БЕСПЛАТНО!`,
          button: 'Узнать подробнее',
          img: '/banner_kofe1.jpg',
        },
        {
          title: 'ВОЗЬМИТЕ КОФЕМАШИНУ В АРЕНДУ!',
          description: `Она создаст имидж компании и будет выполнять роль делового инструмента. Повысьте эффективность работы сотрудников и лояльность клиентов.`,
          button: 'Узнать подробнее',
          img: '/banner_kofe1.jpg',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.mainBox {
  position: relative;
  /* min-height: 100%;
  width: 100%; */
}
.slider {
  position: relative;

  margin: 2rem 5rem 2rem 5rem;

  border: none;

  filter: drop-shadow(0 0 0.5rem #00241b);
}
.bestsellers {
  /* position: relative; */
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-wrap: wrap;

  margin: 1rem 5rem 1rem 5rem;
}
.bestsellers h2 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-weight: bold;
}
.bestsellers .item {
  position: relative;

  /* background-color: red; */
}

@media screen and (max-width: $mobile) {
  .slider {
    margin: 2rem 0.8rem 2rem 0.8rem;
  }
}
</style>
