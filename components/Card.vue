<template>
  <div class="cardBox">
    <div class="card">
      <div class="preview">
        <img :src="item.imgs[0]" :alt="item.name" />
      </div>
      <div class="title">
        <div class="name">{{ item.name }}</div>
        <div class="price">{{ item.choiceProperty.variants[0].price }} руб</div>
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
    return {}
  },
  watch: {},
  methods: {},
}
</script>

<style scoped lang="scss">
.cardBox {
  margin: 0 1rem 0 1rem;

  height: 19rem;
  width: 12rem;
  // background: blue;
}
.card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: 20px;
  box-shadow: 0 0 0.5rem lightgray;

  background: white;

  cursor: pointer;
  transition: all 0.8s;
}
.card:hover {
  box-shadow: 0 0 0.5rem gray;
  transition: all 0.4s;
}
// .card:hover .preview img {
//   transform: scale(1.2);
//   transition: all 0.4s;
// }

.preview {
  margin: 1.5rem 1.8rem 0 1.8rem;
  width: 100%;

  border-radius: 50%;
  box-shadow: inset 0 0 1rem black;

  background: #188a77;
  background-image: linear-gradient(
    to right bottom,
    #35edeb,
    #2dd4cc,
    #26baae,
    #1fa292,
    #188a77
  );
}
.preview img {
  width: 100%;
  transform: scale(1.2);
  transition: all 0.8s;
}

.title {
  padding: 1.5rem 0 0 0;
  // background: springgreen;
}
.name {
  padding: 0 0.5rem 0 0.5rem;
  width: 100%;

  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;

  // background: yellow;
}

.price {
  margin: 1rem 0;
  width: 100%;
  text-align: center;
  // background: orange;
}
</style>
