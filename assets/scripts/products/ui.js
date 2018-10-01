'use strict'

const productsTemplate = require('../handlebars/products.handlebars')
const messageModal = require('../helpers/modalMessage')

// All Products
const onGetAllProductsSuccess = function (response) {
  response.products.forEach((product) => {
    product.price /= 100
  })
  // messageModal('Shown Products', 'success')
  // console.log('response.products', response.products)
  const productsTemplateHTML = productsTemplate({products: response.products})
  $('#products').html(productsTemplateHTML)
  $('#state-change-password').addClass('d-none')
}

const onGetAllProductsFail = function (response) {
  messageModal('Fail to get all products', 'fail')
}

const onAddToCart = function (response) {
  messageModal('Added to Cart', 'success')
}

module.exports = {
  onGetAllProductsSuccess,
  onGetAllProductsFail,
  onAddToCart
}
