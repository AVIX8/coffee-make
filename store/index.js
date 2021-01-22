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
  // вызывается каждый раз на сервере при полной загрузке страницы
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('getUserData')
    // await Promise.all(dispatch('...'), dispatch('...')) - так лучше делать наверное
  },

  // запрашивает у сервера информацию о текущем пользователе и сохраняет в state.user
  getUserData({ commit }) {
    return this.$axios
      .$get('user/getUserData', { timeout: 200 })
      .then((res) => {
        commit('setUser', res.user)
      })
      .catch((err) => {
        commit('setUser', {})
        if (err.code === 'ECONNABORTED') {
          console.error('API server not responding')
        }
      })
  },
}
