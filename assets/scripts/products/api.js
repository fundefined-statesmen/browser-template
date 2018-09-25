'use strict'

const config = require('../config.js')

const getAllProducts = function () {
  return $.ajax({
    url: config.apiUrl + '/products',
    method: 'GET'
  })
}

const search = function (terms) {
  return $.ajax({
    url: config.apiUrl + '/products',
    method: 'GET',
    data: {
      terms
    }
  })
}

module.exports = {
  getAllProducts,
  search
}
