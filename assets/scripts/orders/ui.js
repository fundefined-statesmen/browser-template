'use strict'
const shoppingCartTemplate = require('../handlebars/shopping-cart.handlebars')
const previousOrdersTemplate = require('../handlebars/previousorders.handlebars')
const store = require('../store')
// show cart
const showCart = function (response) {
  // check if we have any products in our open order
  // if we don't have any line item, we will have a null inside line_item as length 1
  // not sure why, but ... , make sure to compare with null
  if (response.order.line_item[0] === null) {
    console.log('no products')
    return
  }

  // calculate total
  let total = 0
  response.order.line_item.forEach((lineitem) => {
    if (lineitem) {
      total += lineitem.product_id.price
      lineitem.product_id.price = (lineitem.product_id.price / 100).toFixed(2)
    }
    return lineitem
  })
  // store total so other components can use it
  store.totalAmount = total
  total /= 100

  // use shopping cart handlebar
  const orderElement = shoppingCartTemplate({ order: response.order })
  $('#shopping-cart').html(orderElement)
  // set to two decimal places and display it
  // make sure put this after the render on order handlebar, otherwise it won't
  // render total
  $('#total .amount').html(total.toFixed(2))

  // hide other state
  $('#state-shopping-cart').removeClass('d-none')
  $('#state-products').addClass('d-none')
  $('#state-previous-orders').addClass('d-none')
}

const showPreviousOrders = function (response) {
  console.log(response.orders)
  const orders = response.orders

  response.orders.map((order) => {
    let total = 0
    order.line_item.forEach((lineitem) => {
      if (lineitem) {
        total += lineitem.product_id.price
        lineitem.product_id.price = (lineitem.product_id.price / 100).toFixed(2)
      }
    })
    order.total = (total / 100).toFixed(2)
    order.date = new Date(order.date).toDateString()
    return order
  })

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

const removeProductSuccess = function (lineitemId, priceElement) {
  let productPrice = parseFloat(priceElement.text().substr(1))
  productPrice *= 100
  store.totalAmount -= productPrice
  $('#total .amount').html((store.totalAmount / 100).toFixed(2))

  $(`#lineitem-${lineitemId}`).remove()
}

module.exports = {
  showCart,
  showPreviousOrders,
  showProductsOnly,
  removeProductSuccess
}
