'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const auth = require('./auth/event')
const orders = require('./orders/event')
const products = require('./products/event')

$(() => {
  // your JS code goes here
  auth.addHandlers()
  orders.addHandlers()
  products.addHandlers()
})
