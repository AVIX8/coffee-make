export default function ({ $axios, store, redirect, $cookiz }) {
  $axios.onError((error) => {
    if (error.response?.status === 500) {
      console.warn('[plugins/axios.js] API server returned 500 code')
      // тут нужно что-то делать
    }
    if (error.code === 'ECONNABORTED') {
      console.warn('[plugins/axios.js] API server not responding')
      // тут тоже
    }
  })

  $axios.onRequest((config) => {
    const accessToken = store.state.api.accessToken

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
    const refreshToken = $cookiz.get('refreshToken')

    if (!refreshToken || error.response.status !== 401 || error.config.retry) {
      throw error
    }

    if (!store.state.api.refreshRequest) {
      store.commit(
        'api/setRefreshRequest',
        $axios.$post('/auth/refresh', {
          refreshToken,
        })
      )
    }

    try {
      const data = await store.state.api.refreshRequest
      store.commit('api/setTokens', data)
      store.commit('api/setRefreshRequest', null)
      const newRequest = {
        ...error.config,
        retry: true,
      }
      return $axios(newRequest)
    } catch (e) {
      store.commit('api/setTokens', { refreshToken: '', accessToken: '' })
      store.commit('api/setRefreshRequest', null)
      return error
    }
  })
}
