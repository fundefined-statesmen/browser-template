'use strict'

// Create a Stripe client using public test key
const stripe = Stripe('pk_test_LWGkLPvWiwQnlpGbYoQ45aGm')
const store = require('../store')
const ordersApi = require('../orders/api')

const addHandlers = function () {
  const handler = StripeCheckout.configure({
    key: 'pk_test_LWGkLPvWiwQnlpGbYoQ45aGm',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function (token) {
      console.log('token from stripe', token)
      // charge user
      $.ajax({
        method: 'POST',
        url: 'http://localhost:4741/charge',
        data: {
          stripeEmail: token.email,
          stripeToken: 'tok_visa',
          totalAmount: store.totalAmount
        }
      })
        .then((response) => {
          // success on charging user then we
          // close openOrder
          console.log('response from charging user', response)
          return $.ajax({
            method: 'PATCH',
            url: 'http://localhost:4741/orders/' + store.openOrderId,
            headers: {
              'Authorization': 'Token token=' + store.user.token
            },
            data: {
              order: {
                status: 'closed'
              }
            }
          })
        })
        .then((response) => {
          // success on closing order then we
          // open new order
          console.log('response from closing order', response)
          return ordersApi.create()
        })
        .then((response) => {
          // succes on open new order
          store.openOrderId = response.order._id
          console.log('response from opening new order', response)

          $('#state-credentials').addClass('d-none')
          $('#login-button').addClass('d-none')
          $('#state-shopping-cart').addClass('d-none')
          $('#state-products').removeClass('d-none')
          $('#change-password-button').removeClass('d-none')
          $('#sign-out-button').removeClass('d-none')
          $('#shopping-cart-button').removeClass('d-none')
          $('#previous-orders-button').removeClass('d-none')
        })
        .catch(console.err)
    }
  })

  document.getElementById('checkout').addEventListener('click', function (e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Nozama.com',
      description: 'Store of widgets',
      zipCode: true,
      amount: store.totalAmount
    })
    e.preventDefault()
  })

  // Close Checkout on page navigation:
  window.addEventListener('popstate', function () {
    handler.close()
  })
}

module.exports = {
  addHandlers
}
