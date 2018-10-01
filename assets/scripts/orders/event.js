'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')
const messageModal = require('../helpers/modalMessage')

const showCart = function (event) {
  event.preventDefault()
  api.show()
    .then(ui.showCart)
    .catch(ui.signUpFail)
}

const showPreviousOrders = function (event) {
  event.preventDefault()
  api.index()
    .then(ui.showPreviousOrders)
    .catch(ui.signInFail)
}

const removeProduct = function (event) {
  event.preventDefault()
  // use lineitem id to remove instead of product id
  const lineitemId = $(event.target).closest('.lineitem').attr('data-id')

  api.removeProduct(lineitemId)
    .then((response) => {
      ui.removeProductSuccess(lineitemId, $(event.target).siblings('.product-price'))
      return response
    })
    .catch((err) => {
      messageModal("Can't remove " + err, 'fail')
    })
}

const addHandlers = function () {
  $('#shopping-cart-button').on('click', showCart)
  $('#shopping-cart').on('click', '.product button', removeProduct)
  $('#previous-orders-button').on('click', showPreviousOrders)
  $('.cancel-button').on('click', ui.showProductsOnly)
}

module.exports = {
  addHandlers
}
