'use strict'
const shoppingCartTemplate = require('../handlebars/shopping-cart.handlebars')
const previousOrdersTemplate = require('../handlebars/previousorders.handlebars')
const ordersTemplate = require('../handlebars/orders.handlebars')

// Sign Up
const showCart = function (response) {
  console.log('shopping cart: ', response.order) // expect 1 array
  const orderElement = shoppingCartTemplate({ orders: [response.order] })
  $('#shopping-cart').html(orderElement)
  $('#state-shopping-cart').removeClass('d-none')
  $('#state-products').addClass('d-none')
  $('#state-previous-orders').addClass('d-none')
}

const showPreviousOrders = function (response) {
  console.log(response.orders)
  const orders = response.orders
  const orderElement = previousOrdersTemplate({orders})
  $('#previous-orders').html(orderElement)
  $('#state-previous-orders').removeClass('d-none')
  $('#state-products').addClass('d-none')
  $('#state-shopping-cart').addClass('d-none')
}

const showProductsOnly = function () {
  $('#state-shopping-cart').addClass('d-none')
  $('#state-previous-orders').addClass('d-none')
  $('#state-credentials').addClass('d-none')
  $('#state-change-password').addClass('d-none')
  $('#state-products').removeClass('d-none')
}

const removeProductSuccess = function (lineitemId) {
  $(`#lineitem-${lineitemId}`).remove()
}

module.exports = {
  showCart,
  showPreviousOrders,
  showProductsOnly,
  removeProductSuccess
}
