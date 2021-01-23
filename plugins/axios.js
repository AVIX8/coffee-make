export default function ({ $axios, redirect }) {
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
}
