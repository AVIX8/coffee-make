<template>
  <div class="choiseBox">
    <div class="choice">
      <v-icon>mdi-minus</v-icon>
      <input v-model="value" placeholder="1" />
      <v-icon>mdi-plus</v-icon>
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
    }
  },
  computed: {},
  watch: {
    value(newValue) {
      if (this.option.maxValue && parseInt(newValue) > this.option.maxValue)
        return this.$emit('inputOption', this.overflow())
      if (this.option.minValue && parseInt(newValue) < this.option.minValue)
        return this.$emit('inputOption', this.bottomingOut())
      if (newValue === null || newValue === '')
        return this.$emit('inputOption', this.option.minValue)
      this.$emit('inputOption', newValue)
    },
  },
  methods: {
    overflow() {
      this.value = this.option.maxValue
      return this.value
    },
    bottomingOut() {
      this.value = this.option.minValue
      return this.value
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
}
.choice {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  height: 2rem;

  background: white;

  border-radius: 20px;
  border: 0.2rem solid #32bebd;

  box-shadow: 0.1rem 0.1rem 0.3rem gray;

  transition: all 0.2s;
}
.choice input {
  width: 100%;

  color: black;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;

  // background: blue;
}
@media screen and (max-width: $laptop) {
}

@media screen and (max-width: $mobile) {
}
</style>
