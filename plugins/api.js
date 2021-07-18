export default function ({ $axios, store, redirect, $cookies }) {
  $axios.onError((error) => {
    if (error.response?.status === 500) {
      console.warn('[plugins/api.js] API server returned 500 code')
      // тут нужно что-то делать
    }
    if (error.code === 'ECONNABORTED') {
      console.warn('[plugins/api.js] API server not responding')
      // тут тоже
    }
  })
}
