'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

const showCart = function (event) {
  event.preventDefault()
  api.show()
    .then(ui.showCart)
    .catch(ui.signUpFail)
}

// const storeUserToken = (response) => {
//   store.user = response.user
//   return response
// }
//
const showPreviousOrders = function (event) {
  event.preventDefault()
  api.index()
    .then(ui.showPreviousOrders)
    .catch(ui.signInFail)
}

const addHandlers = function () {
  $('#shopping-cart-button').on('click', showCart)
  $('#previous-orders-button').on('click', showPreviousOrders)
  $('.cancel-button').on('click', ui.showProductsOnly)
}

module.exports = {
  addHandlers
}
