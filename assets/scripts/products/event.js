'use strict'

const api = require('./api')
const ui = require('./ui')
const lineItemApi = require('../lineitems/api')
const store = require('../store')
const orderAPI = require('../orders/api')

const onGetAllProducts = function () {
  api.getAllProducts()
    .then(ui.onGetAllProductsSuccess)
    .catch(ui.onGetAllProductsFail)
}
const onAddToCart = function (event) {
  const productId = $(event.target).parent().attr('data-id')
  console.log('productId; ', productId)
  // create line item with product id
  // get open order id from store
  // update order with line item id
  lineItemApi.create(productId)
    .then((response) => {
      console.log('lineitem.id', response.lineItem.id)
      const data = {
        id: store.openOrderId,
        order: {
          line_item: response.lineItem.id
        }
      }
      return orderAPI.update(data)
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => { console.err(err) })
}

const addHandlers = function () {
  $('#products').on('click', 'button', onAddToCart)
  onGetAllProducts()
}

module.exports = {
  addHandlers
}
