<template>
  <div>
    <v-card>
      <A-ProductForm ref="ProductForm" @save="save" />
      <ProductDialog v-model="isView" :item="selected" />
      <v-dialog v-model="dialogDelete" max-width="40%">
        <v-card>
          <v-card-title class="text-wrap">Подтверждение удаления</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="closeDelete">Отмена</v-btn>
            <v-btn color="error" text @click="deleteItemConfirm">Удалить</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table
        :headers="headers"
        :items="products"
        item-key="slug"
        class="ma-auto"
        :loading="loading"
        single-expand
        show-expand
        loading-text="Загрузка... пожалуйста подождите"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Товары</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="primary" dark class="ma-2"> Фильтр </v-btn>
            <v-btn color="primary" dark class="ma-2" @click="createItem">
              Добавить
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.image="{ item }">
          <v-img
            v-if="item.imgs.length"
            aspect-ratio="1"
            contain
            max-height="48px"
            :src="imageIdToURL(item.imgs[0])"
          ></v-img>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" color="primary" @click="viewItem(item)">
            mdi-eye
          </v-icon>
          <v-icon small class="mr-2" color="warning" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small color="error" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-img
              v-if="item.imgs.length"
              max-width="250"
              :src="imageIdToURL(item.imgs[0])"
            ></v-img>
            {{ item.title }}
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getProducts"> Получить товары </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <div v-if="products.length" class="text-center pt-2">
      <v-btn :loading="loading" @click="loadMore">Загрузить ещё</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    isView: false,
    loading: true,
    dialogDelete: false,
    products: [],
    filters: {},
    skip: 0,
    selected: {},
    headers: [
      { text: 'Категория', value: 'category' },
      { text: '', value: 'image' },
      { text: 'Название', value: 'title' },
      { text: 'Цена', value: 'price' },
      { text: '', value: 'data-table-expand' },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    index: -1,
    isNew: false,
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  mounted() {
    this.getProducts()
  },

  methods: {
    async getProducts() {
      await this.$store
        .dispatch('api/getProducts', { filters: this.filters, skip: this.skip })
        .then((products) => {
          this.products = this.products.concat(products)
        })
        .catch((err) => {
          console.log(err)
        })
      this.loading = false
    },
    loadMore() {
      this.skip = this.products.length
      this.loading = true
      this.getProducts()
    },
    viewItem(item) {
      this.selected = JSON.parse(JSON.stringify(item))
      this.selected.imgs = item.imgs.map((id) => this.imageIdToURL(id))
      this.isView = true
    },
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
    createItem() {
      this.isNew = true
      this.$refs.ProductForm.open()
    },
    editItem(item) {
      this.isNew = false
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
    save(data) {
      if (this.isNew) {
        console.log('create:', data)
        this.$store.dispatch('api/createProduct', data).then((product) => {
          this.products.unshift(product)
          console.log(data)
        })
      } else {
        console.log('update:', data)
        this.$store
          .dispatch('api/updateProduct', data)
          .then((product) => {
            console.log(product)
            this.$set(
              this.products,
              this.index,
              JSON.parse(JSON.stringify(product))
            )
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
