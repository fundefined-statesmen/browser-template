'use strict'

const config = require('../config.js')
const store = require('../store.js')

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const getOpenOrder = function () {
  return $.ajax({
    url: config.apiUrl + '/orders',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}
const deleteAccount = function () {
  return $.ajax({
    url: config.apiUrl + '/delete-account',
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getOpenOrder,
  deleteAccount
}
