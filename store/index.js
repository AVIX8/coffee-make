export const state = () => ({
  user: {},
  smallLaptop: 1400,
  tablet: 1023,
  mobile: 765,
  smallMobile: 400,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  // вызывается каждый раз на СЕРВЕРЕ при загрузке страницы
  async nuxtServerInit({ commit, dispatch }) {
    // await Promise.all(dispatch('...'), dispatch('...')) - так лучше делать наверное
  },

  // вызывается каждый раз на КЛИЕНТЕ при загрузке страницы
  nuxtClientInit({ commit, dispatch }) {
    setTimeout(dispatch('getUserData'), 1000)
    //
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
  //
}
