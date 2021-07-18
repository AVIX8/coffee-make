<template>
  <div>
    <div
      ref="choice"
      class="choice"
      @mouseenter="mouseIn"
      @mouseleave="mouseOut"
    >
      <!-- <transition name="top-bottom"> -->
      <button class="now" @click="btnClick">
        <p>{{ this.$props.filter.title }}</p>
        <div v-if="$device.isDesktop">
          <v-icon v-if="!getOpen">mdi-chevron-down</v-icon>
          <v-icon v-else>mdi-chevron-up</v-icon>
        </div>
      </button>
      <!-- </transition> -->
      <transition name="down">
        <div v-show="getOpen" ref="list" class="list">
          <div
            v-for="(value, i) in filter.values"
            :key="i"
            class="value"
            @click="liClick(value)"
          >
            <v-icon v-if="!selected.includes(value)"
              >mdi-checkbox-blank-circle-outline</v-icon
            >
            <v-icon v-else>mdi-checkbox-marked-circle</v-icon>
            {{ value }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, required: false, default: false },
    filter: { type: Object, required: true },
    selected: { type: Array, required: true },
  },
  data() {
    return {
      isOpen: this.open,
    }
  },
  computed: {
    getOpen() {
      if (this.$device.isMobile) return true
      return this.isOpen
    },
  },
  methods: {
    btnClick() {
      if (this.$device.isMobile) return
      this.isOpen = !this.isOpen
      // this.$refs.choice.style.height = this.isOpen
      //   ? 2 * (this.filter.values.length + 1) + 0.4 + 'rem'
      //   : '2rem'
      this.$refs.choice.style.background = 'white'
      this.$refs.choice.style.zIndex = 9
    },
    liClick(value) {
      if (this.selected.includes(value))
        this.$emit('removeFilter', value, this.filter.title)
      else this.$emit('addFilter', value, this.filter.title)
    },
    // hover
    mouseIn() {
      if (this.$device.isMobile) return
      if (this.$props.filter.values.length > 1 && !this.isOpen)
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
  position: relative;
  box-sizing: border-box;
  display: inline-block;

  // height: 2rem;

  background: white;

  border-radius: 1rem;
  border: 0.15rem solid $main-color;

  // box-shadow: 0 0 0.3rem gray;
  overflow: hidden;

  transition: all 0.2s;
}
.now {
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 100fr 1fr;

  height: 2rem;

  text-align: left;

  cursor: pointer;
  transition: all 0.5s;
}
// .now:hover,
// .now:active {
//   background: $main-light-color;
//   transition: all 0s;
// }
.now p {
  grid-column: 2;

  color: black;
  font-size: 1.1rem;
  font-weight: bold;
}

.list {
  // position: absolute;
  // display: inline-block;
  // padding-top: 4px;
  width: 100%;
  margin-top: 0.4rem;

  // list-style-type: none;
  text-align: center;
}
.value {
  display: grid;
  grid-template-columns: 1fr 8fr;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  align-items: center;

  color: gray;
  white-space: wrap;
  font-size: 1.1rem;
  text-align: center;
  text-align: left;

  cursor: pointer;
  transition: all 0s;
}
// .value:first-child {
//   border-radius: 16px 16px 0 0;
// }
.value:last-child {
  border-radius: 0 0 17px 17px;
}
.value:first-child:hover,
.value:hover,
.value:last-child:hover {
  color: black;
  font-weight: bold;
  background: #f0f0f0;
}
.value:first-child:active,
.value:active,
.value:last-child:active {
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

.top-bottom-enter-active {
  transition: all 0.85s;
}
.top-bottom-leave-active {
  transition: all 0s;
}
.top-bottom-enter,
.top-bottom-leave-to {
  transform: translateY(2rem);
  opacity: 0;
}
@media screen and (max-width: $laptop) {
}

@media screen and (max-width: $mobile) {
  .choice {
    width: 100%;
  }
  .now {
    padding-left: 0.5rem;
  }
  .value:first-child:hover,
  .value:hover,
  .value:last-child:hover {
    background: none;
  }
  .value:first-child:active,
  .value:active,
  .value:last-child:active {
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
