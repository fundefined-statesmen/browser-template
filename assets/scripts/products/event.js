'use strict'

const api = require('./api')
const ui = require('./ui')

const onGetAllProducts = function (event) {
  event.preventDefault()
  api.getAllProducts()
    .then(ui.onGetAllProductsSuccess)
    .catch(ui.onGetAllProductsFail)
}

const addHandlers = function () {
  $('#products').on('click', onGetAllProducts)
}

module.exports = {
  addHandlers
}
