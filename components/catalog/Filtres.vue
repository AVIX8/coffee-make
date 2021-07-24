<template>
  <div id="filtresBox" ref="filtresBox">
    <button
      v-if="!isFiltresOpen && $device.isMobile"
      class="openButton"
      :class="{ 'openButton-empty': !isSelectedEmpty }"
      @click="isFiltresOpen = true"
    >
      Фильтры
      <span v-if="getSelectedCount !== 0">{{
        '(' + getSelectedCount + ')'
      }}</span>
    </button>
    <div v-if="isFiltresOpen || $device.isDesktop" class="c-filtres">
      <button
        v-if="$device.isMobile"
        class="clearButton"
        style="font-weight: bold"
        @click="isFiltresOpen = false"
      >
        Закрыть
      </button>
      <transition name="rolled-top">
        <button v-if="!isSelectedEmpty" class="clearButton" @click="removeAll">
          Очистить всё
        </button>
      </transition>
      <FilterOptions
        v-for="(filter, i) in filtres"
        :key="i"
        class="filter"
        :filter="filter"
        :open="i === 0 || i === 1"
        :selected="selected[filter.title]"
        @addFilter="addFilter"
        @removeFilter="removeFilter"
      ></FilterOptions>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filtres: { type: Array, required: true },
    selected: { type: Object, required: true },
  },
  data() {
    return {
      isFiltresOpen: false,
    }
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
        if (this.selected[key].length > 0) return false
      return true
    },
    getSelectedCount() {
      let count = 0
      for (const key in this.selected)
        if (this.selected[key].length > 0) count++
      return count
    },
  },
  watch: {},
  mounted() {
    if (this.$device.isMobile) return
    this.$refs.filtresBox.style.maxHeight =
      this.$store.state.windowHeight - 210 + 'px'
  },
  methods: {
    addFilter(value, filter) {
      this.selected[filter].push(value)
      // this.$emit('addFilter', value, filter)
    },
    removeFilter(value, filter) {
      this.selected[filter].splice(this.selected[filter].indexOf(value), 1)
      // this.$emit('removeFilter', value, filter)
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
  overflow: scroll;
}
.filter {
  margin-bottom: 1rem;
  width: 100%;
}
.filter:last-child {
  margin-bottom: 0;
}
.clearButton {
  margin-bottom: 1rem;
  padding: 0.3rem 1rem;
  height: 2rem;
  width: 100%;
  font-size: 0.9rem;
  background: white;
  border: 1px black solid;
  border-radius: 20px;
  transition: all 0.3s;
  z-index: 0;
}
.clearButton:hover {
  color: white;
  background: black;
  background: $main-color;
  border-color: $main-light-color;
}
.openButton {
  padding: 0.3rem 1rem;
  height: 2rem;
  width: 100%;
  font-size: 0.9rem;
  text-align: center;
  background: $main-light-color;
  background: white;
  border: 1px black solid;
  border-radius: 20px;
  transition: all 0.3s;
  z-index: 0;
}
.openButton-empty {
  color: white;
  background: $main-color;
  border-color: $main-color;
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
  .c-filtres {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 0;
    padding: 1rem;
    width: 100%;
    height: 100%;
    border-radius: 0;
    background: whitesmoke;
    z-index: 1;
  }
}
</style>
