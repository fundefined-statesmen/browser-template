'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const ordersApi = require('../orders/api')
const store = require('../store.js')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(() => onSignIn(event))
    .then(ui.signUpSuccess)
    .catch(ui.signUpFail)
}

// Sign In
const storeUserToken = function (response) {
  store.user = response.user
  return response
}

const getOpenOrder = function (response) {
  api.getOpenOrder()
    .then(storeOpenOrder)
    .then(ui.getOpenOrderSuccess)
    .catch(ui.getOpenOrderFail)
}

const storeOpenOrder = function (response) {
  // console.log('orders', response.orders)
  // getting the first order which is also the open order
  const openOrder = response.orders.filter(order => order.status === 'open')[0]
  // console.log('openOrder', openOrder)
  if (openOrder) {
    store.openOrderId = openOrder._id
    return response
  } else {
    // am I going to get back an array of orders from create or
    // am I getting back one open order object
    ordersApi.create()
      .then(storeOpenOrder)
      .then(ui.createOpenOrderSuccess)
      .catch(ui.createOpenOrderFail)
  }
  // console.log('store.openOrderId', store.openOrderId)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(storeUserToken)
    .then(getOpenOrder)
    .then(ui.signInSuccess)
    .catch(ui.signInFail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFail)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFail)
}

const addHandlers = function () {
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-password-form').on('submit', onChangePassword)
  $('#sign-out-button').on('click', onSignOut)
  $('#login-button').on('click', ui.showCredentials)
  $('#change-password-button').on('click', ui.showChangePasswordForm)
}

module.exports = {
  addHandlers
}
