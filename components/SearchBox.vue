<template>
  <div class="searchBox">
    <div ref="search" class="search">
      <input ref="input" v-model="text" class="input" placeholder="Поиск" />
      <button class="clear" title="Очистить" @click="clear">
        <v-icon class="clear">mdi-close</v-icon>
      </button>
      <button ref="go" class="searchGo" title="Найти" @click="test">
        <v-icon class="searchGo">mdi-magnify</v-icon>
      </button>
    </div>

    <transition name="resultsDown">
      <div v-show="results" ref="results" class="results">
        <nuxt-link
          v-for="(result, i) in results"
          :key="i"
          tag="div"
          class="result"
          to="/"
          @click.native="clear"
        >
          <img class="preview" :src="result.imgs[0]" />
          <div class="info">
            <h6>{{ result.name }}</h6>
            <p>Цена: {{ result.choiceProperty.variants[0].price }} руб</p>
          </div>
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      results: null,
    }
  },
  watch: {
    results(newValue) {
      // this.$refs.search.style.transition = 'all 0.7s'
      if (newValue) this.$refs.search.style.borderRadius = '20px 20px 0 0'
      else this.$refs.search.style.borderRadius = '20px'
      if (newValue && newValue.length > 3)
        this.$refs.results.style.height = '22rem'
    },
  },
  mounted() {
    if (this.results && this.results.length > 3)
      this.$refs.results.style.height = '22rem'
    else if (this.results)
      this.$refs.results.style.height = 6 * this.results.length + 1.9 + 'rem'
    this.$refs.results.style.padding =
      this.$refs.input.clientHeight + 1 + 'px 0 0 0'
  },
  methods: {
    clear() {
      this.text = ''
      this.results = null
      this.$refs.results.style.transition = 'all 0.5s'
      this.$refs.results.style.height = 0
    },
    test() {
      this.$refs.results.style.transition = 'all 0.6s'
      this.results = [
        {
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
        {
          _id: '054VA72303012P',
          desc:
            "Give your dressy look a lift with these women's Kate high-heel shoes by Metaphor. These playful peep-toe pumps feature satin-wrapped stiletto heels and chiffon pompoms at the toes. Rhinestones on each of the silvertone buckles add just a touch of sparkle to these shoes for a flirty footwear look that's made for your next night out.",
          name: `Кофе FRESH COFFEE AROME`,
          category: '/кофе/моносорта',
          brand: 'Argento',
          imgs: ['/testCoffee.png'],

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
        {
          _id: '054VA72303012P',
          desc:
            "Give your dressy look a lift with these women's Kate high-heel shoes by Metaphor. These playful peep-toe pumps feature satin-wrapped stiletto heels and chiffon pompoms at the toes. Rhinestones on each of the silvertone buckles add just a touch of sparkle to these shoes for a flirty footwear look that's made for your next night out.",
          name: `Кофе FRESH COFFEE AROME`,
          category: '/кофе/моносорта',
          brand: 'Argento',
          imgs: ['/testCoffee.png'],

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
        {
          _id: '054VA72303012P',
          desc:
            "Give your dressy look a lift with these women's Kate high-heel shoes by Metaphor. These playful peep-toe pumps feature satin-wrapped stiletto heels and chiffon pompoms at the toes. Rhinestones on each of the silvertone buckles add just a touch of sparkle to these shoes for a flirty footwear look that's made for your next night out.",
          name: `Кофе FRESH COFFEE AROME`,
          category: '/кофе/моносорта',
          brand: 'Argento',
          imgs: ['/красные стаканы 2.jpg'],

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
      ]
    },
  },
}
</script>

<style scoped lang="scss">
.searchBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;

  height: 2rem;
  width: 100%;

  // background: blue;
}
.search {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;

  height: 100%;
  width: 100%;

  border-radius: 20px;
  border: solid 1px lightgray;

  z-index: 2;

  transition: all 0.7s;

  // background: blue;
  // overflow: hidden;
}
.input {
  padding: 0 0 0 5%;

  height: 100%;
  width: 100%;

  font-size: 1.15rem;

  border-radius: 20px 0 0 20px;

  background: white;
  // background: red;
}
.clear {
  padding: 0 1% 0 1%;
  height: 100%;
  background: white;
  // box-shadow: -1.5rem 0 1rem 0rem white;
  cursor: pointer;
  // background: yellow;
}
.searchGo {
  padding: 0 1.5% 0 1%;
  height: 100%;
  border-radius: 0 20px 20px 0;
  background: white;
  cursor: pointer;
  // background: greenyellow;
}
.searchGo:hover {
  color: rgb(28, 156, 139);
  text-shadow: 0 0 0.1rem rgb(28, 156, 139);
  // background: rgb(28, 156, 139);
}
.clear:hover {
  color: rgb(199, 72, 72);
  text-shadow: 0 0 0.1rem rgb(199, 72, 72);
}
.searchGo:active,
.clear:active {
  text-shadow: 0 0 0.7rem rgb(28, 156, 139);
}

//===============================================

.resultsDown-enter-active,
.resultsDown-leave-active {
  transition: all 0.2s;
}
.resultsDown-enter {
  // margin-top: -30%;
  transform: translateY(-40%) scaleY(0.1);
  opacity: 0;
}
.results {
  position: absolute;
  top: 0;
  left: 0;

  // height: 22rem;
  width: 100%;

  background: white;
  // background: orange;

  border-radius: 20px;
  // border: solid 2px #00a199;

  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.5);

  z-index: 1;
  // overflow: scroll;
  overflow: auto !important;
  -ms-overflow-style: none !important; /* IE 11 */
  scrollbar-width: none !important; /* Firefox 64 */
  transition: all 0.5s;
}
.result {
  position: relative;
  // display: grid;
  // grid-template-columns: 1fr 9fr;
  display: flex;

  padding: 0.5rem;

  height: 6rem;

  border-radius: 0;
  border-bottom: solid 1px lightgray;

  cursor: pointer;
}
.result:hover {
  background: #8ddfdb;
}
.result:active {
  background: white;
  box-shadow: inset 0 0 5rem 1rem #8ddfdb;
}
.result:last-child {
  border-radius: 0 0 20px 20px;
  border-bottom: none;
}
.preview {
  padding: 0.2rem;

  height: 5rem;
  width: 5rem;

  background: white;
  border-radius: 20px;
  // border: solid 2px #00a199;
}
.info {
  padding: 0 0 0 1rem;
}
.info h6 {
  margin: 0 0 1rem 0;
}

@media screen and (max-width: $mobile) {
  .input {
    font-size: 0.9rem;
  }
  .result:hover {
    background: none;
  }
  .info {
    padding: 0 0 0 1rem;
  }
  .info h6 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
  }
  .info p {
    font-size: 0.8rem;
  }
}
</style>
