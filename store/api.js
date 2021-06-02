export const state = () => ({
  accessToken: '',
  refreshToken: '',
  refreshRequest: null,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setTokens(state, data) {
    state.accessToken = data.accessToken
    state.refreshToken = data.refreshToken
    this.$cookiz.set('refreshToken', data.refreshToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 35,
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
    commit('setTokens', { refreshToken: this.$cookiz.get('refreshToken') })
  },

  // запрашивает у сервера информацию о текущем пользователе и сохраняет в state.user
  // getUserData({ commit }) {
  //   return this.$axios
  //     .$get('user/getUserData', { timeout: 200 })
  //     .then((res) => {
  //       commit('setUser', res.user)
  //     })
  //     .catch(() => {
  //       commit('setUser', {})
  //     })
  // },

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

  logout({ commit, state }) {
    const refreshToken = state.refreshToken
    console.log(refreshToken)
    commit('setTokens', { refreshToken: '', accessToken: '' })
    return this.$axios.$post('/auth/logout', { refreshToken })
  },

  profile({ commit }) {
    return this.$axios.$get('/user/profile')
  },
}

export const getters = {
  //
}
