<template>
  <div class="mainBox">
    <div class="previewBox">
      <hooper
        v-if="$device.isDesktop"
        :style="{
          height: [hooperHeight] + 'rem',
          width: [hooperWidth] + 'rem',
        }"
        :infinite-scroll="true"
        :mouse-drag="false"
        :wheel-control="false"
        :auto-play="true"
        :play-speed="6000"
        :transition="1000"
        :items-to-show="1"
        :center-mode="true"
      >
        <slide v-for="(img, index) in item.imgs" :key="index">
          <div class="container">
            <div class="circle">
              <img :src="img" class="itemImg" />
              <!-- <v-img :src="img" class="itemImg" /> -->
            </div>
          </div>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </div>

    <div class="infoBox">
      <div>
        <div class="title">
          <h1>{{ item.name }}</h1>
        </div>
        <div class="priceBox">
          <transition name="priceFade">
            <div v-if="quantity.value > 1" class="calc">
              <h6>{{ choiceProperty.price }} &times; {{ quantity.value }} =</h6>
            </div>
          </transition>
          <div ref="price" class="price">
            <h2>{{ cost }} руб</h2>
          </div>
        </div>
        <div class="controlBox">
          <div class="property">
            <h4>{{ item.choiceProperty.name }}</h4>
            <div class="choice">
              <ChoiceOptions
                :options="item.choiceProperty"
                @changeOption="changeOption($event)"
              ></ChoiceOptions>
            </div>
          </div>
          <div class="quantity">
            <h4>Количество</h4>
            <div class="choice">
              <InputOptions
                :option="quantity"
                @inputOption="inputOption($event)"
              ></InputOptions>
            </div>
          </div>
          <div class="specificationsBox"></div>
        </div>
        <div class="cartBtn">
          <button><h6>Добавить в Корзину</h6></button>
        </div>
      </div>
    </div>
    <div v-if="item.desc" class="descriptionBox">
      <h3>Описание</h3>
      <h5>{{ item.desc }}</h5>
    </div>
    <div class="recentlyViewedBox">
      <h2>Вы недавно смотрели</h2>
    </div>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
} from 'hooper'
// import '~/assets/hooperSlug.css'
// require('~/assets/hooperSlug.css')

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
  },
  layout: 'header&footer',
  data() {
    return {
      choiceProperty: {
        price: 0,
        option: 0,
      },
      quantity: {
        value: 1,
        minValue: 1,
        maxValue: 9999,
      },
      hooperHeight: 34,
      hooperWidth: 28,
      item: {
        _id: '054VA72303012P',
        desc:
          "Give your dressy look a lift with these women's Kate high-heel shoes by Metaphor. These playful peep-toe pumps feature satin-wrapped stiletto heels and chiffon pompoms at the toes. Rhinestones on each of the silvertone buckles add just a touch of sparkle to these shoes for a flirty footwear look that's made for your next night out.",
        name: `Сироп ARGENTO "ЗЕЛЕНЫЙ БАНАН", 1л`,
        category: '/кофе/моносорта',
        brand: 'Argento',
        imgs: [
          '/сироп зеленый банан.png',
          '/красные стаканы 2.jpg',
          '/testCoffee.png',
        ],

        properties: {
          кислотность: {
            maxValue: 5,
            value: 3,
          },
          плотность: {
            maxValue: 5,
            value: 2,
          },
        },

        choiceProperty: {
          name: 'Масса (гр)',
          variants: [
            {
              price: 260.0,
              option: 250,
            },
            {
              price: 940.0,
              option: 1000,
            },
            {
              price: 1600.0,
              option: 2000,
            },
          ],
        },
      },
    }
  },
  computed: {
    cost() {
      return this.choiceProperty.price * this.quantity.value
    },
  },
  watch: {
    quantity(newValue) {
      this.$refs.price.style.transition = 'all 2s'
      if (newValue.value !== 1)
        this.$refs.price.style.transform = 'translateY(-50px)'
      else this.$refs.price.style.transform = 'translateY(-150px)'
    },
  },
  created() {
    require('~/assets/hooperSlug.css')
    this.choiceProperty = this.item.choiceProperty.variants[0]
  },
  methods: {
    changeOption(option) {
      this.item.choiceProperty.variants.forEach((variant) => {
        if (variant.option === option) {
          this.choiceProperty = variant
          return 0
        }
      })
    },
    inputOption(option) {
      this.quantity.value = option
    },
  },
}
</script>
<style scoped lang="scss">
.mainBox {
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin: 1rem 0;
}
.previewBox {
  display: flex;
  align-items: center;
  justify-content: center;

  grid-column: 1;

  padding: 1rem 1rem 1rem 40%;

  height: 36rem;
  width: 100%;

  // background: red;
}
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  background: white;
}
.circle {
  width: 20rem;
  height: 20rem;
  background-image: radial-gradient(
    circle,
    #00e188,
    #00b9b0,
    #008ba9,
    #435f79,
    #3d3d3d
  );
  border-radius: 50%;
  z-index: 1;
}
.itemImg {
  // position: absolute;
  height: 150%;
  width: 150%;
  transform: translate(-16%, -18%);
}
.infoBox {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-column: 2;

  padding: 1rem 40% 1rem 0;
  margin: 0 40% 0 0;

  height: 36rem;
  width: 100%;

  // background: blue;
}
.title {
  margin: 1rem 0 1rem 0;
  width: 100%;
  // background: coral;
}

