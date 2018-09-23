'use strict'

const messageModal = (message, status) => {
  // Modal status: normal, success, fail
  $('#message-modal .message-modal-content').text(message)
  $('#message-modal .message-modal-content').attr('status', status)
  $('#message-modal').removeClass('d-none')
  setTimeout(() => {
    $('#message-modal').addClass('d-none')
  }, 1500)
}

// Sign Up
const signUpSuccess = function () {
  $('#sign-up-form input').val('')
}

const signUpFail = function () {
  $('#sign-up-form input').val('')
  messageModal('Fail to sign up', 'fail')
}

// Sign in
const signInSuccess = function () {
  $('#sign-in-form input').val('')
  $('#state-credentials').addClass('d-none')
  $('#login-button').addClass('d-none')
  $('#state-products').removeClass('d-none')
  $('#delete-account-button').removeClass('d-none')
  $('#change-password-button').removeClass('d-none')
  $('#sign-out-button').removeClass('d-none')
  $('#shopping-cart-button').removeClass('d-none')
  $('#previous-orders-button').removeClass('d-none')
}

const signInFail = function () {
  $('#sign-in-form input').val('')
  messageModal('Fail to sign in', 'fail')
}

// Change Password
const changePasswordSuccess = function () {
  $('#change-password-form input').val('')
  messageModal('You have changed password', 'success')
}

const changePasswordFail = function () {
  $('#change-password-form input').val('')
  messageModal('Please check your old password', 'fail')
}

// Sign Out
const signOutSuccess = function () {
  messageModal('Signed Out', 'success')
  $('#login-button').removeClass('d-none')
  $('#state-products').removeClass('d-none')
  $('#delete-account-button').addClass('d-none')
  $('#change-password-button').addClass('d-none')
  $('#sign-out-button').addClass('d-none')
  $('#shopping-cart-button').addClass('d-none')
  $('#previous-orders-button').addClass('d-none')
  $('#state-shopping-cart').addClass('d-none')
  $('#state-previous-orders').addClass('d-none')
  $('#change-password-form input').val('')
  $('#change-password-form').addClass('d-none')
}

const signOutFail = function () {
  messageModal('Sign out fail', 'fail')
}

const deleteAccountFail = function () {
  messageModal('Account Delete Failed', 'fail')
}

const accountDeleted = function () {
  messageModal('Account Deleted')
  $('#login-button').removeClass('d-none')
  $('#state-products').removeClass('d-none')
  $('#delete-account-button').addClass('d-none')
  $('#change-password-button').addClass('d-none')
  $('#sign-out-button').addClass('d-none')
  $('#shopping-cart-button').addClass('d-none')
  $('#previous-orders-button').addClass('d-none')
  $('#state-shopping-cart').addClass('d-none')
  $('#state-previous-orders').addClass('d-none')
  $('#change-password-form input').val('')
  $('#change-password-form').addClass('d-none')
}

// getOpenOrder
const getOpenOrderSuccess = function () {
}

const getOpenOrderFail = function () {
  messageModal('getOpenOrder Fail', 'fail')
}

const createOpenOrderSuccess = function () {
}

const createOpenOrderFail = function () {
  messageModal('Fail to create open order', 'fail')
}

// hide/show stuff when login-button is clicked
const showCredentials = function () {
  $('#state-credentials').toggleClass('d-none')
  $('#state-products').toggleClass('d-none')
}

const showChangePasswordForm = function () {
  $('#state-change-password').toggleClass('d-none')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePasswordSuccess,
  changePasswordFail,
  signOutSuccess,
  signOutFail,
  getOpenOrderSuccess,
  getOpenOrderFail,
  showCredentials,
  createOpenOrderSuccess,
  createOpenOrderFail,
  showChangePasswordForm,
  deleteAccountFail,
  accountDeleted
}
