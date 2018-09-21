'use strict'

const config = require('../config.js')
const store = require('../store.js')

// const show = function () {
//   return $.ajax({
//     url: config.apiUrl + '/orders/' + store.openOrderId,
//     method: 'GET',
//     headers: {
//       'Authorization': 'Token token=' + store.user.token
//     }
//   })
// }
//
// const index = function () {
//   return $.ajax({
//     url: config.apiUrl + '/orders',
//     method: 'GET',
//     headers: {
//       'Authorization': 'Token token=' + store.user.token
//     }
//   })
// }

const create = function (productId) {
  return $.ajax({
    url: config.apiUrl + '/lineitems',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: {
      lineitem: {
        product_id: productId
      }
    }
  })
}

module.exports = {
  create
}
