export const state = () => ({})

export const mutations = {}

export const actions = {
  /*
   * USER
   */
  profile({ commit }) {
    return this.$axios.$get('/user/profile')
  },

  /**
   * PRODUCTS
   */
  getProducts(
    { commit },
    { category, deep, characteristics, title, SKU, inStock, sort, skip, limit }
  ) {
    return this.$axios.$post('/products/get', {
      category,
      deep,
      characteristics,
      title,
      SKU,
      inStock,
      sort,
      skip,
      limit: limit || 12,
    })
  },
  getProductBySlug({ commit }, slug) {
    return this.$axios.$post('/products/getBySlug', { slug })
  },
  createProduct({ commit }, { product, imageFiles }) {
    const fd = new FormData()
    fd.append('data', JSON.stringify(product))
    imageFiles.forEach((file) => {
      fd.append('images', file)
    })
    return this.$axios.$post('/products/create', fd)
  },
  updateProduct({ commit }, { product, imageFiles }) {
    const fd = new FormData()
    fd.append('data', JSON.stringify(product))
    imageFiles.forEach((file) => {
      fd.append('images', file)
    })
    return this.$axios.$post('/products/update', fd)
  },
  deleteProduct({ commit }, id) {
    return this.$axios
      .$post('/products/delete', { id })
      .then((res) => {
        this.$toast.success('Товар был успешно удален', { duration: 4000 })
        return res
      })
      .catch((err) => {
        this.$toast.error(
          'Не удалось удалить товар. ' + err.response.data.message,
          { duration: 4000 }
        )
      })
  },

  /**
   * CATEGORIES
   */
  getCategories({ commit }, parentPath) {
    return this.$axios.$post('categories/get', { parentPath })
  },
  getCategoryFilters({ commit }, category) {
    return this.$axios
      .$post('/categories/getFilters', { category })
      .then((data) => {
        const res = data.reduce((rv, x) => {
          ;(rv[x.title] = rv[x.title] || []).push(x.value)
          return rv
        }, {})
        return res
      })
  },
  getCategoryInfo({ commit }, category) {
    return this.$axios
      .$post('/categories/getInfo', { category })
      .then((data) => {
        const res = {}
        for (const name of Object.keys(data)) {
          res[name] = data[name].reduce((rv, x) => {
            ;(rv[x.title] = rv[x.title] || []).push(x.value)
            return rv
          }, {})
        }
        return res
      })
  },
  updateCategory({ commit }, data) {
    const fd = new FormData()
    fd.append('title', data.title)
    fd.append('image', data.image)
    fd.append('id', data._id)
    return this.$axios.$post('/categories/update', fd)
  },
  createCategory({ commit }, data) {
    const fd = new FormData()
    fd.append('title', data.title)
    fd.append('image', data.image)
    fd.append('parentId', data.parentId)
    return this.$axios.$post('/categories/create', fd)
  },
  deleteCategory({ commit }, id) {
    return this.$axios.$post('categories/delete', { id })
  },

  /**
   * ORDERS
   */
  getOrders({ commit }, { code, skip, limit }) {
    return this.$axios.$post('orders/get', { code, skip, limit })
  },
  getValidItems({ commit }, items) {
    return this.$axios.$post('orders/getValid', { items })
  },
  createOrder({ commit }, { fullName, phone, address, items, validItems }) {
    return this.$axios.$post('orders/create', {
      fullName,
      phone,
      address,
      items,
      validItems,
    })
  },
}
