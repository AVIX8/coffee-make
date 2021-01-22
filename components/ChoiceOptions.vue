<template>
  <div class="choiseBox">
    <div class="choice">
      <button @click="btnClick">{{ now }}</button>
      <transition name="down">
        <ul v-show="isOpen">
          <li
            v-for="(variant, i) in options.variants"
            :key="i"
            @click="liClick(variant.option)"
          >
            {{ variant.option }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    options: { type: Object, required: true },
  },
  data() {
    return {
      isOpen: false,
      now: this.options.variants[0].option,
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'getIsMobile',
    }),
    // isActive() {
    //   if (this.$props.options.variants[this.index]
    // },
  },
  mounted() {
    // this.$refs.lft.disabled = true
  },
  methods: {
    btnClick() {
      this.isOpen = !this.isOpen
    },
    liClick(option) {
      this.isOpen = false
      this.now = option
    },
  },
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Ruda';
  src: url(/fonts/Ruda.ttf); /* Путь к файлу со шрифтом */
}
@media screen and (max-width: $laptop) {
  .choiseBox {
    height: 2rem;
    width: 13rem;

    // background: white;
  }
  .choice {
    position: relative;
    display: grid;
    // grid-template-columns: 1fr 1fr 2fr 1fr 1fr;

    background: white;

    border-radius: 20px;
    border: 0.2rem solid #32bebd;

    box-shadow: 0.2rem 0.2rem 0.3rem gray;

    transition: all 1s;
  }

  select {
  }

  option {
    display: flex;
    align-items: center;
    justify-content: center;

    color: gray;
    font-size: 1rem;
    text-align: center;

    border-radius: 0 0 20px 20px;
    border: red 2px solid;

    transition: all 1s;
  }

  .down-enter-active,
  .down-leave-active {
    transition: all 1s;
  }
  .down-enter,
  .down-leave-to {
    opacity: 0;
  }
}

@media screen and (max-width: $mobile) {
}
</style>
