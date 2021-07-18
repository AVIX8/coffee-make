<template>
  <div id="catalogBox">
    <ProductDialog v-model="isView" title="" :item="viewProduct" />

    <div id="path">Каталог/Кофе</div>
    <div id="searchBox" class="hd shadowBox">
      <div id="sortBox">
        Сортировать по:
        <button class="sortButton">Дате добавления</button>
        <button class="sortButton">Цене</button>
      </div>
      <SearchBox />
    </div>
    <div v-if="$device.isDesktop" ref="selectedTags" class="selectedTags hd">
      <SelectedTags :selected="selected" />
    </div>
    <div class="content">
      <div ref="filtres" class="filtres fl shadowBox">
        <div v-if="$device.isDesktop" class="categoryTitle">Кофе</div>
        <Filtres :filtres="filtres" :selected="selected" />
      </div>
      <ProductList class="pr" @openProduct="setViewProduct" />
    </div>
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
      isView: false,
      path: {},
      selected: {
        Купаж: [],
        Обжарка: [],
        Сорт: [],
        Кислотность: [],
        География: [],
      },
      filtres: [],
      viewProduct: {},
    }
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    // window.addEventListener('scroll', this.scrollHandler)
    this.resizeHandler()
    // this.scrollHandler()

    // Получение фильтров
    this.$store.dispatch('api/getCategoryFilters', '/Кофе').then((res) => {
      this.filtres = res
    })
    // Получение товаров
    this.$store
      .dispatch('api/getProducts', { category: '/Кофе' })
      .then((res) => {
        // this.products
        console.log('Товары:', res)
      })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    // window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    resizeHandler() {
      const remSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      )

      if (this.$device.isMobile) return
      this.$refs.filtres.style.width =
        (this.$store.state.windowWidth - 30 * remSize) / 4 + 'px'

      this.$refs.selectedTags.style.left =
        (this.$store.state.windowWidth - 30 * remSize) / 4 +
        // eslint-disable-next-line prettier/prettier
        remSize * 15 + 25 + 'px'
      this.$refs.selectedTags.style.width =
        ((this.$store.state.windowWidth - 30 * remSize) / 4) * 3 - 50 + 'px'
    },
    scrollHandler() {
      // this.$refs.filtres.style.position = 'fixed'
      // if (window.scrollY > 50) this.$refs.filtres.style.top = '1%'
      // else this.$refs.filtres.style.top = '15%'
    },
    setViewProduct(product) {
      this.viewProduct = product
      this.isView = true
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
}
#searchBox {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  width: 71%;

  margin-left: 27%;
  margin-bottom: 0.1rem;
  padding: 0.5rem 2rem;
  background: white;
}
.selectedTags {
  position: absolute;
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: 'fl pr pr pr';
  margin-top: 1rem;
  height: 100%;
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
  position: sticky;
  top: 1%;
  margin-top: -4rem;
  width: 360px;
  height: fit-content;

  background: whitesmoke;
  background: white;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}
.categoryTitle {
  margin: 1rem 0 0 2rem;
  font-size: 2rem;
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
@media screen and (max-width: $mobile) {
  #catalogBox {
    position: relative;
    padding: 0 1rem;
    padding-bottom: 5rem;
    background: whitesmoke;
  }
  #path {
    padding: 0;
  }
  #searchBox {
    grid-template-columns: 1fr 1fr;
    width: auto;
    margin: 0;
    padding: 0.5rem;
    font-size: 0.6rem;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
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
  .filtres {
    position: unset;
    margin: 0;
    margin-bottom: 1rem;
  }
}
</style>
