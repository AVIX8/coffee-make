<template>
  <v-dialog v-model="dialog" fullscreen scrollable>
    <v-card>
      <v-card-title>
        {{ isNew ? 'Добавление товара' : 'Редактирование товара' }}
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          :loading="waiting"
          class="mx-2"
          @click="close"
        >
          Отмена
        </v-btn>
        <v-btn
          depressed
          color="primary"
          :loading="waiting"
          class="mx-2"
          @click="save"
        >
          <v-icon>mdi-content-save</v-icon>&nbsp;Сохранить
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-3">
        <v-row class="mx-0">
          <v-col>
            <v-text-field
              v-model="product.title"
              dense
              hide-details
              class="pb-4"
              label="Название"
              outlined
            ></v-text-field>

            <v-row class="mx-0 mb-2">
              <div
                v-for="(category, i) in nextCategories"
                :key="i"
                class="ma-1"
                @click="addCategory(category)"
              >
                <v-chip small link>{{ category.title }}</v-chip>
              </div>
            </v-row>

            <v-text-field
              v-model="product.category"
              dense
              hide-details
              class="mb-4"
              label="Категория"
              outlined
              clearable
            ></v-text-field>

            <v-textarea
              v-model="product.descr"
              dense
              hide-details
              class="mb-4"
              rows="1"
              outlined
              auto-grow
              label="Описание"
            ></v-textarea>

            <A-ImageBox v-model="images" />
          </v-col>

          <v-col>
            <A-PropertyTable
              v-model="product.attributes"
              title="Атрибуты"
              class="mb-4"
              :set-examples="isNew"
              :examples="attributeExamples"
            />
            <A-PropertyTable
              v-model="product.characteristics"
              title="Характеристики"
              :set-examples="isNew"
              :examples="characteristicExamples"
            />
          </v-col>
        </v-row>
        <v-row class="mx-0">
          <v-col>
            <A-ProductVariants
              v-model="product.variants"
              :examples="variantsAttributeExamples"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    saveFunction: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    waiting: false,
    defaultProduct: {
      title: '',
      category: '',
      descr: '',
      attributes: [],
      characteristics: [],
      variants: [],
    },
    product: {},
    isNew: false,
    nextCategories: [],
    characteristicExamples: {},
    attributeExamples: {},
    variantsAttributeExamples: {},
    images: [],
  }),

  computed: {
    productCategory() {
      return this.product.category
    },
    productImgs() {
      return this.product.imgs || []
    },
  },

  watch: {
    productImgs(imgs) {
      console.log(imgs)
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
  },
  methods: {
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
    open(product) {
      this.isNew = !product
      this.nextCategories = []
      this.characteristicExamples = {}
      this.attributeExamples = {}

      if (this.isNew)
        this.product = JSON.parse(JSON.stringify(this.defaultProduct))
      else this.product = JSON.parse(JSON.stringify(product))

      if (!this.product?.variants?.length)
        this.$set(this.product, 'variants', [])
      this.updateCategoryInfo()
      this.severalOptions = !!this.product.optionTitle
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    async save() {
      this.product.images = this.images
      const imageFiles = this.images.filter((x) => x.file).map((x) => x.file)
      this.waiting = true
      try {
        await this.saveFunction({ product: this.product, imageFiles })
        this.$toast.success(
          `Товар был успешно ${this.isNew ? 'создан' : 'обновлён'}`,
          { duration: 4000 }
        )
        this.dialog = false
      } catch (err) {
        this.$toast.error(
          err?.response?.data?.message ||
            `Не удалось ${this.isNew ? 'создать' : 'изменить'} товар`,
          { duration: 4000 }
        )
      }
      this.waiting = false
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
          this.variantsAttributeExamples = res.variantsAttributes
        })
    },
  },
}
</script>
