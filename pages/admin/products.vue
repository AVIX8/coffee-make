<template>
  <div>
    <v-card>
      <A-ProductDialog ref="ProductDialog" @save="saveProduct" />
      <A-DeleteDialog
        ref="DeleteDialog"
        v-model="deleteDialog"
        @confirm="deleteConfirm"
      />
      <v-data-table
        :items-per-page="products.length"
        disable-sort
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
          <v-row class="mx-0 pa-4 pb-0">
            <div class="text-h4">Товары</div>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="title"
              solo
              dense
              hide-details
              clearable
              class="ma-2"
              label="Поиск товаров"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-btn
              color="success"
              min-width="0"
              icon
              class="ma-2 px-2"
              @click="createItem"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn
              color="primary"
              min-width="0"
              icon
              class="ma-2 px-2"
              :loading="loading"
              @click="updateProducts"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>

            <v-btn
              color="primary"
              min-width="0"
              icon
              class="ma-2 px-2"
              @click="showFilters = !showFilters"
              ><v-badge color="pink" overlap dot :value="!!category">
                <v-icon>{{
                  showFilters ? 'mdi-menu-up' : 'mdi-menu-down'
                }}</v-icon>
              </v-badge>
            </v-btn>
          </v-row>
          <div v-show="showFilters">
            <v-row class="mx-4 mb-2">
              <div
                v-for="(cat, i) in nextCategories"
                :key="i"
                class="ma-1"
                @click="addCategory(cat)"
              >
                <v-chip link small>{{ cat.title }}</v-chip>
              </div>
              <v-spacer />
            </v-row>
            <v-row class="mx-4">
              <v-text-field
                v-model="category"
                class="ma-1"
                dense
                label="Категория"
                outlined
                hide-details
                clearable
              ></v-text-field>

              <v-spacer />
              <v-switch
                v-model="deep"
                class="mx-2 my-auto"
                inset
                dense
                :disabled="!category"
                hide-details
                outlined
                label="Показывать товары из всех подкатегорий"
              ></v-switch>
            </v-row>

            <v-row class="mx-4">
              <v-combobox
                v-for="filter in filters"
                :key="filter.title"
                v-model="filter.selected"
                class="ma-1"
                :items="filter.values"
                :label="filter.title"
                multiple
                outlined
                clearable
                small-chips
                hide-details
                dense
              ></v-combobox>
            </v-row>
          </div>
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
          <nuxt-link
            :to="`/product/${item.slug}`"
            target="_blank"
            style="text-decoration: none; color: inherit"
          >
            <v-icon small class="mr-2" color="primary"> mdi-eye </v-icon>
          </nuxt-link>
          <v-icon small class="mr-2" color="warning" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small color="error" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:item.inStock="{ item }">
          <v-icon color="grey">{{
            item.inStock ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'
          }}</v-icon>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-0">
            <v-row class="mx-0">
              <v-col style="width: 350px">
                <v-img
                  v-if="item.imgs.length < 2"
                  :src="imageIdToURL(item.imgs[0])"
                  contain
                  height="450"
                ></v-img>
                <v-carousel
                  v-else
                  height="450"
                  show-arrows-on-hover
                  :show-arrows="item.imgs.length > 1"
                  :hide-delimiters="item.imgs.length == 1"
                  :reverse="item.imgs.length == 2"
                >
                  <v-carousel-item v-for="(img, i) in item.imgs" :key="i">
                    <v-img
                      :src="imageIdToURL(img)"
                      contain
                      height="450"
                    ></v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col>
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-subtitle>
                  {{ item.descr }}
                </v-card-subtitle>
                <v-card-text>
                  <v-simple-table class="table" dense>
                    <tbody>
                      <tr
                        v-for="option in item.attributes.concat(
                          item.characteristics
                        )"
                        :key="option.title"
                      >
                        <td class="text-left">{{ option.title }}</td>
                        <td class="text-left">{{ option.value }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  <v-card outlined width="fit-content" class="ma-3">
                    <div v-if="!item.optionTitle" class="text-h5 ma-3">
                      Цена: {{ item.price }} ₽
                    </div>
                    <v-simple-table v-else class="table" dense>
                      <thead>
                        <tr>
                          <th class="text-right text-h6">
                            {{ item.optionTitle }}
                          </th>
                          <th class="text-right text-h6">Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="option in item.options" :key="option.value">
                          <td class="text-right text-h6">{{ option.value }}</td>
                          <td class="text-right text-h6">
                            {{ option.price }} ₽
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card>
                </v-card-text>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:no-data> Не удалось найти товары </template>
      </v-data-table>
    </v-card>
    <div v-if="showLoadMore" class="text-center pt-2">
      <v-btn :loading="loading" @click="loadMore">Загрузить ещё</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    loading: true,
    category: '',
    nextCategories: [],
    deep: true,
    deleteDialog: false,
    products: [],
    filters: [],
    showFilters: false,
    showLoadMore: true,
    skip: 0,
    selected: {},
    title: '',
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Название', value: 'title' },
      { text: 'Категория', value: 'category' },
      { text: 'Цена', value: 'price', align: 'right' },
      { text: 'В наличии', value: 'inStock', align: 'center' },
      { text: '', value: 'data-table-expand', sortable: false },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    index: -1,
    isNew: false,
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
    title(val) {
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
    getProducts() {
      return this.$store
        .dispatch('api/getProducts', {
          category: this.category,
          characteristics: this.characteristics,
          skip: this.skip,
          deep: this.deep,
          title: this.title,
          limit: 20,
        })
        .then((products) => {
          if (products.length < 20) this.showLoadMore = false
          else this.showLoadMore = true
          return products
        })
        .catch(() => {
          this.showLoadMore = false
          return []
        })
    },
    async updateProducts() {
      this.loading = true
      this.skip = 0
      this.products = await this.getProducts()
      this.loading = false
    },
    async loadMore() {
      this.loading = true
      this.skip = this.products.length
      const products = await this.getProducts()
      this.products = this.products.concat(products)
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
      this.index = this.products.indexOf(item)
      this.$refs.ProductDialog.open(item)
    },
    deleteItem(item) {
      this.$refs.DeleteDialog.open(item.title)
      this.index = this.products.indexOf(item)
    },
    async deleteConfirm() {
      await this.$store
        .dispatch('api/deleteProduct', this.products[this.index]._id)
        .then((deletedProduct) => {
          console.log(deletedProduct)
          this.products.splice(this.index, 1)
        })
      this.deleteDialog = false
    },
    saveProduct(data) {
      if (this.isNew) {
        console.log('create:', data)
        this.$store.dispatch('api/createProduct', data).then((product) => {
          this.loadMore()
          console.log(product)
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
    addCategory(cat) {
      this.category += '/' + cat.title
    },
    openFilters() {},
    applyFilters() {},
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: fit-content;
}
</style>
