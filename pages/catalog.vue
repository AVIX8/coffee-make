<template>
  <div id="catalogBox">
    <div id="path">Каталог/Кофе</div>
    <div id="searchBox" class="hd shadowBox">
      <div id="sortBox">
        Сортировать по:
        <button class="sortButton">Дате добавления</button>
        <button class="sortButton">Цене</button>
      </div>
      <SearchBox />
    </div>
    <div ref="selectedTags" class="selectedTags hd">
      <SelectedTags :selected="selected" />
    </div>
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
  layout: 'adaptivLayout',
  transition: 'catalog',
  data() {
    return {
      path: {},
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
            'Вьетнам',
            'Гватемала',
            'Индонезия',
            'Колумбия',
            'Уганда',
            'Вьетнам Тай Нгуен',
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
    this.$nextTick(this.resizeHandler())
    // this.$store.dispatch('api/getCategories', '').then((res) => {
    //   console.log(res)
    // })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    resizeHandler() {
      const remSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      )
      this.$refs.filtres.style.width =
        (this.$store.state.windowWidth - 30 * remSize) / 4 + 'px'
      this.$refs.selectedTags.style.left =
        (this.$store.state.windowWidth - 30 * remSize) / 4 +
        remSize * 15 +
        25 +
        'px'
      this.$refs.selectedTags.style.width =
        ((this.$store.state.windowWidth - 30 * remSize) / 4) * 3 - 50 + 'px'
    },
    scrollHandler() {
      if (window.scrollY > 50) this.$refs.filtres.style.top = '1%'
      else this.$refs.filtres.style.top = '15%'
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
  grid-template-columns: 2fr 1fr;
  // position: absolute;
  // right: 13%;
  align-items: center;
  width: 71%;

  margin-left: 27%;
  margin-bottom: 0.1rem;
  padding: 0.5rem 2rem;
  background: white;
}
.selectedTags {
  position: absolute;
  // background: blue;
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: 'fl pr pr pr';
  margin-top: 1rem;
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
  box-shadow: 0 1px 0.15rem gray;
}
.filtres {
  position: relative;
  position: fixed;
  top: 15%;
  width: 360px;
  // width: 100%;
  height: fit-content;

  // text-align: center;

  background: whitesmoke;
  background: white;
  // background: $main-light-color;
  transition: top 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.categoryTitle {
  margin: 1rem 0 0 2rem;
  font-size: 2rem;
  // border-bottom: 1px solid black;
  // background: blue;
}
#sortBox {
}
.sortButton {
  margin: 0 0.5rem;
  padding: 2px 0;
  border-bottom: 1px dashed black;
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
