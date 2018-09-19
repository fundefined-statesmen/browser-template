const ordersTemplate = require('./handlebars/orders.handlebars')

const getOrdersSuccess = (res) => {
  // demo order
  const order = {
    date: '2018-09-19',
    status: 'open',
    line_items: [
      {
        name: 'product name',
        img_url: 'https://soteriawellness.com/wp-content/uploads/2018/05/demo-image.jpg',
        desc: 'product description',
        price: 12
      }
    ]
  }

  if (order.status === 'open') {
    const ordersTemplateHTML = ordersTemplate({orders: [ order ]})
    console.log('we are here', ordersTemplateHTML)
    $('#shopping-cart').html(ordersTemplateHTML)
  }
}

getOrdersSuccess()
