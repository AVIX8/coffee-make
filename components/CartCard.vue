<template>
  <div class="cardBox">
    <img :src="imageIdToURL(item.imgs[0])" class="preview" />
    <div class="infoBox">
      <div class="title">{{ item.title }}</div>
      <div
        v-for="(chr, i) in item.characteristics"
        :key="i"
        class="characteristica"
      >
        {{ chr.title }}: {{ chr.value }}
      </div>
    </div>
    <div class="optionBox">
      <span v-if="item.optionTitle">{{ item.optionTitle }}:</span>
      <ChoiceOptions
        v-if="item.optionTitle"
        :options="item.options"
        @changeOption="changeOption($event)"
      ></ChoiceOptions>
      Кол-во:
      <InputOptions
        :value="1"
        :max="9999"
        :min="1"
        @inputOption="inputOption($event)"
      ></InputOptions>
    </div>
    <div class="priceBox">
      Цена:
      <div class="price">{{ price }} руб</div>
      <span style="font-weight: bold">Стоимость:</span>
      <div class="cost">{{ cost }} руб</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
  data() {
    return {
      price: this.item.price,
      quantity: 1,
    }
  },
  computed: {
    productPrice() {
      console.log(this.item.price)
      return this.item.price
    },
    cost() {
      return this.price * this.quantity
    },
  },
  watch: {
    productPrice(val) {
      this.price = val
    },
  },
  methods: {
    changeOption(option) {
      this.price = option.price
    },
    inputOption(option) {
      this.quantity = option
    },
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
  },
}
</script>

<style scoped lang="scss">
.cardBox {
  display: flex;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 0.5fr 2fr 16.5rem 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  height: 10rem;
  width: 100%;
  // background: blue;
  border-radius: 20px;
}
.preview {
  height: 9rem;
  border-radius: 20px;
}
.infoBox {
  height: 100%;
  // border: 1px solid fuchsia;
}
.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
}
.characteristica {
  font-size: 0.8rem;
}
.characteristica:nth-child(even) {
  background: whitesmoke;
}
.optionBox {
  display: grid;
  align-items: center;
  // justify-items: center;
  grid-template-columns: 6rem 8rem;
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
  padding: 2rem 1rem;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.priceBox {
  display: grid;
  align-items: center;
  // justify-content: center;
  // grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
}
.cost {
  font-weight: bold;
}
@media screen and (max-width: $mobile) {
}
</style>
