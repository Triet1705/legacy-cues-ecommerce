import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  const addToCart = (productToAdd) => {
    const existingItem = cartItems.value.find((item) => item.product._id === productToAdd._id)

    if (existingItem) {
      if (existingItem.quantity < productToAdd.countInStock) {
        existingItem.quantity++
      } else {
        alert(`Sorry, we only have ${productToAdd.countInstock} items in stock!`)
      }
    } else {
      if (productToAdd.countInStock > 0) {
        cartItems.value.push({ product: productToAdd, quantity: 1 })
      } else {
        alert('Sorry, this product is out of stock!')
      }
    }
    console.log('Cart updated:', cartItems.value)
  }

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter((item) => item.product._id !== productId)
  }

  const incrementQuantity = (productId) => {
    const item = cartItems.value.find((item) => item.product._id === productId)
    if (item) {
      if (item.quantity < item.product.countInStock) {
        item.quantity++
      } else {
        alert(`Sorry, we only have ${item.product.countInStock} items in stock!`)
      }
    }
  }

  const decrementQuantity = (productId) => {
    const item = cartItems.value.find((item) => item.product._id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
    } else if (item) {
      removeFromCart(productId)
    }
  }

  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  })

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  }
})
