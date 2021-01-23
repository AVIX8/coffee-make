<template>
  <div class="mainBox">
    <div class="slider">
      <Slider :slides="slides" />
    </div>
    <div class="bestsellers">
      <h2>ХИТЫ ПРОДАЖ</h2>
      <div class="items">
        <ProductCard
          v-for="(bestseller, i) in bestsellers"
          :key="i"
          :product="bestseller"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  computed: {},
  methods: {},
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
.bestsellers .items {
  position: relative;
  /* background-color: red; */
}

.slide {
  position: relative;
  height: 100%;
  box-shadow: inset 0px 0px 20px white;
}
.slideBackground {
  position: initial;
  z-index: 1;
}
.slideInfo {
  position: absolute;
  top: 23%;
  left: 13%;

  padding: 1rem 0 0 2rem;

  min-height: 45%;
  max-height: 60%;
  min-width: 25%;
  max-width: 28%;

  /* background: red; */
  z-index: 2;
}
.title {
  margin: 0 0 1rem 0;

  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  border-bottom: 0.3rem white ridge;
  border-radius: 0;
}
.description {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5rem;

  /* background: blue; */
}
.button {
  margin: 2rem 0;
  padding: 0.5rem 0 0.7rem 0;

  width: 70%;

  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;

  border: 2px #00b9b0 solid;
  border-radius: 20px;
  transition: all 0.3s;

  /* background: yellow; */
}
.button:hover {
  cursor: pointer;
  background-image: linear-gradient(
    to top,
    #009b94,
    #00a9a1,
    #00b7ae,
    #00c5bb,
    #00d3c8
  );
  transition: all 0.3s;
}
.button:active {
  background: steelblue;
}

@media screen and (max-width: $mobile) {
  .slider {
    margin: 2rem 0.8rem 2rem 0.8rem;
  }
  .bestsellers h2 {
    font-size: 1.8rem;
  }
  .bestsellers .items {
    display: grid;
    grid-template-columns: 1fr 1fr;

    margin: 0.5rem 0 3rem 0;

    // background-color: red;
  }
}
</style>
