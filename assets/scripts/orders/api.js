'use strict'

const config = require('../config.js')
const store = require('../store.js')
store.openOrderId = '5ba2c0347e68e93f4a8d9edf'
const show = function () {
  return $.ajax({
    url: config.apiUrl + '/orders/' + store.openOrderId,
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const index = function () {
  return $.ajax({
    url: config.apiUrl + '/orders',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const create = function () {
  return $.ajax({
    url: config.apiUrl + '/orders',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const update = function (data) {
  // console.log('data.order', data.order)
  return $.ajax({
    url: config.apiUrl + '/orders/' + data.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: {
      order: data.order
    }
  })
}

const removeProduct = function (lineitemId) {
  return $.ajax({
    url: config.apiUrl + '/orders/' + store.openOrderId + '/pull',
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: {
      order: {
        line_item: lineitemId
      }
    }
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  removeProduct
}
