<template>
  <div class="mainBox">
    <div ref="leftBox" class="left animation" :class="leftStyle">
      <div v-show="isLeftActive" class="content">left content</div>
      <div
        v-show="!isLeftActive"
        class="slide-title animation"
        @click="setLeftActive"
        @mouseenter="scaleHover(true, $refs.leftBox)"
        @mouseleave="scaleHover(false, $refs.leftBox)"
      >
        Каталог
      </div>
      <div
        v-if="isCenterActive"
        class="eyelet eyelet-left"
        @click="setLeftActive"
        @mouseenter="scaleHover(true, $refs.leftBox)"
        @mouseleave="scaleHover(false, $refs.leftBox)"
      >
        <v-icon large>mdi-chevron-right</v-icon>
      </div>
    </div>

    <transition name="rolled">
      <div v-if="isCenterActive" class="centerBox balance">
        <h1 v-if="isCenterActive" class="mainTitle">COFFEE MAKE</h1>
        <div id="tryButton"><h5>Попробовать бесплатно</h5></div>
      </div>
    </transition>

    <div ref="rightBox" class="right animation" :class="rightStyle">
      <div
        v-show="isLeftActive || isCenterActive"
        class="slide-title animation"
        @click="setRightActive"
        @mouseenter="scaleHover(true, $refs.rightBox)"
        @mouseleave="scaleHover(false, $refs.rightBox)"
      >
        Для Бизнеса
      </div>
      <div v-show="!isLeftActive && !isCenterActive" class="content">
        right content
      </div>
      <div
        v-if="isCenterActive"
        class="eyelet eyelet-right"
        @click="setRightActive"
        @mouseenter="scaleHover(true, $refs.rightBox)"
        @mouseleave="scaleHover(false, $refs.rightBox)"
      >
        <v-icon large>mdi-chevron-left</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'header&footer',
  data() {
    return {
      isCenterActive: true,
      isLeftActive: false,
    }
  },
  computed: {
    leftStyle() {
      return {
        open: this.isLeftActive,
        'rolled-up': !this.isLeftActive && !this.isCenterActive,
        balance: this.isCenterActive,
        shadow: !this.isLeftActive,
      }
    },
    rightStyle() {
      return {
        open: !this.isLeftActive,
        'rolled-up': this.isLeftActive && !this.isCenterActive,
        balance: this.isCenterActive,
        shadow: !this.isLeftActive && this.isCenterActive,
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    setLeftActive() {
      this.isLeftActive = true
      this.isCenterActive = false
      this.$refs.leftBox.style.transform = 'scale(1)'
    },
    setRightActive() {
      this.isLeftActive = false
      this.isCenterActive = false
      this.$refs.rightBox.style.transform = 'scale(1)'
    },
    risizeHandler(e) {
      // console.log(window.innerWidth + ' x ' + window.innerHeight)
    },
    scaleHover(enter, obj) {
      if (!this.isCenterActive) return
      if (enter) obj.style.transform = 'scale(1.06)'
      else obj.style.transform = 'scale(1)'
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
.rolled-up {
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 1%;
}
.rolled-up .slide-title {
  font-size: 0px;
}
.rolled-up:hover {
  width: 25%;
}
.rolled-up:hover .slide-title {
  font-size: 3rem;
}
.open {
  width: 99%;
}
.balance {
  width: 33.33%;
}
// .balance:hover {
//   width: 35%;
// }
.eyelet {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  margin-top: -50px;
  border-radius: 100%;
  z-index: -1;
}
.eyelet-left {
  left: 91%;
  padding: 0 0 0 3rem;
  background: $main-light-color;
}
.eyelet-right {
  right: 91%;
  padding: 0 3rem 0 0;
  background: $side-dark-color;
}

.slide-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58rem;
  font-size: 3.5rem;
  color: white;
  text-shadow: 0 0 0.5rem black;
  z-index: 2;
}
.left {
  position: relative;
  left: 0;
  cursor: pointer;
  background: $main-light-color;
}
.right {
  position: relative;
  right: 0;
  cursor: pointer;
  // margin-right: -5%;
  background: $side-dark-color;
}
// .right:hover {
//   transform: translateX(-5%);
// }
.centerBox {
  padding: 3rem 0 3rem 0;
  text-align: center;
  width: 43.33%;
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

.content {
  background: white;
}

.rolled-enter-active,
.rolled-leave-active {
  transition: all 0.6s;
}
.rolled-enter,
.rolled-leave-to {
  width: 0;
  opacity: 0;
}
</style>
