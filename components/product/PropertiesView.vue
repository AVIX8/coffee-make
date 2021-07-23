<template>
  <div class="propertyBox" :title="property.value + '/' + property.maxValue">
    <div
      v-for="i in property.maxValue"
      :key="i"
      class="block"
      :class="{ active: i <= property.value }"
      :style="blockWidth"
    />
  </div>
</template>

<script>
export default {
  props: {
    property: { type: Object, required: true },
  },
  data() {
    return {
      properties: {
        кислотность: {
          maxValue: 5,
          value: 3,
        },
        плотность: {
          maxValue: 5,
          value: 2,
        },
      },
      blockWidth: {
        width:
          (this.$device.isMobile ? 8 : 10) / this.property.maxValue -
          0.2 +
          'rem',
      },
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.propertyBox {
  position: relative;
  // display: inline;

  height: 0.8rem;
  width: 10rem;

  cursor: help;
  // background: red;
}
.block {
  float: left;

  margin: 0 0.2rem 0 0;

  height: 100%;
  // width: 3rem;

  border: solid 1px #24584b;
  // border-radius: 20px;
  // background: #4fc7a9;
  // background: #24584b;
}
.block:first-child {
  border-radius: 20px 0 0 20px;
}
.block:last-child {
  border-radius: 0 20px 20px 0;
}
.active {
  // margin: 0;
  // border: solid 1px #24584b;
  // background: #24584b;
  background: #4fc7a9;
  // box-shadow: 0 0 0.5rem #4fc7a9;
}

@media screen and (max-width: $mobile) {
  .propertyBox {
    height: 0.8rem;
    width: 8rem;
  }
}
</style>
