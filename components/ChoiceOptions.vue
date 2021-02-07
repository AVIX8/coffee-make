<template>
  <div class="choiseBox">
    <div
      ref="choice"
      v-click-outside="close"
      class="choice"
      @mouseenter="mouseIn"
      @mouseleave="mouseOut"
    >
      <p v-if="this.$props.options.variants.length === 1" class="low">
        {{ now }}
      </p>
      <button v-show="isActive" class="now" @click="btnClick">
        <p>{{ now }}</p>
        <v-icon>mdi-chevron-down</v-icon>
      </button>
      <transition name="down">
        <ul v-if="isOpen" class="list">
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
    isActive() {
      if (this.$props.options.variants.length > 1 && !this.isOpen) return true
      else return false
    },
  },
  methods: {
    btnClick() {
      this.isOpen = !this.isOpen
      this.$refs.choice.style.height = this.isOpen
        ? 2.1 * this.options.variants.length + 'rem'
        : '2rem'
      this.$refs.choice.style.background = 'white'
      this.$refs.choice.style.zIndex = 9
    },
    liClick(option) {
      this.isOpen = false
      this.now = option
      this.$refs.choice.style.height = '2rem'
      this.$refs.choice.style.zIndex = 1
      this.$emit('changeOption', option)
    },
    close() {
      this.isOpen = false
      this.$refs.choice.style.height = '2rem'
    },
    mouseIn() {
      if (this.$props.options.variants.length > 1 && !this.isOpen)
        this.$refs.choice.style.background = '#32bebd'
      else this.$refs.choice.style.cursor = 'default'
    },
    mouseOut() {
      this.$refs.choice.style.background = 'white'
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
button {
  cursor: default;
}
.choiseBox {
  height: 2rem;
  width: 8rem;
  // background: blue;
}
.choice {
  position: relative;
  display: grid;

  height: 100%;

  background: white;
  // background: red;

  border-radius: 20px;
  border: 0.2rem solid #2aa5a5;

  box-shadow: 0.1rem 0.1rem 0.3rem gray;
  overflow: hidden;

  transition: all 0.5s;
}

.low {
  display: flex;
  align-items: center;
  justify-content: center;

  color: black;
  font-size: 1.1rem;
  font-weight: bold;
}
.now {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr;

  border-radius: 20px;

  cursor: pointer;
  transition: all 0.5s;
}
.now:active {
  background: #31d4d4;
  transition: all 0s;
}
.now p {
  grid-column: 2;

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
.list li {
  height: 2rem;
}
.option {
  display: flex;
  align-items: center;
  justify-content: center;

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

.down-enter-active {
  transition: all 0.8s;
}
.down-leave-active {
  transition: all 0.1s;
}
.down-enter,
.down-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
@media screen and (max-width: $laptop) {
}

@media screen and (max-width: $mobile) {
  .option:first-child:hover,
  .option:hover,
  .option:last-child:hover {
    background: none;
  }
  .option:first-child:active,
  .option:active,
  .option:last-child:active {
    background: white;
    box-shadow: none;
  }

  .down-enter-active {
    transition: all 0.8s;
  }
  .down-leave-active {
    transition: all 0s;
  }
  .down-enter,
  .down-leave-to {
    transform: translateY(-2rem);
    opacity: 0;
  }
}
</style>
