<template>
  <div class="cardBox">
    <nuxt-link
      :to="'/product/' + item.slug"
      tag="div"
      class="card"
      style="text-decoration: none"
    >
      <div class="preview">
        <img :src="item.imgs[0]" :alt="item.title" />
      </div>
      <div class="title-price">
        <div class="title">{{ item.title }}</div>
        <div class="price">{{ item.price }} руб</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>

<style scoped lang="scss">
.cardBox {
  height: 100%;
  width: 100%;
  z-index: 1;
}
.card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: 10px;
  // box-shadow: 0 0 0.25rem black;

  background: white;
  background: #e74623;

  cursor: pointer;
  transition: all 0.2s;
}
.card:hover {
  box-shadow: 1px 0.1rem 0.4rem black;
}

.preview {
  overflow: hidden;
  margin: 1.5%;
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: inset 0 0 0.2rem black;
}
.preview img {
  // margin: 8%;
  width: 100%;
  border-radius: 10px;
  // border: 2px solid blue;
  transform: scale(1.02);
  transition: all 0.8s;
}
.title-price {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  width: 90%;
  // padding: 1.5rem 0 0 0;
  // background: springgreen;
  margin-bottom: 1rem;
}
.title {
  padding: 0 1rem;
  // width: 100%;
  // float: left;

  color: $main-color;
  color: white;
  // text-align: center;
  font-size: 1.3rem;
  text-shadow: 0 0 0.2rem gray;
  // font-weight: bold;

  // background: yellow;
}

.price {
  // margin: 1rem 0;
  // margin-bottom: 1rem;
  width: 100%;
  color: white;
  letter-spacing: 0.2rem;
  font-size: 130%;
  text-shadow: 0 0 0.2rem black;
  font-weight: bold;
  text-align: right;

  // background: orange;
}

@media screen and (max-width: $mobile) {
  .cardBox {
    margin: 0 0 1rem 0;
    // margin: 0 1rem 0;

    height: 95%;
    width: 90%;
    // background: blue;
  }
  .card {
    box-shadow: 0 0 0.3rem gray;
  }
  .card:hover {
    box-shadow: 0;
    transition: 0;
  }
  .card:active {
    box-shadow: 0 0 0.5rem gray;
    transition: all 0.4s;
  }

  .title {
    padding: 1rem 0 0 0;
    // background: springgreen;
  }
  .title {
    padding: 0 0.2rem 0 0.2rem;
    font-size: 1rem;
    // background: yellow;
  }

  .price {
    margin: 0.5rem 0;
    // background: orange;
  }
}
</style>
