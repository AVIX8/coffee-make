<template>
  <div id="selectedBox">
    <transition name="rolled">
      <button v-if="isSelectedNotEmpty" id="clearButton" @click="removeAll">
        Очистить всё
      </button>
    </transition>
    <transition name="rolled">
      <button
        v-for="(value, title) in notEmptySelected"
        :key="title"
        class="selectedFilter"
        @click="removeCategory(title)"
      >
        {{ title }}: {{ value.join('; ') }}
        <v-icon small>mdi-close</v-icon>
      </button>
    </transition>
    <!-- <transition name="rolled">
      <span v-if="!isSelectedNotEmpty">Нет фильтров</span>
    </transition> -->
  </div>
</template>

<script>
export default {
  props: {
    // filtres: { type: Array, required: true },
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
    isSelectedNotEmpty() {
      for (const key in this.selected)
        if (this.selected[key].length > 0) return true
      return false
    },
  },
  watch: {},
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
#selectedBox {
  display: flex;
  align-items: center;
  // justify-content: center;
  min-height: 3.6rem;
  padding: 0.5rem;
}
.selectedFilter {
  margin: 0.4rem 0.5rem 0.4rem 0;
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
  text-align: left;
  background: lightgray;
  border-radius: 20px;
  border: 0.0625rem lightgray solid;
  transition: all 0.3s;
}
.selectedFilter:hover {
  border-color: gray;
}
#clearButton {
  margin: 0.4rem 0.5rem 0.4rem 0;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  text-align: left;
  white-space: nowrap;
  background: white;
  border-radius: 20px;
  border: 0.0625rem black solid;
  transition: all 0.3s;
}
#clearButton:hover {
  color: white;
  background: black;
  background: $main-color;
  border-color: $main-light-color;
}
.rolled-enter-active,
.rolled-leave-active {
  transition: all 0.6s;
}
.rolled-enter,
.rolled-leave-to {
  transform: translateX(-3rem);
  opacity: 0;
}
@media screen and (max-width: $mobile) {
}
</style>
