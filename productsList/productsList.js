const URL = 'http://54.39.188.42/'

const products = document.querySelector('.products')

const b64DecodeUnicode = str => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

const productsMarkup = data => {  
  const parsedData = JSON.parse(b64DecodeUnicode(data))

  const products = parsedData.map(product => {
    const { id, title, sku: name, image, options, price, currency } = product

    const productOptions = options.map(option => {
      const { metal_type, metal_color, stone_shape, gemstone_color } = option

      return ` 
          <li>Metal type: ${metal_type}</li>
          <li>Metal color: ${metal_color}</li>
          <li>Metal color: ${stone_shape}</li>
          <li>Metal color: ${gemstone_color}</li>
        `
    })

    return `<div class="product">
          <div class="product__id">#${id}</div>
          <p class="product__subtitle">${title}</p>
          <h2 class="product__title">${name}</h2>
          <div class="product__img-box">
            <img src="${image}" alt="${name}" class="product__img">
          </div>
          <h3 class="product__options">PRODUCT OPTIONS</h3>
          <ul class="product__desc">
            ${productOptions}
          </ul>
          <p class="product__price">${parseInt(price).toFixed(2)} ${currency}</p>
        </div>`
  })

  return products
}

const getProducts = $.get(URL)
  .done(function(data) {
    const markup = productsMarkup(data)
    products.innerHTML = markup

    const productsItem = document.querySelectorAll('.product')
    productsItem.forEach(product => {
      const comma = product.nextSibling
      comma.parentNode.removeChild(comma)
    })
  })
  .fail(function() {
    alert('error ;(')
  })
