<template>
  <div>
    <v-autocomplete
      v-if="items.length > 0"
      v-model="selected"
      v-click-outside="selectValue"
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
    allItems() {
      if (this.value.length === 0) return this.items
      return [this.value].concat(this.items)
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
