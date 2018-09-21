'use strict'

const api = require('./api')
const ui = require('./ui')
const StripeCheckout = require('stripe')('sk_test_69RDNsAfhtvlC945jIWOtp7X')

const handler = StripeCheckout.configure({
  key: 'pk_test_LWGkLPvWiwQnlpGbYoQ45aGm',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function (token) {
    api.charge(token)
      .then(ui.chargeSuccess)
      .catch(ui.chargeFail)
  }
})

const onCustomButtonClick = function (e) {
  // Open Checkout with further options:
console.log('clicked')
  handler.open({
    name: 'Stripe.com',
    description: '2 widgets',
    zipCode: true,
    amount: 2000
  })
  e.preventDefault()
}

window.addEventListener('popstate', function () {
  handler.close()
})

const addHandlers = function () {
  $('#customButton').on('click', onCustomButtonClick)
}

module.exports = {
  addHandlers
}
