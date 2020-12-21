<template>
  <div class="hooperBorder">
    <hooper
      style="height: 600px; width: 100%"
      :infinite-scroll="true"
      :mouse-drag="false"
      :wheel-control="false"
      :auto-play="true"
      :play-speed="6000"
      :transition="1000"
    >
      <slide v-for="(slide, i) in slides" :key="i" :index="i">
        <div class="slide">
          {{ slide.title }}
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

<style scoped>
@font-face {
  font-family: 'Ruda';
  src: url(/fonts/Ruda.ttf); /* Путь к файлу со шрифтом */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.hooper-slide.is-prev {
  background: green;
  /* border-radius: 30px; */
}
.hooper-slide.is-current {
  background: red;
  /* border-radius: 30px; */
}
.hooper-slide.is-next {
  background: yellow;
  /* border-radius: 30px; */
}
.slide {
  height: 100%;
  /* border-radius: 30px; */
  /* background: blue; */
}
</style>
