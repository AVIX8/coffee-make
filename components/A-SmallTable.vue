<template>
  <v-card outlined min-width="550">
    <v-card-title class="pa-3"
      >{{ title }} <v-spacer></v-spacer>

      <v-btn color="primary" @click="addItem">
        <v-icon> mdi-plus </v-icon>
      </v-btn></v-card-title
    >
    <div v-if="value.length">
      <v-row class="mx-0" justify="start">
        <v-col v-for="(item, index) in headers" :key="index" md="5">
          {{ item.text }}
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <div v-for="(item, index) in value" :key="index">
        <v-row class="mx-0" align="center">
          <v-col md="5" class="py-0">
            <v-text-field v-model="item[headers[0].value]"></v-text-field>
          </v-col>
          <v-col md="5" class="py-0">
            <A-Autocomplete
              v-model="item[headers[1].value]"
              :items="examples[item[headers[0].value]]"
            />
          </v-col>
          <v-col class="ml-auto py-0" cols="auto">
            <v-btn
              color="error"
              class="pa-0"
              @click="value.splice(value.indexOf(item), 1)"
            >
              <v-icon dense> mdi-delete </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </div>

    <v-row class="mx-1">
      <div
        v-for="titleEx in titleExamples"
        :key="titleEx"
        class="mx-1 my-2"
        @click="value.push({ title: titleEx })"
      >
        <v-chip link>{{ titleEx }}</v-chip>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    value: { type: Array, required: true },
    title: { type: String, default: '' },
    castomHeaders: {
      type: Array,
      default: () => {
        return []
      },
    },
    examples: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data: () => ({
    defaultHeaders: [
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
    headers() {
      if (this.castomHeaders.length) return this.castomHeaders
      return this.defaultHeaders
    },
    titleExamples() {
      const titles = this.value.map((x) => x.title)
      return Object.keys(this.examples).filter((x) => !titles.includes(x))
    },
  },
  methods: {
    addItem() {
      const obj = {}
      obj[this.headers[0].value] = ''
      obj[this.headers[1].value] = ''
      this.value.push(obj)
    },
  },
}
</script>

<style scoped>
::v-deep .v-data-table__empty-wrapper {
  display: none;
}
</style>
