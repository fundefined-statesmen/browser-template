'use strict'
const ordersTemplate = require('../handlebars/orders.handlebars')

// Sign Up
const showCart = function (response) {
  // console.log(response.order) // expect 1 array
  const orderElement = ordersTemplate({ orders: [response.order] })
  $('#shopping-cart').html(orderElement)
}

const showPreviousOrders = function (response) {
  const orderElement = ordersTemplate({ orders: response.orders })
  $('#previous-orders').html(orderElement)
}

module.exports = {
  showCart,
  showPreviousOrders
}
