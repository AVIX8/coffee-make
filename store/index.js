export const state = () => ({
  smallLaptop: 1400,
  tablet: 1023,
  mobile: 765,
  smallMobile: 400,
  isMobile: false,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  setIsMobile(state, isMobile) {
    state.isMobile = isMobile
  },
}

export const getters = {
  getIsMobile(state) {
    return state.isMobile
  },
}
