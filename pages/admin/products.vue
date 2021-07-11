<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Товары</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="ma-2"> Фильтр </v-btn>

          <v-dialog v-model="dialog" fullscreen>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="ma-2" v-bind="attrs" v-on="on">
                Добавить
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{
                  isNew ? 'Добавление товара' : 'Редактирование товара'
                }}</span>
              </v-card-title>
              {{ tmpProduct }}
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="tmpProduct.title"
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
                      v-model="tmpProduct.category"
                      label="Категория"
                      outlined
                      clearable
                    ></v-text-field>

                    <v-textarea
                      v-model="tmpProduct.descr"
                      rows="1"
                      outlined
                      auto-grow
                      label="Описание"
                    ></v-textarea>

                    <SmallTable
                      v-model="tmpProduct.characteristics"
                      :title="'Характеристики'"
                      :examples="characteristicExamples"
                    ></SmallTable>
                  </v-col>

                  <v-col>
                    <v-text-field
                      v-model="tmpProduct.price"
                      outlined
                      label="Цена"
                      prefix="₽"
                    ></v-text-field>

                    <SmallTable
                      v-model="tmpProduct.attributes"
                      :title="'Атрибуты'"
                      :examples="attributeExamples"
                    ></SmallTable>

                    <v-switch
                      v-model="severalOptions"
                      class="mx-2"
                      inset
                      outlined
                      label="Несколько опций"
                    ></v-switch>

                    <div v-if="severalOptions">
                      <A-Autocomplete
                        v-model="tmpProduct.optionTitle"
                        outlined
                        label="Название атрибута для выбора опции"
                        :items="Object.keys(attributeExamples)"
                      />

                      <SmallTable
                        v-model="tmpProduct.options"
                        :title="'Опции'"
                        :castom-headers="[
                          {
                            text: tmpProduct.optionTitle || 'Атрибут',
                            sortable: false,
                            value: 'value',
                          },
                          {
                            text: 'Цена',
                            sortable: false,
                            value: 'price',
                          },
                        ]"
                      ></SmallTable>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">
                  Отмена
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="40%">
            <v-card>
              <v-card-title class="text-wrap"
                >Подтверждение удаления</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="closeDelete">Отмена</v-btn>
                <v-btn color="error" text @click="deleteItemConfirm"
                  >Удалить</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" color="warning" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="error" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    products: [],
    filters: {},
    skip: 0,
    nextCategories: [],
    characteristicExamples: {},
    attributeExamples: {},
    headers: [
      { text: 'Название', value: 'title' },
      { text: 'Категория', value: 'category' },
      { text: 'Цена', value: 'price' },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    tmpIndex: -1,
    tmpProduct: {},
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
    severalOptions: false,
  }),

  computed: {
    isNew() {
      return this.tmpIndex === -1
    },
    tmpProductCategory() {
      return this.tmpProduct.category
    },
  },

  watch: {
    dialog(val) {
      val || this.closeDialog()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    tmpProductCategory(val) {
      if (val == null) return (this.tmpProduct.category = '')
      this.$store.dispatch('api/getCategories', val).then((categories) => {
        this.nextCategories = [...categories]
      })
      this.$store
        .dispatch('api/getCharacteristics', this.tmpProduct.category)
        .then((res) => {
          this.characteristicExamples = res
        })

      this.$store
        .dispatch('api/getAttributes', this.tmpProduct.category)
        .then((res) => {
          this.attributeExamples = res
        })
    },
  },

  created() {
    this.initialize()
    this.tmpProduct = this.productDeepCopy(this.defaultProduct)
  },

  methods: {
    initialize() {
      this.$store
        .dispatch('api/getProducts', this.filters, this.skip)
        .then((products) => {
          this.products = products
        })
        .catch((err) => {
          console.log(err)
        })
    },

    productDeepCopy(product) {
      const newProduct = Object.assign({}, product)
      newProduct.attributes = [...product.attributes]
      newProduct.characteristics = [...product.characteristics]
      newProduct.options = [...product.options]
      return newProduct
    },

    editItem(item) {
      this.tmpIndex = this.products.indexOf(item)
      this.tmpProduct = this.productDeepCopy(item)
      this.dialog = true
    },

    deleteItem(item) {
      this.tmpIndex = this.products.indexOf(item)
      console.log(this.tmpIndex)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.$store
        .dispatch('api/deleteProduct', this.products[this.tmpIndex]._id)
        .then((deletedProduct) => {
          console.log(deletedProduct)
          this.products.splice(this.tmpIndex, 1)
        })
      this.closeDelete()
    },

    closeDialog() {
      console.log('closeDialog')
      this.dialog = false
      this.characteristicsExample = {}
      this.$nextTick(() => {
        this.tmpProduct = this.productDeepCopy(this.defaultProduct)
        this.tmpIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.tmpProduct = this.productDeepCopy(this.defaultProduct)
        this.tmpIndex = -1
      })
    },

    save() {
      if (this.tmpIndex > -1) {
        this.$store
          .dispatch('api/updateProduct', this.tmpProduct)
          .then((res) => {
            this.products[this.tmpIndex] = this.productDeepCopy(res)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        for (let i = 0; i < this.tmpProduct.length; i++)
          this.tmpProduct[i] = this.tmpProduct[i].trim()
        this.$store
          .dispatch('api/createProduct', this.tmpProduct)
          .then((data) => {
            this.products.push(data)
          })
      }
      this.closeDialog()
    },
    addCategory(category) {
      this.tmpProduct.category += '/' + category.title
    },
  },
}
</script>

<style scoped></style>
