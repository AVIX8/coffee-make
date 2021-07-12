<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          isNew ? 'Добавление товара' : 'Редактирование товара'
        }}</span>
      </v-card-title>
      {{ product }}
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="product.title"
              label="Название"
              outlined
            ></v-text-field>

            <v-row class="mx-0 mb-4">
              <div
                v-for="(category, i) in nextCategories"
                :key="i"
                class="ma-1"
                @click="addCategory(category)"
              >
                <v-chip link>{{ category.title }}</v-chip>
              </div>
            </v-row>

            <v-text-field
              v-model="product.category"
              label="Категория"
              outlined
              clearable
            ></v-text-field>

            <v-textarea
              v-model="product.descr"
              rows="1"
              outlined
              auto-grow
              label="Описание"
            ></v-textarea>

            <A-SmallTable
              v-model="product.characteristics"
              :title="'Характеристики'"
              :examples="characteristicExamples"
            ></A-SmallTable>
          </v-col>

          <v-col>
            <v-text-field
              v-model="product.price"
              outlined
              label="Цена"
              prefix="₽"
            ></v-text-field>

            <A-SmallTable
              v-model="product.attributes"
              :title="'Атрибуты'"
              :examples="attributeExamples"
            ></A-SmallTable>

            <v-switch
              v-model="severalOptions"
              class="mx-2"
              inset
              outlined
              label="Несколько опций"
            ></v-switch>

            <div v-if="severalOptions">
              <A-Autocomplete
                v-model="product.optionTitle"
                outlined
                label="Название атрибута для выбора опции"
                :items="Object.keys(attributeExamples)"
              />

              <A-SmallTable
                v-model="product.options"
                :title="'Опции'"
                :castom-headers="[
                  {
                    text: product.optionTitle || 'Атрибут',
                    sortable: false,
                    value: 'value',
                  },
                  {
                    text: 'Цена',
                    sortable: false,
                    value: 'price',
                  },
                ]"
              ></A-SmallTable>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Сохранить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    defaultProduct: {
      title: '',
      category: '',
      descr: '',
      price: null,
      attributes: [],
      characteristics: [],
      optionTitle: '',
      options: [],
    },
    product: {},
    isNew: false,
    nextCategories: [],
    characteristicExamples: {},
    attributeExamples: {},
    severalOptions: false,
  }),

  computed: {
    productCategory() {
      return this.product.category
    },
  },

  watch: {
    productCategory(val) {
      if (val == null) this.product.category = ''
      else this.updateCategoryInfo()
    },
    severalOptions(val) {
      if (val === false) {
        this.product.options = []
        this.product.optionTitle = ''
      }
    },
  },
  methods: {
    open(product) {
      if (product) this.product = JSON.parse(JSON.stringify(product))
      else this.product = JSON.parse(JSON.stringify(this.defaultProduct))

      this.isNew = !product
      this.nextCategories = []
      this.updateCategoryInfo()
      this.characteristicExamples = {}
      this.attributeExamples = {}
      this.severalOptions = !!this.product.optionTitle

      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    save() {
      this.$emit('save', this.product)
      this.dialog = false
    },
    addCategory(category) {
      this.product.category += '/' + category.title
    },
    updateCategoryInfo() {
      this.$store
        .dispatch('api/getCategories', this.product.category)
        .then((categories) => {
          this.nextCategories = categories
        })
      this.$store
        .dispatch('api/getCategoryInfo', this.product.category)
        .then((res) => {
          this.characteristicExamples = res.characteristics
          this.attributeExamples = res.attributes
        })
    },
  },
}
</script>
