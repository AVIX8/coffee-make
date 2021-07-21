<template>
  <div id="businessBox" class="container">
    <div class="head-row shadow">
      <ContactBox
        title="Бесплатный тест"
        text="Привезем 3 любых пробника и предоставим автоматическую кофемашину в тест на 7 дней"
        background-img="red_men.png"
      />
      <ContactBox
        style="margin-top: 1rem"
        title="МЫ ГОТОВЫ ПОМОЧЬ"
        title-color="red"
        text="Оставьте заявку и наши менеджеры помогут подобрать для вас кофе исходя из ваших предпочтений по вкусу и способу приготовления."
        background-img="coffee_machine3.jpg"
      />
    </div>
    <img
      v-for="i in 8"
      :key="i"
      class="infoImg shadow"
      :class="[i % 2 == 0 ? 'right-col' : 'left-col']"
      :src="'\\business\\' + i + '.png'"
    />
  </div>
</template>

<script>
export default {
  layout: 'adaptivLayout',
  transition: 'business',
  middleware: 'unavailableOnMobile',
  data() {
    return {}
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('scroll', this.scrollHandler)
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 100)
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    resizeHandler() {},
    scrollHandler() {},
  },
}
</script>

<style scoped lang="scss">
#businessBox {
  padding: 1rem 15% 5rem 15%;
}
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 30px;
  justify-items: center;
  align-items: center;
}

.left-col {
  grid-column: 1;
}
.right-col {
  grid-column: 2;
}
.head-row {
  grid-row: 1;
  grid-column: span 2;
}

.shadow {
  filter: drop-shadow(0 0.05rem 0.2rem gray);
}
.infoImg {
  width: 100%;
  border-radius: 20px;
  background: gray;
  transition: all 0.3s;
}
// .infoImg:hover {
//   transform: scale(1.01);
//   box-shadow: 0 0.5rem 1rem gray;
// }
</style>
