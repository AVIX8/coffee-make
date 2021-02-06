<template>
  <div ref="showcase" class="showcase">
    <div
      ref="container"
      class="container"
      @mouseenter="MouseEnter"
      @mouseleave="MouseLeave"
      @mousemove="MouseMove"
    >
      <div ref="card" class="card">
        <div ref="visual" class="visual">
          <transition name="circleFade">
            <div v-show="!mouseIn" ref="circle" class="circle1"></div>
          </transition>
          <transition name="circleFade">
            <div v-show="mouseIn" ref="circle" class="circle2"></div>
          </transition>

          <img ref="img" :src="product.img" :alt="product.title" />
        </div>
        <div class="info">
          <h5 ref="title" class="title">{{ product.title }}</h5>
          <h6 class="price">{{ product.price }} руб.</h6>
          <transition name="detailFade">
            <div v-show="mouseIn" ref="detail" class="detail">
              <div
                ref="detailButton"
                class="detailButton"
                @mouseenter="ButtonIn"
                @mouseleave="ButtonOut"
              >
                <nuxt-link class="detailNuxtLink" to="/item">
                  Подробнее
                </nuxt-link>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
  data() {
    return {
      mouseIn: false,
    }
  },
  computed: {},
  methods: {
    MouseMove(event) {
      if (this.$device.isMobile) return
      const xAxis =
        (this.$refs.container.clientWidth / 2 -
          (event.pageX -
            window.scrollX -
            this.$refs.container.getBoundingClientRect().left)) /
        20
      const yAxis =
        -(
          this.$refs.container.clientHeight / 2 -
          (event.pageY -
            window.scrollY -
            this.$refs.container.getBoundingClientRect().top)
        ) / 20
      this.$refs.card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    },
    MouseEnter(event) {
      if (this.$device.isMobile) return
      this.mouseIn = true

      // тень мистера ботта
      // this.$refs.card.style.boxShadow =
      // '0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)'

      // тень авикса
      this.$refs.card.style.boxShadow = '5px 5px 15px rgba(0, 0, 0, 0.3)'

      this.$refs.card.style.transition = 'all 0.1s'
      this.$refs.title.style.transform = 'translateZ(50px)'

      // this.$refs.visual.style.transform = 'translateZ(100px) rotateZ(10deg)'
      // this.$refs.visual.style.minWidth = '12rem'

      // this.$refs.circle.style.width = '12rem'
      // this.$refs.circle.style.height = '12rem'

      this.$refs.img.style.transform = 'translateZ(60px) rotateZ(0deg)'
      this.$refs.img.style.minHeight = '14rem'
      this.$refs.img.style.minWidth = '14rem'

      this.$refs.detail.style.transform = 'translateZ(25px)'
    },
    MouseLeave(event) {
      if (this.$device.isMobile) return
      this.mouseIn = false
      this.$refs.card.style.boxShadow = 'none'
      this.$refs.card.style.transition = 'all 1.5s'
      this.$refs.card.style.transform = 'rotateY(0deg) rotateX(0deg)'

      this.$refs.title.style.transform = 'translateZ(0px)'

      // this.$refs.visual.style.transform = 'translateZ(0px) rotateZ(0deg)'
      // this.$refs.visual.style.minWidth = '10rem'

      // this.$refs.circle.style.width = '10rem'
      // this.$refs.circle.style.height = '10rem'

      this.$refs.img.style.transform = 'translateZ(0px) rotateZ(0deg)'
      this.$refs.img.style.minHeight = '12rem'
      this.$refs.img.style.minWidth = '12rem'

      this.$refs.detail.style.transform = 'translateZ(0px)'
    },
    ButtonIn(event) {
      if (this.$device.isMobile) return
      this.$refs.detailButton.style.backgroundColor = '#434343'
      // this.$refs.detailButton.style.color = 'white'
      this.$refs.detailButton.style.borderColor = '#434343'
    },
    ButtonOut(event) {
      if (this.$device.isMobile) return
      this.$refs.detailButton.style.backgroundColor = 'white'
      // this.$refs.detailButton.style.color = '#2db6b5'
      this.$refs.detailButton.style.borderColor = '#2db6b5'
    },
  },
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Ruda';
  src: url(/fonts/Ruda.ttf); /* Путь к файлу со шрифтом */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.5s;
}

.showcase {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  float: left;

  margin: 1rem;

  min-width: 16rem;
  max-width: 16rem;

  /* background: red; */
}
.container {
  display: flex;
  justify-content: center;

  /* width: 100%; */
  height: 29rem;
  cursor: pointer;
  /* background-color: green; */
}
.card {
  transform-style: preserve-3d;

  padding: 1rem;

  width: 100%;

  border-radius: 40px;
  box-shadow: none;
  transition: all 0.1s ease;
  /* background: yellow; */
}

