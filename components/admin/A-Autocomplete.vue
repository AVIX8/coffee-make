<template>
  <div>
    <v-autocomplete
      v-if="filtered.length"
      v-model="selected"
      v-click-outside="selectValue"
      :dense="dense"
      :hide-details="hideDetails"
      validate-on-blur
      hide-no-data
      :outlined="outlined"
      :items="allItems"
      :label="label"
      :search-input="value"
      @update:search-input="searchInput"
      @keydown.tab="selectValue"
    ></v-autocomplete>
    <v-text-field
      v-else
      :dense="dense"
      :hide-details="hideDetails"
      :outlined="outlined"
      clearable
      :label="label"
      :value="value"
      @input="input"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    outlined: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    hideDetails: { type: Boolean, default: false },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      selected: '',
    }
  },
  computed: {
    filtered() {
      return this.items.filter((x) => !!x)
    },
    allItems() {
      if (this.value.length === 0) return this.filtered
      return [this.value].concat(this.filtered)
    },
  },
  watch: {
    value(val) {
      this.selectValue()
    },
  },
  methods: {
    searchInput(val) {
      if (val !== null) this.$emit('input', val)
      else this.selectValue()
    },
    input(val) {
      this.$emit('input', val || '')
    },
    selectValue() {
      this.selected = this.value
    },
  },
}
</script>
