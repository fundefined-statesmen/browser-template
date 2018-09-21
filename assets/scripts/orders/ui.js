'use strict'
const previousOrdersTemplate = require('../handlebars/previousorders.handlebars')
const ordersTemplate = require('../handlebars/orders.handlebars')

// Sign Up
const showCart = function (response) {
  console.log('shopping cart: ', response.order) // expect 1 array
  const orderElement = ordersTemplate({ orders: [response.order] })
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
  $('#state-products').removeClass('d-none')
}

module.exports = {
  showCart,
  showPreviousOrders,
  showProductsOnly
}
