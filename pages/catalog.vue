<template>
  <div id="catalogBox">
    <div id="path" class="ph">Каталог/Кофе</div>
    <div class="hd">
      <CatalogPanel
        :sort="sortTitles"
        class="shadowBox"
        @search="setSearch"
        @sorting="setSort"
      />
      <div v-if="$device.isDesktop">
        <SelectedTags :selected="selected" />
      </div>
    </div>

    <div ref="filtres" class="filtres fl shadowBox">
      <div v-if="$device.isDesktop" class="categoryTitle">Кофе</div>
      <Filtres :filtres="filtres" :selected="selected" />
    </div>
    <ProductList
      class="pr"
      :sort="sort"
      :search="searchText"
      :selected="selected"
    />
  </div>
</template>

<script>
export default {
  layout: 'adaptivLayout',
  transition: 'catalog',
  data() {
    return {
      path: {},
      selected: {},
      filtres: [],
      sort: {},
      sortTitles: [
        {
          title: 'date',
          text: /* Сортировать по... */ 'Дате добавления',
          isInverted: true,
        },
        {
          title: 'variants.price',
          text: /* Сортировать по... */ 'Цене',
          isInverted: true,
        },
      ],
      searchText: '',
    }
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()

    // Получение фильтров
    this.$store.dispatch('api/getCategoryFilters', '/Кофе').then((res) => {
      this.filtres = []
      this.selected = {}
      for (const [title, values] of Object.entries(res)) {
        this.filtres.push({ title, values })
        // this.selected[title] = []
        this.$set(this.selected, title, [])
      }
    })

    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 900)
    // })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler() {
      const remSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      )

      if (this.$device.isMobile) return
      this.$refs.filtres.style.width =
        (this.$store.state.windowWidth - 30 * remSize) / 4 + 'px'
    },
    setSearch(text) {
      this.searchText = text
      console.log(this.searchText)
    },
    setSort(data) {
      if (this.sort[data]) this.sort[data] *= -1
      else {
        this.sort = {}
        this.$set(this.sort, data, 1)
      }
    },
  },
}
</script>

<style scoped lang="scss">
#catalogBox {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: max-content max-content auto;
  gap: 1rem;
  grid-auto-flow: row;
  grid-template-areas:
    'ph ph ph ph'
    'fl hd hd hd'
    'fl pr pr pr';
  padding: 0 10% 5rem 10%;
  width: 100%;
  height: 100%;
  min-height: 800px;
  background: whitesmoke;
}
.ph {
  grid-area: ph;
}
.fl {
  grid-area: fl;
}
.hd {
  grid-area: hd;
}
.pr {
  grid-area: pr;
}

#path {
  display: flex;
  align-items: center;
  padding-left: 2rem;
  height: 3rem;
  width: 100%;
}

.shadowBox {
  border-radius: 20px;
  box-shadow: 0 1px 0.15rem gray;
}
.filtres {
  position: sticky;
  top: 1%;
  margin-bottom: 2rem;
  width: 360px;
  height: fit-content;

  background: white;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}
.categoryTitle {
  margin: 1rem 0 0 2rem;
  font-size: 2rem;
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
    padding: 0 1rem;
    padding-bottom: 5rem;

    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content max-content auto;
    grid-template-areas:
      'ph'
      'hd'
      'fl'
      'pr';
    gap: 0.5rem;
  }
  #path {
    padding: 0;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
  }
  .filtres {
    position: unset;
    margin: 0;
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
