export const state = () => ({
  user: {},
  smallLaptop: 1400,
  tablet: 1023,
  mobile: 765,
  smallMobile: 400,
  isMobile: false,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  onResize(state) {
    state.isMobile = window.innerWidth <= state.mobile
  },
}

export const actions = {
  // вызывается каждый раз на СЕРВЕРЕ при загрузке страницы
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('getUserData')
    // await Promise.all(dispatch('...'), dispatch('...')) - так лучше делать наверное
  },

  // вызывается каждый раз на КЛИЕНТЕ при загрузке страницы
  nuxtClientInit({ commit, dispatch }) {
    commit('onResize')
    window.onresize = () => {
      commit('onResize')
    }
  },

  // запрашивает у сервера информацию о текущем пользователе и сохраняет в state.user
  getUserData({ commit }) {
    return this.$axios
      .$get('user/getUserData', { timeout: 200 })
      .then((res) => {
        commit('setUser', res.user)
      })
      .catch(() => {
        commit('setUser', {})
      })
  },
}

export const getters = {
  getIsMobile(state) {
    return state.isMobile
  },
}
