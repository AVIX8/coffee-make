export const state = () => ({
  user: {},
  smallLaptop: 1400,
  tablet: 1023,
  mobile: 765,
  smallMobile: 400,
  windowWidth: 0,
  windowHeight: 0,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  updateSize(state) {
    state.windowWidth = window.innerWidth
    state.windowHeight = window.innerHeight
  },
}

export const actions = {
  // вызывается каждый раз на СЕРВЕРЕ при загрузке страницы
  async nuxtServerInit({ commit, dispatch }) {
    // await Promise.all(dispatch('...'), dispatch('...')) - так лучше делать наверное
  },

  // вызывается каждый раз на КЛИЕНТЕ при загрузке страницы
  nuxtClientInit({ commit, dispatch }) {
    // лисенеры изменения окна
    window.addEventListener('resize', () => {
      commit('updateSize')
    })
    commit('updateSize')

    // запрашивает данные о пользователе
    setImmediate(async () => {
      if (await dispatch('api/isAuth')) {
        dispatch('api/getUserData')
          .then((res) => {
            commit('setUser', res.user)
          })
          .catch(() => {
            commit('setUser', {})
          })
      } else {
        commit('setUser', {})
      }
    })
  },
}

export const getters = {
  //
}
