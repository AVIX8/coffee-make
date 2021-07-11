<template>
  <div id="filtresBox" ref="filtresBox">
    <!-- <div id="filtresBox"> -->
    <FilterOptions
      v-for="(filter, i) in filtres"
      :key="i"
      class="filter"
      :filter="filter"
      :open="i === 0 || i === 1"
      :selected="selected[filter.title]"
      @addFilter="addSelected"
      @removeFilter="removeSelected"
    ></FilterOptions>
    <transition name="rolled-top">
      <button v-if="isSelectedEmpty" id="clearButton" @click="removeAll">
        Очистить всё
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    filtres: { type: Array, required: true },
    selected: { type: Object, required: true },
  },
  data() {
    return {}
  },
  computed: {
    notEmptySelected() {
      const obj = {}
      for (const key in this.selected)
        if (this.selected[key].length > 0) obj[key] = this.selected[key]
      return obj
    },
    isSelectedEmpty() {
      for (const key in this.selected)
        if (this.selected[key].length > 0) return true
      return false
    },
  },
  watch: {},
  mounted() {
    this.$refs.filtresBox.style.maxHeight =
      this.$store.state.windowHeight - 200 + 'px'
  },
  methods: {
    addSelected(option, filter) {
      this.selected[filter].push(option)
    },
    removeSelected(option, filter) {
      this.selected[filter].splice(this.selected[filter].indexOf(option), 1)
    },
    removeCategory(title) {
      this.selected[title] = []
    },
    removeAll() {
      for (const key in this.selected) {
        this.selected[key] = []
      }
    },
  },
}
</script>

<style scoped lang="scss">
#filtresBox {
  padding: 1rem;
  // background: blue;
  // height: 40rem;
  overflow: scroll;
}
.filter {
  margin-bottom: 1rem;
  width: 100%;
}
.filter:last-child {
  margin-bottom: 0;
}
#selectedFiltresBox {
  margin-top: 3rem;
}
.selectedFilter {
  display: inline-block;
  margin: 0 0.5rem 0.4rem 0;
  padding: 0.3rem 1rem;
  text-align: left;
  background: lightgray;
  border-radius: 20px;
  border: 1px lightgray solid;
  transition: all 0.3s;
}
.selectedFilter:hover {
  // background: $main-light-color;
  // background: white;
  border-color: gray;
}
#clearButton {
  padding: 0.3rem 1rem;
  height: 3rem;
  width: 100%;
  background: white;
  border: 1px black solid;
  border-radius: 20px;
  transition: all 0.3s;
  z-index: 0;
}
#clearButton:hover {
  color: white;
  background: black;
  background: $main-color;
  border-color: $main-light-color;
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
}
</style>
