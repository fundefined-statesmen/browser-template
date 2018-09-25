'use strict'

const productsTemplate = require('../handlebars/products.handlebars')

const messageModal = (message, status) => {
  // Modal status: normal, success, fail
  $('#message-modal .message-modal-content').text(message)
  $('#message-modal .message-modal-content').attr('status', status)
  $('#message-modal').removeClass('d-none')
  setTimeout(() => {
    $('#message-modal').addClass('d-none')
  }, 1500)
}

// All Products
const onGetAllProductsSuccess = function (response) {
  response.products.forEach((product) => {
    product.price /= 100
  })
  // messageModal('Shown Products', 'success')
  // console.log('response.products', response.products)
  const productsTemplateHTML = productsTemplate({products: response.products})
  $('#products').html(productsTemplateHTML)
}

const onGetAllProductsFail = function (response) {
  messageModal('Fail to get all products', 'fail')
}

const onAddToCart = function (response) {
  messageModal('Added to Cart', 'success')
}

const searchResult = function (response) {
  $('.searchbar input').val('')
  if (response.products.length === 0) {
    $('#products').html('<h6>No product found</h6>')
  } else {
    onGetAllProductsSuccess(response)
  }
}

module.exports = {
  onGetAllProductsSuccess,
  onGetAllProductsFail,
  onAddToCart,
  searchResult
}
