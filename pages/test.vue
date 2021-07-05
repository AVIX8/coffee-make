<template>
  <div class="mainBox">
    <div class="left animation" :class="leftStyle">
      <div v-show="isLeftActive" class="content">left content</div>
      <div
        v-show="!isLeftActive"
        class="title animation"
        @click="setLeftActive"
      >
        Каталог
      </div>
      <div
        v-if="isCenterActive"
        class="eyelet eyelet-left"
        @click="setLeftActive"
      >
        <v-icon large>mdi-chevron-right</v-icon>
      </div>
    </div>

    <transition name="rolled">
      <div v-if="isCenterActive" class="centerBox balance">
        <h1 v-if="isCenterActive" class="mainTitle">COFFEE MAKE</h1>
      </div>
    </transition>

    <div class="right animation" :class="rightStyle">
      <div
        v-show="isLeftActive || isCenterActive"
        class="title animation"
        @click="setRightActive"
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
  methods: {
    setLeftActive() {
      this.isLeftActive = true
      this.isCenterActive = false
    },
    setRightActive() {
      this.isLeftActive = false
      this.isCenterActive = false
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
  box-shadow: 0 0 1rem gray;
}
.animation {
  transition: all 0.5s;
}
// .hide {
//   width: 0%;
//   transition: all 1s;
// }
.rolled-up {
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 1%;
  // transition: all 1s;
}
.rolled-up .title {
  font-size: 0px;
}
.rolled-up:hover {
  width: 25%;
}
.rolled-up:hover .title {
  font-size: 3.5rem;
  // transform: rotate(90deg);
}
.open {
  width: 99%;
  // transition: all 1s;
}
.balance {
  width: 33.33%;
  // transition: all 1s;
}
.balance:hover {
  // position: relative;
  width: 35%;
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
  // z-index: -1;
  // transition: all 1s;
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

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58rem;
  font-size: 3.5rem;
  // font-size: 50px;
  color: white;
  text-shadow: 0 0 0.5rem black;
  // transition: all 1s;
  cursor: pointer;
}
.left {
  position: relative;
  left: 0;
  background: $main-light-color;
}
.right {
  position: relative;
  right: 0;
  background: $side-dark-color;
}
.centerBox {
  padding: 3rem 0 3rem 0;
  text-align: center;
  background: url(static\Coffee_logotype_styl.png) 47% 10%;
  z-index: -2;
}
.mainTitle {
  color: white;
  text-shadow: 0 5px 8px gray;
}

.content {
  background: white;
}

.left-to-right-enter-active,
.left-to-right-leave-active {
  transition: all 0.5s;
}
.left-to-right-enter,
.left-to-right-leave-to {
  transform: translateX(10rem);
}
.rolled-enter-active,
.rolled-leave-active {
  transition: all 0.5s;
}
.rolled-enter,
.rolled-leave-to {
  width: 0;
}
</style>
