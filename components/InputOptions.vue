<template>
  <div class="choiseBox">
    <div class="choice">
      <!-- <button ref="lft" class="left" @click="leftClick">
        <v-icon>mdi-chevron-left</v-icon>
      </button>
      <h5
        v-for="(variant, i) in options.variants"
        :key="i"
        class="option"
        :class="{ activeOption: index === i }"
      >
        {{ variant.option }}
      </h5>
      <button ref="rht" class="right" @click="rightClick">
        <v-icon>mdi-chevron-right</v-icon>
      </button> -->
      <select v-model="selected">
        <option disabled value="">Выберите один из вариантов</option>
        <option>А</option>
        <option>Б</option>
        <option>В</option>
      </select>
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
      index: 0,
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
    leftClick() {
      this.$refs.rht.disabled = false
      if (--this.index <= 0) {
        this.$refs.lft.disabled = true
      }
    },
    rightClick() {
      this.$refs.lft.disabled = false
      if (++this.index === this.$props.options.variants.length - 1) {
        this.$refs.rht.disabled = true
      }
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
  }

  .left,
  .right {
    padding: 0 0.3rem 0 0.3rem;
  }
  .left:hover {
    background-image: linear-gradient(
      to left,
      #ffffff,
      #bbefff,
      #95dfde,
      #6bcece,
      #32bebd
    );
    border-radius: 30px 0 0 30px;
  }
  .right:hover {
    background-image: linear-gradient(
      to right,
      #ffffff,
      #bbefff,
      #95dfde,
      #6bcece,
      #32bebd
    );
    border-radius: 0 30px 30px 0;
  }
  .left:disabled,
  .right:disabled {
    opacity: 0;
  }
  .option {
    display: flex;
    align-items: center;
    justify-content: center;

    color: gray;
    font-size: 1rem;
    text-align: center;

    // transition: all 0.1s;
  }
  .activeOption {
    color: black;
    font-size: 1.5rem;
  }
}

@media screen and (max-width: $mobile) {
}
</style>
