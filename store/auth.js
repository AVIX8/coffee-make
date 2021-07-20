export const state = () => ({
  user: null,
  accessToken: '',
  refreshRequest: null,
})

const cookiesOptions = {
  path: '/',
  maxAge: 60 * 60 * 24 * 35,
  // httpOnly: true,
}

export const mutations = {
  setTokens(state, data) {
    state.accessToken = data.accessToken
    this.$cookies.set('accessToken', data.accessToken, cookiesOptions)
    this.$cookies.set('refreshToken', data.refreshToken, cookiesOptions)
  },
  setRefreshRequest(state, date) {
    state.refreshRequest = date
  },
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async nuxtClientInit({ dispatch, commit }) {
    commit('setTokens', {
      accessToken: this.$cookies.get('accessToken'),
      refreshToken: this.$cookies.get('refreshToken'),
    })
    if (await dispatch('isAuth')) dispatch('user')
  },

  refreshTokens({ commit, state }) {
    if (state.refreshRequest) return state.refreshRequest
    commit(
      'setRefreshRequest',
      this.$axios.$post('/auth/refresh', {
        refreshToken: this.$cookies.get('refreshToken'),
      })
    )
    return state.refreshRequest
      .then((data) => {
        commit('setTokens', data)
        commit('setRefreshRequest', null)
      })
      .catch((err) => {
        commit('setTokens', { refreshToken: '', accessToken: '' })
        commit('setRefreshRequest', null)
        throw err
      })
  },

  isAuth({ commit }) {
    return !!this.$cookies.get('refreshToken')
  },
  register({ dispatch }, { email, password }) {
    return this.$axios
      .$post('/auth/register', { email, password })
      .then((res) => {
        dispatch('login', { email, password })
      })
  },
  login({ commit, dispatch }, { email, password }) {
    return this.$axios
      .$post('/auth/login', { email, password })
      .then((data) => {
        commit('setTokens', data)
        dispatch('user')
      })
  },
  user({ commit }) {
    return this.$axios
      .$post('/auth/user')
      .then((res) => {
        commit('setUser', res.user)
      })
      .catch(() => {
        commit('setUser', null)
      })
  },
  logout({ commit }) {
    const refreshToken = this.$cookies.get('refreshToken')
    commit('setTokens', { refreshToken: '', accessToken: '' })
    commit('setUser', null)
    return this.$axios.$post('/auth/logout', { refreshToken })
  },
}
