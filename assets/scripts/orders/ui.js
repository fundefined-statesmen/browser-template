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
const showCart = function () {
  $('#sign-up-form input').val('')
  messageModal('You have signed up', 'success')
}

const indexOrders = function () {
  $('#sign-up-form input').val('')
  messageModal('Fail to sign up', 'fail')
}

module.exports = {
  shoCart,
  indexOrders
  signInSuccess,
  signInFail,
  changePasswordSuccess,
  changePasswordFail,
  signOutSuccess,
  signOutFail
}
