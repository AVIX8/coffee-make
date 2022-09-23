<template>
  <div class="catalog-panelBox">
    <div class="sortBox">
      Сортировать по:
      <button
        v-for="(s, i) in sort"
        :key="i"
        class="sortButton"
        :class="{ 'sortButton-active': isActive(s.title) }"
        @click="setSort(s)"
      >
        {{ s.text }}
        <v-icon v-if="s.isInverted" small>{{ sortIcon(s.title) }}</v-icon>
      </button>
    </div>
    <SearchBox v-model="searchText" />
  </div>
</template>

<script>
export default {
  props: {
    sort: { type: Array, required: true },
  },
  data() {
    return {
      tempSort: {},
      searchText: '',
    }
  },
  computed: {},
  watch: {
    searchText(val) {
      this.$emit('search', val)
    },
  },
  mounted() {},
  methods: {
    isActive(sortName) {
      return Object.keys(this.tempSort)[0] === sortName
    },
    sortIcon(sortName) {
      if (this.isActive(sortName))
        if (this.tempSort[sortName] === 1) return 'mdi-chevron-triple-up'
        else return 'mdi-chevron-triple-down'
      else return ''
    },
    setSort(data) {
      this.$emit('sorting', data.title)
      if (!data.isInverted) return
      if (this.tempSort[data.title]) this.tempSort[data.title] *= -1
      else {
        this.tempSort = {}
        this.$set(this.tempSort, data.title, 1)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.catalog-panelBox {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  width: 100%;

  margin-bottom: 0.1rem;
  padding: 0.5rem 2rem;
  background: white;
}
.sortButton {
  margin: 0 0.5rem;
  padding: 2px 0;
  border-bottom: 1px dashed black;
}
.rolled-top-enter-active,
.rolled-top-leave-active {
  transition: all 0.6s;
}
.rolled-top-enter,
.rolled-top-leave-to {
  transform: translateY(-3rem);
  opacity: 0;
}
@media screen and (max-width: $mobile) {
  .catalog-panelBox {
    grid-template-columns: none;
    grid-template-rows: max-content max-content;
    gap: 2rem;

    margin: 0;
    padding: 0.5rem;
    font-size: 0.6rem;
  }
  .sortBox {
    display: grid;
    font-size: 0.9rem;
    // background: aquamarine;
  }
  .sortButton {
    margin: 0.2rem;
    font-size: 1.1rem;
    background: whitesmoke;
    border-radius: 20px;
    border: 1px solid gray;
  }
  .sortButton-active {
    background: white;
    border-color: $main-color;
  }
}
</style>
