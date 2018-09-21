'use strict'

const store = require('./../store.js')

const messageModal = (message, status) => {
  // Modal status: normal, success, fail
  $('#message-modal .message-modal-content').text(message)
  $('#message-modal .message-modal-content').attr('status', status)
  $('#message-modal').removeClass('d-none')
  setTimeout(() => {
    $('#message-modal').addClass('d-none')
  }, 1500)
}

const chargeSuccess = function (response) {
  messageModal('Payment Success', 'Success')
}
const chargeFail = function () {
  messageModal('Payment Failed', 'fail')
}

module.exports = {
  messageModal,
  chargeSuccess,
  chargeFail
}
