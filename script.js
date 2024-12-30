document.addEventListener('DOMContentLoaded', () => {
  fetchMenu()
})

function fetchMenu() {
  const menuContainer = document.getElementById(`menu-items`)

  fetch(`menu.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error`)
      }
      return response.json()
    })

    .then((menuItems) => {
      menuContainer.innerHTML = ''

      menuItems.forEach((item) => {
        const menuItem = document.createElement('div')
        menuItem.classList.add('menu-item')
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-img">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p><b>${item.price}</b></p>
            <button onclick ="placeOrder(${item.id})">Order</button>
        `

        menuContainer.appendChild(menuItem)
      })
    })

    .catch((error) => console.error(error))
}

function placeOrder(itemId) {
  fetch('menu.json')
    .then((response) => response.json())
    .then((menuItems) => {
      const orderItem = menuItems.find((item) => item.id == itemId)

      if (!orderItem) {
        alert('Invalid item')
        return
      }

      const orderList = document.getElementById('order-list')
      const orderItemDiv = document.createElement('div')

      orderItemDiv.textContent = `Order has been placed for ${
        orderItem.name
      }. Please wait for ${orderItem.preparationTime / 1000} seconds.`

      orderList.appendChild(orderItemDiv)

      return new Promise((resolve) =>
        setTimeout(resolve, orderItem.preparationTime)
      ).then(() => {
        orderItemDiv.textContent =
          orderItemDiv.textContent = `${orderItem.name} is ready.`
      })
    })

    .catch((error) => console.error(error))
}
