'use strict'
const ordersTemplate = require('../handlebars/orders.handlebars')

const messageModal = (message, status) => {
  // Modal status: normal, success, fail
  $('#message-modal .message-modal-content').text(message)
  $('#message-modal .message-modal-content').attr('status', status)
  $('#message-modal').removeClass('d-none')
  setTimeout(() => {
    $('#message-modal').addClass('d-none')
  }, 1500)
}

// Sign Up
const showCart = function (response) {
  console.log(response.order) // expect 1 array
  const orderElement = ordersTemplate({ orders: [response.order] })
  $('#shopping-cart').html(orderElement)
}

const indexOrders = function () {
  $('#sign-up-form input').val('')
  messageModal('Fail to sign up', 'fail')
}

module.exports = {
  showCart,
  indexOrders
}
