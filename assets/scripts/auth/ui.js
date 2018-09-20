'use strict'

const store = require('../store.js')

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
  messageModal('You have signed up', 'success')
}

const signUpFail = function () {
  $('#sign-up-form input').val('')
  messageModal('Fail to sign up', 'fail')
}

// Sign in
const signInSuccess = function (response) {
  $('#sign-in-form input').val('')
  messageModal('You have signed in', 'success')
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
}

const signOutFail = function () {
  messageModal('Sign out fail', 'fail')
}

const getOpenOrderSuccess = function (response) {
  messageModal('getOpenOrder Success', 'success')
  // console.log('orders', response.orders)
  // getting the first order which is also the open order
  const openOrder = response.orders.filter(order => order.status === 'open')[0]
  // console.log('openOrder', openOrder)
  store.openOrderId = openOrder._id
  // console.log('store.openOrderId', store.openOrderId)
}

const getOpenOrderFail = function (response) {
  messageModal('getOpenOrder Fail', 'fail')
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
  getOpenOrderFail
}

// db.orders.insert({
//   date: '2018-09-19T22:34:43.747Z',
//   status: 'open',
//   line_item: [],
//   owner: '5ba2cf03b54ec536ecb8ce12'
// })
