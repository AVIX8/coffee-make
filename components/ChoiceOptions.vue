<template>
  <!-- @mouseenter="mouseOver" @mouseleave="mouseLeave" -->
  <div class="choiseBox">
    <div ref="choice" class="choice">
      <button v-show="!isOpen" class="now" @click="btnClick">
        <p>{{ now }}</p>
        <v-icon>mdi-chevron-down</v-icon>
      </button>
      <transition name="down">
        <ul v-show="isOpen" class="list">
          <li
            v-for="(variant, i) in options.variants"
            :key="i"
            class="option"
            @click="liClick(variant.option)"
          >
            {{ variant.option }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Object, required: true },
  },
  data() {
    return {
      isOpen: false,
      now: this.options.variants[0].option,
    }
  },
  computed: {
    // isActive() {
    //   if (this.$props.options.variants[this.index]
    // },
  },
  mounted() {
    // this.$refs.lft.disabled = true
  },
  methods: {
    btnClick() {
      this.now = ''
      this.isOpen = !this.isOpen
      this.$refs.choice.style.height = this.isOpen
        ? 2 * this.options.variants.length - 0.7 + 'rem'
        : '2rem'
      this.$refs.choice.style.zIndex = 9
    },
    mouseOver() {
      this.$refs.choice.style.height =
        2 * this.options.variants.length - 0.65 + 'rem'
      this.$refs.choice.style.zIndex = 9
      this.isOpen = true
    },
    mouseLeave() {
      this.$refs.choice.style.height = '2rem'
      this.$refs.choice.style.zIndex = 1
      // setTimeout(() => {
      //   this.isOpen = false
      // }, 400)
      this.isOpen = false
    },
    liClick(option) {
      this.isOpen = false
      this.now = option
      this.$refs.choice.style.height = '2rem'
      this.$refs.choice.style.zIndex = 1
      this.$emit('changeOption', option)
    },
  },
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Ruda';
  src: url(/fonts/Ruda.ttf); /* Путь к файлу со шрифтом */
}
* {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  transition: all 0.3s;
}
.choiseBox {
  height: 2rem;
  width: 8rem;
}
.choice {
  position: relative;
  display: grid;

  height: 2rem;

  background: white;

  border-radius: 20px;
  border: 0.2rem solid #32bebd;

  box-shadow: 0.1rem 0.1rem 0.3rem gray;

  transition: all 0.2s;
}

.now {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  border-radius: 18px;
  transition: all 0.5s;
}
.now:hover {
  background: #32bebd;
  transition: all 0.2s;
}
.now:active {
  background: #31d4d4;
  transition: all 0s;
}
.now p {
  grid-column: 2;
  padding: 0.2rem;

  color: black;
  font-size: 1.1rem;
  font-weight: bold;
}

.list {
  position: absolute;

  width: 100%;

  list-style-type: none;
  text-align: center;
}
.option {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.2rem;

  color: gray;
  font-size: 1.1rem;
  text-align: center;

  cursor: pointer;
  transition: all 0s;
}
.option:first-child {
  border-radius: 16px 16px 0 0;
}
.option:last-child {
  border-radius: 0 0 17px 17px;
}
.option:first-child:hover,
.option:hover,
.option:last-child:hover {
  color: black;
  font-weight: bold;
  background: #f0f0f0;
}
.option:first-child:active,
.option:active,
.option:last-child:active {
  background: white;
  box-shadow: inset 0 0 1rem lightgrey;
}

.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}
.down-enter,
.down-leave-to {
  opacity: 0;
}
@media screen and (max-width: $laptop) {
}

@media screen and (max-width: $mobile) {
}
</style>
