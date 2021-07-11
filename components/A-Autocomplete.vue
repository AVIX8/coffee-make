<template>
  <div>
    <v-autocomplete
      v-if="items.length > 0"
      v-model="selected"
      validate-on-blur
      hide-no-data
      :outlined="outlined"
      :items="allItems"
      :label="label"
      :search-input="value"
      @update:search-input="searchInput"
    ></v-autocomplete>
    <v-text-field
      v-else
      :outlined="outlined"
      clearable
      :label="label"
      :value="value"
      @input="(val) => $emit('input', val || '')"
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
      newItem: '',
    }
  },
  computed: {
    allItems() {
      if (this.newItem.length === 0) return this.items
      return [this.newItem].concat(this.items)
    },
  },
  watch: {
    value(val) {
      if (val !== null) {
        this.selected = val
        this.newItem = val
      } else if (this.selected !== null) {
        this.$emit('input', this.selected)
      }
    },
  },
  methods: {
    searchInput(val) {
      if (val !== null) this.$emit('input', val)
    },
  },
}
</script>
