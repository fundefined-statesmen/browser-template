'use strict'

const config = require('../config.js')

const charge = function (token) {
  return $.ajax({
    url: config.apiUrl + '/charge',
    method: 'POST',
    data: {
      stripeEmail: token.email,
      stripeToken: 'tok_visa'
    }
  })
}
module.exports = {
  charge
}
