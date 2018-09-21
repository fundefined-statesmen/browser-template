'use strict'

const config = require('../config.js')

const getAllProducts = function () {
  return $.ajax({
    url: config.apiUrl + '/products',
    method: 'GET'
  })
}

module.exports = {
  getAllProducts
}
