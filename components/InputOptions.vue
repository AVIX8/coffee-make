<template>
  <div class="choiseBox">
    <div ref="choise" class="choice">
      <button v-if="minusOn" ref="minus" class="minus" @click="minus">
        <v-icon>mdi-minus</v-icon>
      </button>
      <input ref="input" v-model="copyValue" placeholder="1" />
      <button v-if="plusOn" ref="plus" class="plus" @click="plus">
        <v-icon>mdi-plus</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, default: 1, required: false },
    max: { type: Number, required: true },
    min: { type: Number, required: true },
  },
  data() {
    return {
      copyValue: this.value,
      plusOn: true,
      minusOn: false,
    }
  },
  computed: {},
  watch: {
    copyValue(newValue) {
      if (this.max && newValue === this.max) this.plusOn = false
      else this.plusOn = true
      if (this.min && newValue === this.min) this.minusOn = false
      else this.minusOn = true

      if (this.max && parseInt(newValue) > this.max)
        return this.$emit('inputOption', this.overflow())
      if (this.min && parseInt(newValue) < this.min)
        return this.$emit('inputOption', this.bottomingOut())
      if (newValue === null || newValue === '')
        return this.$emit('inputOption', this.min)

      this.$emit('inputOption', newValue)
    },
  },
  methods: {
    overflow() {
      this.copyValue = this.max
      this.wrong()
      return this.copyValue
    },
    bottomingOut() {
      this.copyValue = this.min
      this.wrong()
      return this.copyValue
    },
    minus() {
      this.copyValue--
    },
    plus() {
      this.copyValue++
    },
    wrong() {
      this.$refs.choise.style.background = 'rgb(253, 150, 150)'
      this.$refs.choise.style.borderColor = 'rgb(172, 38, 38)'

      setTimeout(() => {
        this.$refs.choise.style.transform = 'translate(2px, 0px) rotate(3deg)'
      }, 100)
      setTimeout(() => {
        this.$refs.choise.style.transform = 'translate(-2px, 0px) rotate(-3deg)'
      }, 100 + 50)

      setTimeout(() => {
        this.$refs.choise.style.transform = 'translate(0px, 0px) rotate(0deg)'
      }, 200)

      this.$refs.choise.style.transition = 'all 0.1s'
      setTimeout(() => {
        this.$refs.choise.style.background = 'white'
        this.$refs.choise.style.borderColor = '#ff3300'
        this.$refs.choise.style.transition = 'all 1s'
      }, 300)
      this.$refs.input.blur()
    },
  },
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Ruda';
  src: url(/fonts/Ruda.ttf); /* Путь к файлу со шрифтом */
}
.choiseBox {
  height: 2rem;
  width: 8rem;
  // background: blue;
}
.choice {
  block-size: content-box;
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr;

  height: 100%;

  background: white;
  // background: red;

  border-radius: 20px;
  border: 3px solid $main-color;

  box-shadow: 0.1rem 0.1rem 0.3rem gray;

  transition: all 0.2s;
  overflow: hidden;
}
.choice input {
  grid-column: 2;

  width: 100%;

  color: black;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;

  // background: white;
}

.minus,
.plus {
  block-size: border-box;
  // position: absolute;
  // left: 0;
  // top: 0;
  // bottom: 0;

  height: 100%;

  border: 0;
  // border-radius: 20px 0 0 20px;
  transition: all 0.5s;
}
.minus:hover,
.plus:hover {
  background: $main-light-color;
  transition: all 0.1s;
}
.minus:active,
.plus:active {
  background: $main-color;
}
@media screen and (max-width: $laptop) {
}

@media screen and (max-width: $mobile) {
  .minus:hover,
  .plus:hover {
    background: none;
    transition: all 0;
  }
  .minus:active,
  .plus:active {
    background: #31d4d4;
  }
}
</style>
