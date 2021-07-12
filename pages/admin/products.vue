<template>
  <v-card>
    <A-ProductForm ref="ProductForm" @save="save" />
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
          <v-btn color="primary" dark class="ma-2" @click="createItem">
            Добавить
          </v-btn>

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
    headers: [
      { text: 'Название', value: 'title' },
      { text: 'Категория', value: 'category' },
      { text: 'Цена', value: 'price' },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    index: -1,
    severalOptions: false,
  }),

  computed: {
    isNew() {
      return this.index === -1
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
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

    createItem() {
      this.$refs.ProductForm.open()
    },
    editItem(item) {
      this.index = this.products.indexOf(item)
      this.$refs.ProductForm.open(item)
    },

    deleteItem(item) {
      this.index = this.products.indexOf(item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.$store
        .dispatch('api/deleteProduct', this.products[this.index]._id)
        .then((deletedProduct) => {
          console.log(deletedProduct)
          this.products.splice(this.index, 1)
        })
      this.closeDelete()
    },

    closeDelete() {
      this.index = -1
      this.dialogDelete = false
    },
    save(product) {
      if (this.isNew) {
        this.$store.dispatch('api/createProduct', product).then((data) => {
          this.products.push(data)
        })
      } else {
        // this.$store
        //   .dispatch('api/updateProduct', product)
        //   .then((res) => {
        //     this.products[this.index] = this.productDeepCopy(res)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
      }
    },
  },
}
</script>

<style scoped></style>
