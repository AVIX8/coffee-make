export const state = () => ({
  items: [],
  cart: {},
})

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },

  setCart(state, payload) {
    state.cart = payload
  },

  clearCart(state) {
    state.cart = {}
  },

  addItem(state, newItem) {
    state.items.push(newItem)
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getProducts')
  },

  async getProducts({ commit }) {
    const products = await this.this.Vue.prototype.$commerce.products.list()

    if (products) {
      commit('setProducts', products.data)
    }
  },

  async retrieveCart({ commit }) {
    const cart = await this.Vue.prototype.$commerce.cart.retrieve()

    if (cart) {
      commit('setCart', cart)
    }
  },

  async addProductToCart({ commit }, id, count) {
    const addProduct = await this.Vue.prototype.$commerce.cart.add(id, count)

    if (addProduct) {
      commit('setCart', addProduct.cart)
    }
  },

  async removeProductFromCart({ commit }, payload) {
    const removeProduct = await this.Vue.prototype.$commerce.cart.remove(
      payload
    )

    if (removeProduct) {
      commit('setCart', removeProduct.cart)
    }
  },

  async clearCart({ commit }) {
    const clear = await this.Vue.prototype.$commerce.cart.empty()

    if (clear) {
      commit('clearCart')
    }
  },
}

// Getters
export const getters = {
  products(state) {
    return state.products
  },

  cart(state) {
    return state.cart
  },

  cartSubtotal(state) {
    if (state.cart.subtotal) {
      return state.cart.subtotal.formatted
    }
  },
}
