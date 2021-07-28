<template>
  <v-card>
    <div>
      <v-card>
        <v-data-table
          :items-per-page="orders.length"
          disable-sort
          :headers="headers"
          :items="orders"
          item-key="slug"
          class="ma-auto"
          :loading="loading"
          single-expand
          show-expand
          loading-text="Загрузка... пожалуйста подождите"
          hide-default-footer
        >
          <template v-slot:top>
            <v-row class="mx-0 pa-4 pb-0">
              <div class="text-h4">Товары</div>

              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchText"
                solo
                dense
                hide-details
                clearable
                class="ma-2"
                label="Поиск заказов по коду"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>

              <v-btn
                color="primary"
                min-width="0"
                icon
                class="ma-2 px-2"
                :loading="loading"
                @click="update"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-row>
          </template>

          <!-- <template v-slot:item.image="{ item }">
          <v-img
            v-if="item.imgs.length"
            aspect-ratio="1"
            contain
            max-height="48px"
            :src="imageIdToURL(item.imgs[0])"
          ></v-img>
        </template> -->
          <!-- <template v-slot:item.price="{ item }">
          {{ getFormatedPrice(item) }}
        </template> -->
          <!-- <template v-slot:item.inStock="{ item }">
          {{ getInStockNumber(item) }}
        </template> -->
          <template v-slot:item.items="{ item }">
            {{ getItemsNumber(item) }}
          </template>

          <template v-slot:item.actions="{ item }">
            <!-- <nuxt-link
            :to="`/product/${item.slug}`"
            target="_blank"
            style="text-decoration: none; color: inherit"
          >
            <v-icon small class="mr-2" color="primary"> mdi-eye </v-icon>
          </nuxt-link> -->
            <v-icon small class="mr-2" color="warning" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- <v-icon small color="error" @click="deleteItem(item)">
            mdi-delete
          </v-icon> -->
          </template>

          <!-- <template v-slot:expanded-item="{ headers, item }"> </template> -->
          <template v-slot:no-data> Не удалось найти заказы </template>
        </v-data-table>
      </v-card>
      <div v-if="showLoadMore" class="text-center pt-2">
        <v-btn :loading="loading" @click="loadMore">Загрузить ещё</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    loading: true,
    orders: [],
    showLoadMore: true,
    skip: 0,
    searchText: '',
    headers: [
      { text: 'Код', value: 'code' },
      { text: 'Заказчик', value: 'fullName' },
      // { text: '', value: 'code' },
      { text: 'Стоимость, ₽', value: 'totalPrice', align: 'right' },
      { text: 'Статус', value: 'status', align: 'center' },
      { text: 'Товаров в заказе', value: 'items', align: 'center' },
      { text: '', value: 'data-table-expand', sortable: false },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    index: -1,
    searchTimeoutId: null,
  }),
  computed: {
    characteristics() {
      const tmp = {}
      this.filters.forEach((filter) => {
        if (filter.selected.length > 0) tmp[filter.title] = filter.selected
      })
      return tmp
    },
  },

  watch: {
    searchText(val) {
      clearTimeout(this.searchTimeoutId)
      this.searchTimeoutId = setTimeout(() => {
        this.updateProducts()
      }, 400)
    },
    filters: {
      deep: true,
      handler(val) {
        this.updateProducts()
      },
    },
    deleteDialog(val) {
      if (!val) this.index = -1
    },
    category(val) {
      if (val == null) return (this.category = '')
      this.updateNextCategories()
      this.updateProducts()
    },
    deep(val) {
      this.updateProducts()
    },
  },
  mounted() {
    this.updateNextCategories()
    this.updateProducts()
  },
  methods: {
    updateNextCategories() {
      this.filters = []
      this.$store
        .dispatch('api/getCategories', this.category)
        .then((categories) => {
          this.nextCategories = categories
        })
      this.$store
        .dispatch('api/getCategoryFilters', this.category)
        .then((res) => {
          for (const key of Object.keys(res)) {
            this.filters.push({ title: key, values: res[key], selected: [] })
          }
        })
    },
    getOrders() {
      return this.$store
        .dispatch('api/getOrders', {
          code: this.searchText,
          limit: 20,
        })
        .then((orders) => {
          if (orders.length < 20) this.showLoadMore = false
          else this.showLoadMore = true
          return orders
        })
        .catch(() => {
          this.showLoadMore = false
          return []
        })
    },
    async updateProducts() {
      this.loading = true
      this.skip = 0
      this.orders = await this.getOrders()
      this.loading = false
    },
    async loadMore() {
      this.loading = true
      this.skip = this.orders.length
      const orders = await this.getOrders()
      this.orders = this.orders.concat(orders)
      this.loading = false
    },
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
    createItem() {
      this.isNew = true
      this.$refs.ProductDialog.open()
    },
    editItem(item) {
      this.isNew = false
      this.index = this.orders.indexOf(item)
      this.$refs.ProductDialog.open(item)
    },
    // deleteItem(item) {
    //   this.$refs.DeleteDialog.open(item.title)
    //   this.index = this.orders.indexOf(item)
    // },
    // async confirmDelete() {
    //   await this.$store
    //     .dispatch('api/deleteProduct', this.orders[this.index]._id)
    //     .then((deletedProduct) => {
    //       console.log(deletedProduct)
    //       this.orders.splice(this.index, 1)
    //     })
    //   this.deleteDialog = false
    // },
    // async saveProduct(data) {
    //   if (this.isNew) {
    //     console.log('create:', data)
    //     await this.$store
    //       .dispatch('api/createProduct', data)
    //       .then((product) => {
    //         this.loadMore()
    //         console.log(product)
    //       })
    //   } else {
    //     console.log('update:', data)
    //     await this.$store
    //       .dispatch('api/updateProduct', data)
    //       .then((product) => {
    //         console.log(product)
    //         this.$set(
    //           this.orders,
    //           this.index,
    //           JSON.parse(JSON.stringify(product))
    //         )
    //       })
    //   }
    // },
    getItemsNumber(item) {
      let q = 0
      item.items.forEach((i) => {
        q += i.quantity
      })
      return `${item.items.length} (${q})`
    },
  },
}
</script>
