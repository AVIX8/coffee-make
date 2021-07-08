export const state = () => ({
  accessToken: '',
  refreshRequest: null,
})

export const mutations = {
  setTokens(state, data) {
    state.accessToken = data.accessToken
    this.$cookies.set('refreshToken', data.refreshToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 35,
      // httpOnly: true,
    })
  },
  setRefreshRequest(state, date) {
    state.refreshRequest = date
  },
}

export const actions = {
  // вызывается каждый раз на СЕРВЕРЕ при загрузке страницы
  async nuxtServerInit({ commit, dispatch }) {
    // await dispatch('getUserData')
    // await Promise.all(dispatch('...'), dispatch('...')) - так лучше делать наверное
  },

  // вызывается каждый раз на КЛИЕНТЕ при загрузке страницы
  nuxtClientInit({ commit, dispatch }) {
    // console.log(this.$axios)
    // commit('setTokens', { refreshToken: this.$cookies.get('refreshToken') })
  },

  /*
   * AUTH
   */
  login({ commit }, { email, password }) {
    return this.$axios
      .$post('/auth/login', { email, password })
      .then((data) => {
        commit('setTokens', data)
      })
  },
  register({ commit }, { email, password }) {
    return this.$axios.$post('/auth/register', { email, password })
  },
  logout({ commit }) {
    const refreshToken = this.$cookies.get('refreshToken')
    commit('setTokens', { refreshToken: '', accessToken: '' })
    return this.$axios.$post('/auth/logout', { refreshToken })
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
  getProducts({ commit }, filters, skip) {
    return this.$axios.$post('/products/get', { filters, skip })
  },
  createProduct({ commit }, data) {
    return this.$axios.$post('/products/create', data)
  },
  deleteProduct({ commit }, id) {
    return this.$axios.$post('/products/delete', { id })
  },

  /**
   * CATEGORIES
   */
  getCategories({ commit }, parentPath) {
    return this.$axios.$post('categories/', { parentPath })
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
