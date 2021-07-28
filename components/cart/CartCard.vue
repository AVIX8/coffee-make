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
        {{ chr.title }}:
        <div class="dashed-line" />
        {{ chr.value }}
      </div>
    </div>
    <div class="optionBox">
      <div v-for="(attr, i) in attributes" :key="i">
        {{ attr.title }}:
        <span style="border-bottom: 1px gray dashed">{{ attr.value }}</span>
      </div>
      <div class="option">
        Кол-во:
        <InputOptions
          :value="quantity"
          :max="9999"
          :min="1"
          @inputOption="inputOption($event)"
        />
      </div>
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
    sku: { type: String, required: true },
    quantity: { type: Number, required: false, default: 1 },
  },
  data() {
    return {}
  },
  computed: {
    price() {
      return this.item.variants[0].price
    },
    cost() {
      return this.price * this.quantity
    },
    attributes() {
      return this.item.variants[0].attributes
    },
  },
  watch: {},
  methods: {
    changeOption(option) {
      this.price = option.price
    },
    inputOption(option) {
      console.log('cart:', this.sku)
      this.$store.commit('cart/setQuantity', {
        sku: this.sku,
        quantity: option,
      })
    },
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
  },
}
</script>

<style scoped lang="scss">
.cardBox {
  overflow: scroll;

  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 0.5fr 2fr 16.5rem 1fr;
  gap: 1.5rem;

  margin-bottom: 1rem;
  padding: 0.5rem;

  height: 12rem;
  width: 100%;

  // background: blue;
  border-radius: 20px;
}
.preview {
  height: 9rem;
  border-radius: 20px;
}
.infoBox {
  // height: 100%;
  // border: 1px solid fuchsia;
}
.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
}
.characteristica {
  display: grid;
  grid-template-columns: max-content auto max-content;
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
}
.optionBox {
  display: grid;
  align-items: center;
  // justify-items: center;
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
  padding: 5% 9%;
  min-height: 90%;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.option {
  display: grid;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  grid-template-columns: max-content auto;
  margin: 0.5rem 0;
  padding: 0 0 0 1rem;

  background: whitesmoke;
  box-shadow: 0 0 0.1rem black;
  border-radius: 20px;
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
.dashed-line {
  width: 100%;
  border-bottom: 2px dotted lightgray;
}
@media screen and (max-width: $mobile) {
}
</style>
