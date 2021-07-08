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
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="ma-2"> Фильтр </v-btn>

          <v-dialog v-model="dialog" max-width="80%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="ma-2" v-bind="attrs" v-on="on">
                Добавить
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col sm="12" md="6">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Название"
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="6">
                    <v-text-field
                      v-model="editedItem.slug"
                      label="Слаг"
                    ></v-text-field>
                    <v-btn> Проверить </v-btn>
                  </v-col>
                  <v-col sm="12" md="6">
                    <v-text-field
                      v-model="editedItem.category"
                      label="Категория"
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="6">
                    <v-textarea
                      v-model="editedItem.descr"
                      rows="2"
                      label="Описание"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
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
                >Подтверждение удаления ({{ editedItem.title }})</v-card-title
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
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Добавление товара'
        : 'Редактирование товара'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
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

    editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store
        .dispatch('api/deleteProduct', this.editedItem._id)
        .then((deletedProduct) => {
          console.log(deletedProduct)
        })
      this.products.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store
          .dispatch('api/updateProduct', this.editedItem)
          .then((res) => {
            Object.assign(this.products[this.editedIndex], res)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$store
          .dispatch('api/createProduct', this.editedItem)
          .then((data) => {
            this.products.push(data)
          })
      }
      this.close()
    },
  },
}
</script>
