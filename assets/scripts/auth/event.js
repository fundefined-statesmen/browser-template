'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const ordersApi = require('../orders/api')
const store = require('../store.js')

const accountDeleteMessageModal = (message, status) => {
  $('#message-modal .message-modal-content').text(message)
  $('#message-modal > p').attr('status', status)
  $('#message-modal > input').attr('status', null)
  $('#message-modal').removeClass('d-none')
  $('#delete-account-confirmation').removeClass('d-none')
  $('#delete-account-denied').removeClass('d-none')
}

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
  $('#state-shopping-cart').attr('data-token', store.user.token)
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
  let openOrder
  if (response.orders !== null) {
    openOrder = response.orders.filter(order => order.status === 'open')[0]
  }
  // console.log('openOrder', openOrder)
  if (openOrder) {
    store.openOrderId = openOrder._id
    $('#state-shopping-cart').attr('data-openOrderId', store.openOrderId)
    return response
  } else {
    // am I going to get back an array of orders from create or
    // am I getting back one open order object
    ordersApi.create()
      .then((responseOpenOrder) => {
        store.openOrderId = responseOpenOrder.order.id
        $('#state-shopping-cart').attr('data-openOrderId', store.openOrderId)
      })
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
    .then(() => {
      store.user = null
      store.openOrderId = null
      // console.log(store)
    })
    .catch(ui.signOutFail)
}

// confirm that a user wants to delete their account
const accountDeleteConfirmation = function () {
  accountDeleteMessageModal('Are you sure you want to delete your account?', 'fail')
}

// handle a user's denial of actually wanting to delete their account
const accountDeleteDenial = function () {
  $('#message-modal, #delete-account-confirmation, #delete-account-denied').addClass('d-none')
}

// delete a users account
const deleteAccount = function (event) {
  event.preventDefault()
  $('#message-modal, #delete-account-confirmation, #delete-account-denied').addClass('d-none')

  api.deleteAccount()
    .then(ui.accountDeleted)
    .then(() => {
      store.user = null
      store.openOrderId = null
    })
    .catch(ui.deleteAccountFail)
}

const cancelUserForm = function (event) {
  $('form input').val('')
}

const addHandlers = function () {
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-password-form').on('submit', onChangePassword)
  $('#sign-out-button').on('click', onSignOut)
  $('#login-button').on('click', ui.showCredentials)
  $('#change-password-button').on('click', ui.showChangePasswordForm)
  $('#delete-account-button').on('click', accountDeleteConfirmation)
  $('#delete-account-confirmation').on('click', deleteAccount)
  $('#delete-account-denied').on('click', accountDeleteDenial)
  $('#login-button, #change-password-button').on('click', cancelUserForm)
}

module.exports = {
  addHandlers
}
