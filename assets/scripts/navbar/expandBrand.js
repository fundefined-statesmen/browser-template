'use strict'

$.fn.isInViewport = function () {
  const elementTop = $(this).offset().top
  const elementBottom = elementTop + $(this).outerHeight()

  const viewportTop = $(window).scrollTop()
  const viewportBottom = viewportTop + $(window).height()

  return elementBottom > viewportTop && elementTop < viewportBottom
}

const addStyle = function () {
  $(window).on('resize scroll', function () {
    // do codes here
    if (!$('#state-navbar').isInViewport()) {
      // console.log('time to expand')
    }
  })
}

module.exports = {
  addStyle
}
