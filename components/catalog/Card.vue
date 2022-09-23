<template>
  <div>
    <LazyProductDialog v-model="isView" title="" :item="item" />
    <div class="cardBox" :class="{ outStock: !inStock }" @click="open">
      <div class="preview">
        <img
          class="image"
          :src="imageIdToURL(item.imgs[0])"
          :alt="item.title"
        />
      </div>
      <div class="title-price">
        <div class="title">
          {{ title }}
        </div>
        <div class="price">{{ price }} руб</div>
      </div>
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
      isView: false,
    }
  },
  computed: {
    inStock() {
      // return this.item.variants[0].inStock
      return true
    },
    price() {
      return this.item.variants[0].price
    },
    title() {
      const title = this.item.title
      if (title.length > 15) return title.substring(0, 15).trim() + '...'
      return title
    },
  },
  watch: {},
  mounted() {},
  methods: {
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
    open() {
      if (this.$device.isMobile) {
        this.$router.push('/product/' + this.item.slug)
        return
      }
      this.isView = true
      console.log(this.item)
    },
  },
}
</script>

<style scoped lang="scss">
.cardBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: 10px;
  // border: 2px solid $main-color;

  background: white;
  background: whitesmoke;
  // background: #e74623;
  // box-shadow: 0 0.1rem 0.1rem gray;

  cursor: pointer;
  transition: all 0.1s;
  z-index: 1;
}
.cardBox:hover {
  background: white;
  box-shadow: 0 1px 0.2rem lightgrey;
}
.cardBox:hover .image {
  transform: scale(1.04);
}
.outStock {
  filter: grayscale(90%);
}
.outStock .cardBox:hover {
  box-shadow: none;
}

.preview {
  overflow: hidden;
  margin: 1.5%;
  width: 100%;
  background: white;
  border-radius: 10px;
}
.image {
  margin-bottom: -7px;
  width: 100%;
  border-radius: 10px;
  transform: scale(1.02);
  transition: all 0.3s;
}
.title-price {
  display: grid;
  grid-template-columns: auto max-content;
  align-items: center;
  // align-items: flex-start;
  margin: 0.5rem;
  // margin-bottom: 1rem;
  height: 1.5rem;
  width: 90%;
  // padding: 1.5rem 0 0 0;
  // background: springgreen;
}
.title {
  overflow: hidden;
  margin-right: 1rem;
  padding: 0.2rem 0;
  // width: 200px;
  // float: left;

  color: $main-color;
  color: black;
  // color: white;
  // text-align: center;
  font-size: 1.1rem;
  // text-shadow: 0 0 0.2rem gray;
  // font-weight: bold;

  // background: yellow;
}

.price {
  // margin: 1rem 0;
  // margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  color: white;
  color: $main-color;
  letter-spacing: 0.2rem;
  font-size: 130%;
  // text-shadow: 0 0 0.2rem black;
  font-weight: bold;
  text-align: right;

  // background: orange;
}

@media screen and (max-width: $mobile) {
  .card {
    box-shadow: 0 0 0.2rem gray;
  }
  .card:hover {
    box-shadow: 0 0 0.2rem gray;
    transition: none;
  }
  .card:active {
    box-shadow: 0 0 0.5rem gray;
    transition: all 0.4s;
  }

  .title-price {
    grid-template-columns: none;
    grid-template-rows: 1.2rem max-content;
    align-items: center;
    gap: 0.5rem;
    // align-items: flex-start;
    margin-top: 0.5rem;
    height: 3rem;
    width: 100%;
    // padding: 1.5rem 0 0 0;
    // background: springgreen;
    margin-bottom: 1rem;
  }
  .title,
  .price {
    margin: 0;
    padding: 0;
    height: 1.2rem;
    text-align: center;
    // background: blue;
  }
}
</style>
