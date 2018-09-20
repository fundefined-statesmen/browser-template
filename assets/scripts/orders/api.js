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

module.exports = {
  index,
  show
}
