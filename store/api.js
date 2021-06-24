export const state = () => ({
  accessToken: '',
  refreshRequest: null,
})

export const mutations = {
  setTokens(state, data) {
    state.accessToken = data.accessToken
    this.$cookiz.set('refreshToken', data.refreshToken, {
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
    // commit('setTokens', { refreshToken: this.$cookiz.get('refreshToken') })
  },

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
    const refreshToken = this.$cookiz.get('refreshToken')
    console.log(refreshToken)
    commit('setTokens', { refreshToken: '', accessToken: '' })
    return this.$axios.$post('/auth/logout', { refreshToken })
  },

  profile({ commit }) {
    return this.$axios.$get('/user/profile')
  },
}
