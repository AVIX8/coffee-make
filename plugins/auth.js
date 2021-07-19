export default function ({ $axios, store, $cookies }) {
  $axios.onRequest((config) => {
    const accessToken = store.state.auth.accessToken

    if (!accessToken) {
      return config
    }

    const newConfig = {
      headers: {},
      ...config,
    }

    newConfig.headers.Authorization = `Bearer ${accessToken}`
    return newConfig
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
