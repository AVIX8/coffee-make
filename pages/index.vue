<template>
  <div ref="mainBox" class="mainBox">
    <nuxt-link class="sideLink redLink animation shadow" tag="div" to="catalog">
      <div ref="left" class="back-box back-box-left" />
      <div class="frontbox" style="background: #e5765791">Каталог</div>
      <div ref="leftEyelet" class="eyelet eyelet-left animation">
        <v-icon large>mdi-chevron-right</v-icon>
      </div>
    </nuxt-link>

    <div class="centerBox balance">
      <h1 class="mainTitle">COFFEE MAKE</h1>
      <div id="tryButton"><h5>Попробовать бесплатно</h5></div>
    </div>

    <nuxt-link
      class="sideLink blueLink animation shadow"
      tag="div"
      to="business"
    >
      <div ref="rightEyelet" class="eyelet eyelet-right animation">
        <v-icon large>mdi-chevron-left</v-icon>
      </div>
      <div ref="right" class="back-box back-box-right" />
      <div class="frontbox" style="background: #4494b6a1">Для Бизнеса</div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'header&footer',
  data() {
    return {
      isCenterActive: true,
    }
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()
    this.$refs.mainBox.style.minHeight = this.$store.state.windowHeight + 'px'
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler() {
      this.$refs.leftEyelet.style.left =
        this.$refs.left.clientWidth -
        this.$refs.leftEyelet.clientWidth / 1.6 +
        'px'
      this.$refs.rightEyelet.style.right =
        this.$refs.right.clientWidth -
        this.$refs.rightEyelet.clientWidth / 1.6 +
        'px'
    },
  },
}
</script>

<style scoped lang="scss">
.mainBox {
  position: relative;
  display: flex;
}
.shadow {
  filter: drop-shadow(0 0 0.2rem gray);
}
.animation {
  transition: all 0.6s;
}
.centerBox {
  position: relative;
  left: 25%;
  padding: 3rem 0 3rem 0;
  text-align: center;
  width: 50%;
  background: url(static\Coffee_logotype_styl.png) 47% 10%;
  // z-index: -1;
}
.mainTitle {
  margin: 0 0 2rem 0;
  color: white;
  text-shadow: 0 5px 8px gray;
}
#tryButton {
  display: inline-block;
  cursor: pointer;
  padding: 1rem;
  color: white;
  background: $main-color;
  border: 2px white solid;
  border-radius: 20px;
  z-index: 20;
  transition: all 0.2s;
}
#tryButton:hover {
  transform: scale(1.05);
}

.sideLink {
  position: absolute;
  height: 100%;
  width: 25%;
  cursor: pointer;
  z-index: 2;
}
.sideLink:hover {
  width: 27%;
}
.blueLink {
  right: 0;
}
.redLink {
  left: 0;
}
.sideLink:hover .eyelet-left {
  // transform: translateX(-50%);
}
.sideLink:hover .eyelet-right {
  // transform: translateX(50%);
}
.eyelet {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  margin-top: -50px;
  border-radius: 100%;
  z-index: -2;
}
.eyelet-left {
  padding: 0 0 0 2.5rem;
  background: $main-light-color;
  background: #db9b8e;
}
.eyelet-right {
  padding: 0 2.5rem 0 0;
  background: $side-dark-color;
  background: #6eacc6;
}
.back-box {
  position: absolute;
  height: 100%;
  width: 100%;
  // filter: blur(0px);
  background-position: 75% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
.back-box-left {
  background-image: url(static\left-background.jpg);
  // border-right: 5px $main-light-color solid;
}
.back-box-right {
  background-image: url(static\right-background.jpg);
  // border-left: 5px $side-dark-color solid;
}
.frontbox {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  // text-shadow: 0 0 2rem black;
  text-shadow: 0 0 5px gray;
  text-decoration: underline;
}
</style>
