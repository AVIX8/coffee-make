<template>
  <div>
    <div ref="choice" class="choice">
      <transition name="top-bottom">
        <button class="now" @click="btnClick">
          <p>{{ this.$props.filter.title }}</p>
          <v-icon v-if="!isOpen">mdi-chevron-down</v-icon>
          <v-icon v-else>mdi-chevron-up</v-icon>
        </button>
      </transition>
      <transition name="down">
        <div v-show="isOpen" class="list">
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
            &nbsp;{{ value }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: { type: Object, required: true },
    selected: { type: Array, required: true },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    btnClick() {
      this.isOpen = !this.isOpen
      this.$refs.choice.style.height = this.isOpen
        ? 2 * (this.filter.values.length + 1) + 0.4 + 'rem'
        : '2rem'
      this.$refs.choice.style.background = 'white'
      this.$refs.choice.style.zIndex = 9
    },
    liClick(value) {
      if (this.selected.includes(value))
        this.$emit('removeFilter', value, this.filter.title)
      else this.$emit('addFilter', value, this.filter.title)
    },
    close() {
      this.isOpen = false
      this.$refs.choice.style.height = '2rem'
      this.$refs.choice.style.zIndex = 1
    },
    // hover
    // mouseIn() {
    //   if (this.$props.filter.values.length > 1 && !this.isOpen)
    //     this.$refs.choice.style.background = '#e57657'
    //   else this.$refs.choice.style.cursor = 'default'
    // },
    // mouseOut() {
    //   this.$refs.choice.style.background = 'white'
    // },
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
  // display: block;

  // height: 100%;

  background: white;

  border-radius: 1rem;
  border: 0.2rem solid $main-color;

  box-shadow: 0.1rem 0.1rem 0.3rem gray;
  overflow: hidden;

  transition: all 0.5s;
}
.now {
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 100fr 1fr;

  text-align: left;
  border-radius: 1rem;

  cursor: pointer;
  transition: all 0.5s;
}
.now:hover,
.now:active {
  background: $main-light-color;
  transition: all 0s;
}
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
  // display: grid;
  // grid-template-columns: 1fr 2fr 1fr;
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 0 1rem 0 0.5rem;

  height: 2rem;

  color: gray;
  white-space: nowrap;
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
