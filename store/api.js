export const state = () => ({
  // accessToken: '',
  // refreshRequest: null,
})

export const mutations = {
  // setTokens(state, data) {
  //   state.accessToken = data.accessToken
  //   this.$cookies.set('refreshToken', data.refreshToken, {
  //     path: '/',
  //     maxAge: 60 * 60 * 24 * 35,
  //     // httpOnly: true,
  //   })
  // },
  // setRefreshRequest(state, date) {
  //   state.refreshRequest = date
  // },
}

export const actions = {
  /*
   * AUTH
   */
  register({ commit }, { email, password }) {
    return this.$axios.$post('/auth/register', { email, password })
  },
  login({ commit }, { email, password }) {
    return this.$auth.loginWith('local', { data: { email, password } })
  },
  async logout({ commit }) {
    await this.$auth.refreshTokens()
    return this.$auth.logout({
      data: { refreshToken: this.$auth.strategy.refreshToken.get() },
    })
  },

  /*
   * USER
   */
  profile({ commit }) {
    return this.$axios.$get('/user/profile')
  },

  /**
   * PRODUCTS
   */
  getProducts({ commit }, { category, deep, filters, skip, limit }) {
    return this.$axios.$post('/products/get', {
      category,
      deep,
      filters,
      skip,
      limit,
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
    return this.$axios.$post('/products/delete', { id })
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
        for (const name of ['characteristics', 'attributes']) {
          res[name] = data[name].reduce((rv, x) => {
            ;(rv[x.title] = rv[x.title] || []).push(x.value)
            return rv
          }, {})
        }
        res.optionTitles = data.optionTitles
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
}