.priceBox {
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;
  position: relative;

  margin: 1rem 1rem 2rem 1rem;

  height: 4rem;
  width: 100%;

  // background: palegreen;
}
.calc {
  position: absolute;
  height: 35%;
  width: 100%;
  // background: brown;
}
.priceFade-enter-active,
.priceFade-leave-active {
  transition: all 1s;
}
.priceFade-enter {
  transform: translateY(-1rem);
  opacity: 0;
}
.priceFade-leave-to {
  transform: translateY(-1rem);
  opacity: 0;
}
.price {
  position: absolute;
  top: 35%;

  height: 65%;
  width: 100%;

  // background: cyan;
  transition: all 1s;
}

.property {
  display: flex;
  margin: 0.5rem 1rem 0.5rem 0;
  width: 100%;
  // background: springgreen;
}
.choice {
  position: absolute;
  left: 25%;
}
.quantity {
  display: flex;
  margin: 0.5rem 1rem 0.5rem 0;
  width: 100%;
  // background: wheat;
}
.specificationsBox {
  grid-column: 1 / span 2;
  width: 100%;
  // background: yellow;
}
.cartBtn {
  display: flex;
  justify-content: center;

  padding: 2rem 20% 2rem 0;

  width: 100%;

  // background: orange;
}
.cartBtn button {
  height: 4rem;
  width: 100%;

  background-image: linear-gradient(
    to left top,
    #1d816f,
    #0c9b7e,
    #00b58c,
    #00d097,
    #12eba0
  );
  // background-image: linear-gradient(
  //   to left bottom,
  //   #1d816f,
  //   #0c9b7e,
  //   #00b58c,
  //   #00d097,
  //   #12eba0
  // );

  border-radius: 20px;
}
.cartBtn button h6 {
  color: white;
  font-weight: bold;
}
.cartBtn button:hover {
  background-image: linear-gradient(
    to left bottom,
    #1d816f,
    #0c9b7e,
    #00b58c,
    #00d097,
    #12eba0
  );
  background-image: linear-gradient(
    to left top,
    #1d816f,
    #0c9b7e,
    #00b58c,
    #00d097,
    #12eba0
  );
  box-shadow: 3px 3px 0.2rem rgb(2, 87, 82);
  transition: all 0.15s;
}
.cartBtn button:active {
  box-shadow: inset 3px 2px 0.2rem rgb(2, 87, 82);
}
.descriptionBox {
  grid-column: 1 / span 2;
  padding: 1rem 20% 1rem 20%;
  width: 100%;
  text-align: justify;
  // background: green;
}
.descriptionBox h3 {
  margin: 0 0 1rem 0;
  font-weight: bold;
}
.recentlyViewedBox {
  grid-column: 1 / span 2;
  height: 20rem;
  width: 100%;
  background: violet;
}
@media screen and (max-width: $mobile) {
}
</style>
