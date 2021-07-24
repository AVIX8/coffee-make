<template>
  <v-card outlined class="">
    <v-card-title class="py-1">
      Варианты товара
      <v-spacer />
      <v-btn color="primary" icon @click="addVariant">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-card-title>
    <div v-if="value.length > 1">
      <v-row class="mx-0">
        <div
          v-for="(attribute, index) in attributes"
          :key="index"
          class="pa-3"
          style="flex-wrap: nowrap; display: flex"
        >
          <A-Autocomplete
            v-model="attribute.title"
            class="my-auto"
            hide-details
            :items="titleExamples"
            dense
            :label="`Атрибут ${index + 1}`"
          />
          <v-btn
            class="my-auto"
            small
            icon
            color="error"
            @click="delAttr(attribute.title)"
          >
            <v-icon dense> mdi-close </v-icon>
          </v-btn>
        </div>
        <v-btn class="ma-3" small @click="addAttr">Добавить атрибут</v-btn>
      </v-row>
    </div>

    <v-simple-table dense class="pb-4">
      <thead>
        <tr>
          <th class="text-left">SKU</th>
          <th class="text-left">Цена</th>
          <th class="text-left text-no-wrap">В наличии</th>
          <th v-for="(attr, index) in attributes" :key="index">
            {{ attr.title }}
          </th>
          <th></th>
        </tr>
      </thead>
      <div class="pb-4"></div>
      <tbody>
        <tr v-for="(item, i) in value" :key="i">
          <td>
            <v-text-field v-model="item.SKU" hide-details dense />
          </td>
          <td>
            <v-text-field v-model="item.price" hide-details dense prefix="₽" />
          </td>
          <td>
            <v-checkbox
              v-model="item.inStock"
              dense
              hide-details
              class="my-auto py-0"
            />
          </td>
          <td v-for="(attr, index) in item.attributes" :key="index">
            <A-Autocomplete
              v-model="attr.value"
              hide-details
              dense
              :items="examples[attr.title]"
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
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    examples: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data: () => ({
    tmpAttr: '',
    attributes: [],
    defaultVariant: {
      SKU: '',
      price: null,
      inStock: false,
      attributes: [],
    },
  }),
  computed: {
    titleExamples() {
      return Object.keys(this.examples)
    },
  },
  watch: {
    value(val) {
      this.handleVariants(val)
    },
    attributes: {
      deep: true,
      handler(val) {
        this.attributes.forEach((attr, index) => {
          this.value.forEach((variant) => {
            variant.attributes[index].title = attr.title
          })
        })
      },
    },
  },
  mounted() {
    this.handleVariants(this.value)
  },
  methods: {
    handleVariants(val) {
      if (val.length === 0)
        return val.push(JSON.parse(JSON.stringify(this.defaultVariant)))
      this.attributes = val[0].attributes.map((x) => {
        return { title: x.title }
      })
    },
    addVariant() {
      const variant = JSON.parse(JSON.stringify(this.defaultVariant))
      variant.attributes = this.attributes.map((x) => {
        return { title: x.title, valie: '' }
      })
      this.value.push(variant)
    },
    addAttr() {
      this.attributes.push({ title: '' })
      this.value.forEach((variant) => {
        variant.attributes.push({
          title: '',
          value: '',
        })
      })
    },
    delAttr(title) {
      this.attributes = this.attributes.filter((x) => {
        return x.title !== title
      })
      this.value.forEach((variant) => {
        variant.attributes = variant.attributes.filter((x) => x.title !== title)
      })
    },
  },
}
</script>

<style scoped>
td {
  border: none !important;
}
</style>
