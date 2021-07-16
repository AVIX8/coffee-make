<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          isNew ? 'Добавление товара' : 'Редактирование товара'
        }}</span>
      </v-card-title>
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
            <v-switch
              v-model="severalOptions"
              class="mx-2 mt-0"
              inset
              outlined
              label="Несколько опций"
            ></v-switch>

            <A-Autocomplete
              v-if="severalOptions"
              v-model="product.optionTitle"
              outlined
              label="Название атрибута для выбора опции"
              :items="optionTitleExamples"
            />

            <A-SmallTable
              v-model="product.attributes"
              :title="severalOptions ? 'Дополнительные атрибуты' : 'Атрибуты'"
              :examples="filteredAttributeExamples"
            />

            <A-SmallTable
              v-if="severalOptions"
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
            />

            <v-text-field
              v-model="product.price"
              outlined
              :disabled="severalOptions"
              :label="severalOptions ? 'Отображаемая цена' : 'Цена'"
              prefix="₽"
            ></v-text-field>

            <A-ImageBox v-model="images" />
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
    optionTitleExamples: [],
    characteristicExamples: {},
    attributeExamples: {},
    severalOptions: false,
    images: [],
  }),

  computed: {
    productCategory() {
      return this.product.category
    },
    productImgs() {
      return this.product.imgs
    },
    filteredAttributeExamples() {
      if (!this.attributeExamples[this.product.optionTitle])
        return this.attributeExamples
      const tmp = { ...this.attributeExamples }
      delete tmp[this.product.optionTitle]
      return tmp
    },
    displayedPrice() {
      if (this.severalOptions && this.product.options.length)
        return this.product.options[0].price
      return null
    },
  },

  watch: {
    productImgs(imgs) {
      if (imgs?.length)
        this.images = imgs.map((id) => {
          return {
            imageURL: this.imageIdToURL(id),
            id,
          }
        })
      else this.images = []
    },
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
    displayedPrice(val) {
      if (val != null) {
        this.product.price = val
      }
    },
  },
  methods: {
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
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
      this.product.images = this.images
      const imageFiles = this.images.filter((x) => x.file).map((x) => x.file)
      this.$emit('save', { product: this.product, imageFiles })
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
          this.optionTitleExamples = res.optionTitles
        })
    },
  },
}
</script>
