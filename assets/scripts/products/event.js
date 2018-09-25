'use strict'

const api = require('./api')
const ui = require('./ui')
const lineItemApi = require('../lineitems/api')
const store = require('../store')
const orderAPI = require('../orders/api')
const authUI = require('../auth/ui')

const onGetAllProducts = function (event) {
  api.getAllProducts()
    .then(ui.onGetAllProductsSuccess)
    .catch(ui.onGetAllProductsFail)
}

const onAddToCart = function (event) {
  // show credentials when users are not sign in
  if (!store.user) {
    authUI.showCredentials()
    return
  }
  const productId = $(event.target).closest('.product').attr('data-id')
  // create line item with product id
  // get open order id from store
  // update order with line item id
  lineItemApi.create(productId)
    .then((response) => {
      const data = {
        id: store.openOrderId,
        order: {
          line_item: response.lineItem.id
        }
      }
      return orderAPI.update(data)
    })
    .then(ui.onAddToCart)
    .catch((err) => { console.error(err) })
}

const onSearch = function (event) {
  event.preventDefault()
  const terms = $(event.target).children('input').val()
  console.log('terms: ', terms)
  api.search(terms)
    .then(ui.searchResult)
    .catch((err) => { console.error(err) })
}

const addHandlers = function () {
  $('#products').on('click', '.addToCart', onAddToCart)
  $('.searchbar').on('submit', onSearch)
  $('.cancel-button').on('click', onGetAllProducts)
  onGetAllProducts()
}

module.exports = {
  addHandlers
}
