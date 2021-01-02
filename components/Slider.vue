<template>
  <div class="hooperBorder">
    <hooper
      style="height: 600px"
      :infinite-scroll="true"
      :mouse-drag="false"
      :wheel-control="false"
      :auto-play="true"
      :play-speed="6000"
      :transition="1000"
    >
      <slide v-for="(slide, i) in slides" :key="i" :index="i">
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
// import 'hooper/dist/hooper.css'
import '~/assets/hooper.css'

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
      // ...
    }
  },
  computed: {
    ...mapGetters({
      // ...
    }),
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Ruda';
  src: url(/fonts/Ruda.ttf); /* Путь к файлу со шрифтом */
}
@media screen and (max-width: $mobile) {
}
.slide {
  position: relative;
  height: 100%;
  box-shadow: inset 0px 0px 20px white;
}
.slideBackground {
  position: absolute;
  top: 0;
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
</style>
