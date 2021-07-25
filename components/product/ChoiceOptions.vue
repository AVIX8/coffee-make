<template>
  <div
    ref="choice"
    v-click-outside="close"
    class="choice"
    @mouseenter="mouseIn"
    @mouseleave="mouseOut"
  >
    <button v-show="!isOpen" class="now" @click="btnClick">
      <p>{{ now }}</p>
      <v-icon>mdi-chevron-down</v-icon>
    </button>

    <transition name="down">
      <div v-show="isOpen" class="list">
        <div
          v-for="(option, i) in options"
          :key="i"
          class="option"
          @click="liClick(option)"
        >
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, required: true },
  },
  data() {
    return {
      isOpen: false,
      now: this.options[0],
    }
  },
  computed: {
    // isActive() {
    //   if (this.options.variants.length > 1 && !this.isOpen) return true
    //   else return false
    // },
  },
  methods: {
    btnClick() {
      this.isOpen = !this.isOpen
      // this.$refs.choice.style.position = 'absolute'
      this.$refs.choice.style.height = this.isOpen
        ? 2.1 * this.options.length + 'rem'
        : '2rem'
      this.$refs.choice.style.background = 'white'
      this.$refs.choice.style.zIndex = 9
    },
    liClick(option) {
      this.now = option
      this.close()
      this.$emit('changeOption', option)
    },
    close() {
      if (!this.isOpen || !this.$refs.choice) return
      this.isOpen = false
      this.$refs.choice.style.height = '2rem'
      this.$refs.choice.style.zIndex = 1
      // this.$refs.choice.style.position = 'relative'
    },
    mouseIn() {
      if (this.$props.options.length > 1 && !this.isOpen)
        this.$refs.choice.style.background = '#e57657'
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
.choice {
  box-sizing: border-box;
  position: relative;
  display: grid;

  // height: 2rem;
  width: 16rem;

  background: white;
  // background: red;

  border-radius: 20px;
  border: 0.2rem solid $main-color;

  box-shadow: 0.1rem 0.1rem 0.3rem gray;
  overflow: hidden;

  transition: all 0.5s;
}

.now {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr;

  text-transform: capitalize;
  border-radius: 20px;

  cursor: pointer;
  transition: all 0.5s;
}
.now:active {
  background: $main-color;
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

  text-align: center;
  text-transform: capitalize;
  z-index: 99;
}
.option {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2rem;

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
