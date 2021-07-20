export default function ({ $axios, store, $cookies }) {
  $axios.onRequest((config) => {
    if (!store.state.auth.accessToken) return config
    config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`
    return config
  })

  $axios.onResponseError(async (error) => {
    const refreshToken = $cookies.get('refreshToken')

    if (!refreshToken || error.response?.status !== 401 || error.config.retry) {
      throw error
    }

    try {
      await store.dispatch('auth/refreshTokens')
      return $axios({
        ...error.config,
        retry: true,
      })
    } catch (e) {
      throw error
    }
  })
}
