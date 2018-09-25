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
    url: 'http://localhost:4741/search',
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
