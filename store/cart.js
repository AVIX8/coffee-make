export const state = () => ({
  items: [],
  cart: {},
})

export const mutations = {
  addNewItem(state, { item, sku }) {
    const itemTemp = JSON.parse(JSON.stringify(item))
    itemTemp.variants = [itemTemp.variants.find((e) => e.SKU === sku)]

    // {
    //   sku: "0003",
    //   item: {},
    //   quantity: 1
    // }

    const itemData = {
      sku,
      item: itemTemp,
      quantity: 0,
    }
    state.items.push(itemData)
  },
  setQuantity(state, { sku, quantity }) {
    const temp = getItemBySKU(state, sku)
    if (temp) temp.quantity = quantity
  },
  changeQuantity(state, { sku, newQuantity }) {
    const temp = getters.getItemBySKU(sku)
    if (temp) temp.quantity += newQuantity
  },
}

export const actions = {
  setItemToCart({ getters, commit }, { item, sku, quantity }) {
    const temp = getters.getItemBySKU(sku)
    if (temp) commit('changeQuantity', { sku, quantity })
    else {
      commit('addNewItem', { item, sku })
      commit('setQuantity', { sku, newQuantity: quantity })
    }
  },
}

function getItemBySKU(state, sku) {
  console.log('get:', state, sku)
  return state.items.find((e) => e.sku === sku)
}
// Getters
export const getters = {
  getItemBySKU: (state) => (sku) => getItemBySKU(state, sku),
  products(state) {
    return state.products
  },

  cart(state) {
    return state.cart
  },

  cartSubtotal(state) {
    if (state.cart.subtotal) {
      return state.cart.subtotal.formatted
    }
  },
}
