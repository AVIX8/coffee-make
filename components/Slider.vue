<template>
  <div class="hooperBorder">
    <hooper
      v-if="!isMobile"
      :style="{ height: [hooperHeight] + 'px' }"
      :infinite-scroll="true"
      :mouse-drag="false"
      :wheel-control="false"
      :auto-play="true"
      :play-speed="6000"
      :transition="1000"
    >
      <slide v-for="(slide, index) in slides" :key="index">
        <div class="slide">
          <div class="slideInfo">
            <div class="title">{{ slide.title }}</div>
            <div class="description">{{ slide.description }}</div>
            <div class="button">{{ slide.button }}</div>
          </div>
          <img :src="slide.img" class="slideBackground" />
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>

    <div v-else class="panel">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="slide"
        :style="{ backgroundImage: `url('${slide.img}')` }"
      >
        <div class="title">
          <h6>{{ slide.title }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
} from 'hooper'
// import '~/assets/hooper.css'

export default {
  name: 'App',
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
  },
  props: {
    slides: { type: Array, required: true },
  },
  data() {
    return {
      hooperHeight: 600,
    }
  },
  created() {
    require('~/assets/hooper.css')
  },
  computed: {
    ...mapGetters({
      isMobile: 'getIsMobile',
    }),
  },
  methods: {},
}
</script>

<style scoped lang="scss">
// @import url('~/assets/hooper.css');
@font-face {
  font-family: 'Ruda';
  src: url(/fonts/Ruda.ttf); /* Путь к файлу со шрифтом */
}
@media screen and (max-width: $laptop) {
  .slide {
    position: relative;
    height: 100%;
    box-shadow: inset 0px 0px 20px white;
  }
  .slideBackground {
    position: initial;
    z-index: 1;
  }
  .slideInfo {
    position: absolute;
    top: 23%;
    left: 13%;

    padding: 1rem 0 0 2rem;

    min-height: 45%;
    max-height: 60%;
    min-width: 25%;
    max-width: 28%;

    /* background: red; */
    z-index: 2;
  }
  .title {
    margin: 0 0 1rem 0;

    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.8rem;
    font-weight: bold;
    border-bottom: 0.3rem white ridge;
    border-radius: 0;
  }
  .description {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;

    /* background: blue; */
  }
  .button {
    margin: 2rem 0;
    padding: 0.5rem 0 0.7rem 0;

    width: 70%;

    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;

    border: 2px #00b9b0 solid;
    border-radius: 20px;
    transition: all 0.3s;

    /* background: yellow; */
  }
  .button:hover {
    cursor: pointer;
    background-image: linear-gradient(
      to top,
      #009b94,
      #00a9a1,
      #00b7ae,
      #00c5bb,
      #00d3c8
    );
    transition: all 0.3s;
  }
  .button:active {
    background: steelblue;
  }
}

@media screen and (max-width: $mobile) {
  .panel {
    position: relative;
    // background: red;
    box-shadow: none;
  }
  .slide {
    margin: 1rem 0 0 0;
    padding: 0;

    height: 15rem;

    background-size: 200%;
    background-position-x: 100%;

    border-radius: 1rem;

    box-shadow: 0 0 0.1rem lightgray;
  }
  .title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1rem;

    padding: 0.5rem 2rem 0.5rem 2rem;

    color: black;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;

    background: white;

    border-bottom: none;
    border-radius: 0 0 1rem 1rem;
  }
  .title h6 {
    font-weight: bold;
  }
}
</style>
