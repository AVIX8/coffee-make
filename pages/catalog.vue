<template>
  <div id="catalogBox">
    <div id="path">Каталог/Кофе</div>
    <!-- <div id="searchBox" class="hd shadowBox">
      <SelectedTags :selected="selected" />
      <SearchBox />
    </div> -->
    <!-- <div class="fake-shadow"></div> -->
    <div class="content">
      <div ref="filtres" class="filtres fl shadowBox">
        <div class="categoryTitle">Кофе</div>
        <Filtres :filtres="filtres" :selected="selected" />
      </div>
      <ProductList ref="productList" class="productList pr" />
    </div>
    <!-- <div class="fake-shadow"></div> -->
  </div>
</template>

<script>
// import SelectedTags from '../components/SelectedTags.vue'
export default {
  // components: { SelectedTags },
  layout: 'leftLayout',
  data() {
    return {
      selected: {
        Купаж: [],
        Обжарка: [],
        Сорт: [],
        Кислотность: [],
        География: [],
      },
      filtres: [
        {
          title: 'Сорт',
          values: [
            '100% Арабика',
            'Арабика + Робуста',
            'Моносорт',
            'Смесь моносортов',
          ],
        },
        {
          title: 'Купаж',
          values: [
            'Арабика 100%',
            'Арабика 50%, Робуста 50%',
            'Арабика 60%, Робуста 40%',
            'Арабика 70%, Робуста 30%',
            'Арабика 80%, Робуста 20%',
            'Смесь',
          ],
        },
        {
          title: 'Обжарка',
          values: ['Очень тёмная', 'Средняя', 'Тёмная'],
        },
        {
          title: 'Кислотность',
          values: ['Без кислотности', 'Низкая', 'Средняя'],
        },
        {
          title: 'География',
          values: [
            'Бразилия',
            'Бразилия Моджиана, Колумбия Супремо',
            'Бразилия, Вьетнам',
            'Бразилия, Гватемала, Индонезия',
            'Бразилия, Колумбия',
            'Бразилия, Колумбия, Гватемала',
            'Бразилия, Уганда',
            'Вьетнам Тай Нгуен',
            'Колумбия, Гватемала, Уганда, Вьетнам',
            'Мексика, Чьяпас',
            'Респ. Гондурас Сан Маркос',
          ],
        },
      ],
    }
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('scroll', this.scrollHandler)
    // this.$store.dispatch('api/getCategories', '').then((res) => {
    //   console.log(res)
    // })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler() {
      if (window.scrollY > 50) this.$refs.filtres.style.top = '3%'
      else this.$refs.filtres.style.top = '16%'
    },
  },
}
</script>

<style scoped lang="scss">
#catalogBox {
  position: relative;
  padding: 0 15rem 5rem 15rem;
  background: whitesmoke;
  // background: $main-light-color;
}
#path {
  display: flex;
  align-items: center;
  padding-left: 2rem;
  height: 3rem;
  width: 100%;
  // background: magenta;
}
#searchBox {
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;

  margin-bottom: 0.8rem;
  padding: 0 1rem;
  background: white;
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: 'fl pr pr pr';
  height: 100%;
  // background: white;
  // background: $main-light-color;
}

.hd {
  grid-area: hd;
  margin-bottom: 1rem;
}
.fl {
  grid-area: fl;
}
.pr {
  grid-area: pr;
}
.shadowBox {
  border-radius: 20px;
  box-shadow: 0 0 0.8rem gray;
}
.filtres {
  position: relative;
  position: fixed;
  top: 18%;
  width: 19%;
  // width: 100%;
  height: fit-content;

  // text-align: center;

  background: whitesmoke;
  // background: $main-light-color;
  transition: top 0.2s;
}
.categoryTitle {
  margin: 1rem 0 0 2rem;
  font-size: 2rem;
}
.productList {
  // height: 50rem;
}
.fake-shadow {
  position: absolute;
  margin-top: 0.2rem;
  left: 39%;
  width: 47%;
  background: whitesmoke;
  box-shadow: 0 0 0.4rem 0.8rem whitesmoke;
  z-index: 2;
}
</style>