.visual {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 0.5rem 0.5rem 0.5rem;

  min-height: 15rem;

  /* background: blue; */
}
.visual img {
  width: 12rem;
  z-index: 2;
  transition: all 0.75s ease-out;
}

.circleFade-enter-active {
  transition: opacity 1s;
}
.circleFade-leave-active {
  transition: opacity 2s;
}
.circleFade-enter,
.circleFade-leave-to {
  opacity: 0;
}
.circle1 {
  width: 10rem;
  height: 10rem;
  background-image: radial-gradient(
    circle,
    #4c8c89,
    #497680,
    #4c616e,
    #494e56,
    #3d3d3d
  );
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}
.circle2 {
  position: absolute;
  width: 10rem;
  height: 10rem;
  background-image: radial-gradient(
    circle,
    #00e188,
    #00b9b0,
    #008ba9,
    #435f79,
    #3d3d3d
  );
  border-radius: 50%;
  box-shadow: inset 0 0 1rem rgb(78, 78, 78);
  z-index: 1;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4rem;

  color: #2db6b5;
  font-family: 'Ruda';
  font-weight: bold;
  text-align: center;

  transition: all 0.75s ease-out;
}
.price {
  padding: 0.5rem 1rem 1rem 1rem;

  color: #585858;
  font-family: sans-serif;
  font-weight: lighter;
  text-align: center;

  transition: all 0.75s ease-out;
}

.detailFade-enter-active,
.detailFade-leave-active {
  transition: opacity 0.5s;
}
.detailFade-enter,
.detailFade-leave-to {
  opacity: 0;
}
.detail {
  text-align: center;
  transition: all 0.75s ease-out;
}
.detailButton {
  padding: 1rem 3rem 1rem 3rem;
  margin: 0 1rem 0 1rem;

  color: #2db6b5;
  cursor: pointer;
  font-family: 'Rubik', sans-serif;
  font-weight: bolder;
  text-decoration: none;

  border: 2px #2db6b5 solid;
  border-radius: 30px;

  background-color: white;
}
.detailNuxtLink {
  text-decoration: none;
  color: #2db6b5;
}
.detailButton:hover {
  color: white;

  background-color: #60bdbc;
  transition: 'background-image' 0.5s;
}

@media screen and (max-width: $mobile) {
  .showcase {
    position: relative;
    float: left;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 0.25rem 1rem 0.25rem;

    min-width: 10rem;
    max-width: 10rem;

    // background: red;
  }
  .container {
    display: flex;
    justify-content: center;

    height: 17.5rem;

    // background-color: green;
  }
  .card {
    transform-style: preserve-3d;

    padding: 0.5rem;

    width: 100%;

    border-radius: 20px;
    box-shadow: 0 0 1rem lightgrey;
    transition: all 0.1s ease;
    // background: yellow;
  }

  .visual {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;

    min-height: 10rem;

    // background: blue;
  }
  .visual img {
    width: 10rem;
    z-index: 2;
    transition: all 0.75s ease-out;
  }

  .circle1 {
    width: 8rem;
    height: 8rem;
    background-image: radial-gradient(
      circle,
      #00e188,
      #00b9b0,
      #008ba9,
      #435f79,
      #3d3d3d
    );
    position: absolute;
    border-radius: 50%;
    z-index: 1;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 4rem;

    color: #2db6b5;
    font-family: 'Ruda';
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;

    transition: all 0.75s ease-out;
  }
  .price {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem 1rem 1rem 1rem;

    color: #585858;
    font-family: sans-serif;
    font-size: 1.1rem;
    font-weight: lighter;
    text-align: center;

    background: white;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 -1rem 1rem white;

    transition: all 0.75s ease-out;
  }

  .detailFade-enter-active,
  .detailFade-leave-active {
    transition: opacity 0.5s;
  }
  .detailFade-enter,
  .detailFade-leave-to {
    opacity: 0;
  }
  .detail {
    text-align: center;
    transition: all 0.75s ease-out;
  }
  .detailButton {
    padding: 1rem 3rem 1rem 3rem;
    margin: 0 1rem 0 1rem;

    color: #2db6b5;
    cursor: pointer;
    font-family: 'Rubik', sans-serif;
    font-weight: bolder;
    text-decoration: none;

    border: 2px #2db6b5 solid;
    border-radius: 30px;

    background-color: white;
  }
  .detailNuxtLink {
    text-decoration: none;
    color: #2db6b5;
  }
  .detailButton:hover {
    color: white;

    background-color: #60bdbc;
    transition: 'background-image' 0.5s;
  }
}
</style>
