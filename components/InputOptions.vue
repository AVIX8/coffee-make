<template>
  <div class="choiseBox">
    <div ref="choise" class="choice">
      <button v-if="minusOn" ref="minus" class="minus" @click="minus">
        <v-icon>mdi-minus</v-icon>
      </button>
      <input ref="input" v-model="value" placeholder="1" />
      <button v-if="plusOn" ref="plus" class="plus" @click="plus">
        <v-icon>mdi-plus</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: { type: Object, required: true },
  },
  data() {
    return {
      value: null,

      plusOn: true,
      minusOn: false,
    }
  },
  computed: {},
  watch: {
    value(newValue) {
      if (this.option.maxValue && newValue === this.option.maxValue)
        this.plusOn = false
      else this.plusOn = true
      if (this.option.minValue && newValue === this.option.minValue)
        this.minusOn = false
      else this.minusOn = true

      if (this.option.maxValue && parseInt(newValue) > this.option.maxValue)
        return this.$emit('inputOption', this.overflow())
      if (this.option.minValue && parseInt(newValue) < this.option.minValue)
        return this.$emit('inputOption', this.bottomingOut())
      if (newValue === null || newValue === '')
        return this.$emit('inputOption', this.option.minValue)

      this.$emit('inputOption', newValue)
    },
  },
  created() {
    this.value = this.option.value
  },
  methods: {
    overflow() {
      this.value = this.option.maxValue
      this.wrong()
      return this.value
    },
    bottomingOut() {
      this.value = this.option.minValue
      this.wrong()
      return this.value
    },
    minus() {
      this.value--
    },
    plus() {
      this.value++
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
        this.$refs.choise.style.borderColor = '#32bebd'
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
  border: 3px solid #2aa5a5;

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
  background: #32bebd;
  transition: all 0.1s;
}
.minus:active,
.plus:active {
  background: #31d4d4;
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
