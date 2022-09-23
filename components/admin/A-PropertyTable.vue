<template>
  <v-card outlined>
    <v-card-title class="py-1">
      {{ title }}
      <v-spacer></v-spacer>
      <v-btn color="primary" icon @click="addItem">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-card-title>
    <div v-if="value.length">
      <v-simple-table dense class="pb-4">
        <thead>
          <tr>
            <th class="text-left">Название</th>
            <th class="text-left">Значение</th>
            <th></th>
          </tr>
        </thead>
        <div class="pb-4"></div>
        <tbody>
          <tr v-for="(item, i) in value" :key="i">
            <td>
              <v-text-field v-model="item.title" hide-details dense />
            </td>
            <td>
              <A-Autocomplete
                v-model="item.value"
                hide-details
                :items="examples[item.title]"
                dense
              />
            </td>

            <td class="text-right">
              <v-btn
                color="error"
                icon
                @click="value.splice(value.indexOf(item), 1)"
              >
                <v-icon dense> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>

    <div v-if="titleExamples.length">
      <v-divider />
      <v-row class="mx-1">
        <div
          v-for="titleEx in titleExamples"
          :key="titleEx"
          class="mx-1 my-2"
          @click="value.push({ title: titleEx })"
        >
          <v-chip link small>{{ titleEx }}</v-chip>
        </div>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    value: { type: Array, required: true },
    title: { type: String, default: '' },
    setExamples: { type: Boolean, default: false },
    examples: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data: () => ({
    headers: [
      {
        text: 'Название',
        value: 'title',
      },
      {
        text: 'Значение',
        value: 'value',
      },
    ],
  }),
  computed: {
    titleExamples() {
      const titles = this.value.map((x) => x.title)
      return Object.keys(this.examples).filter((x) => !titles.includes(x))
    },
  },
  watch: {
    examples: {
      deep: true,
      handler(val) {
        if (this.setExamples && this.value.every((x) => !x.value)) {
          const properties = Object.keys(this.examples).map((title) => {
            return { title, valie: '' }
          })
          this.$emit('input', properties)
        }
      },
    },
  },
  methods: {
    addItem() {
      this.value.push({
        title: '',
        value: '',
      })
    },
    getValueExamples(title) {
      return (this.examples[title] ?? []).sort()
    },
  },
}
</script>

<style scoped>
td {
  border: none !important;
}
</style>
