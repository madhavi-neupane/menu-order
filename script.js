async function fetchMenu() {
  const menuContainer = document.getElementById('menu-items')

  try {
    const response = await fetch('menu.json')
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const menuItems = await response.json()

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
  } catch (error) {
    console.log(error)
  }
}

document.addEventListener('DOMContentLoaded', fetchMenu)

//
//
async function placeOrder(itemId) {
  const response = await fetch('menu.json')
  const menuItems = await response.json()
  const orderItem = menuItems.find((item) => item.id == itemId)

  const orderList = document.getElementById('order-list')
  const orderItemDiv = document.createElement('div')

  orderItemDiv.textContent = `Order has been placed for ${
    orderItem.name
  }. Please wait for ${orderItem.preparationTime / 1000} seconds.`

  orderList.appendChild(orderItemDiv)

  await new Promise((resolve) => setTimeout(resolve, orderItem.preparationTime))

  orderItemDiv.textContent = `${orderItem.name} is ready.`
}
