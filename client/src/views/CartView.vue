<script setup>
import { useCartStore } from '@/stores/cart'

// Kết nối với "Kho Giỏ hàng"
const cartStore = useCartStore()
</script>

<template>
  <div class="cart-view container">
    <h1 class="page-title">Shopping Cart</h1>

    <div v-if="cartStore.cartItems.length === 0" class="cart-empty">
      <p>Your cart is currently empty.</p>
      <RouterLink to="/products" class="return-to-shop">Return to shop</RouterLink>
    </div>

    <div v-else class="row">
      <div class="col-md-8">
        <table class="shop-table">
          <thead>
            <tr>
              <th class="product-name" colspan="2">Product</th>
              <th class="product-price">Price</th>
              <th class="product-quantity">Quantity</th>
              <th class="product-subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.cartItems" :key="item.product._id" class="cart-item">
              <td class="product-remove">
                <button @click="cartStore.removeFromCart(item.product._id)" class="remove-btn">
                  &times;
                </button>
              </td>
              <td class="product-thumbnail">
                <img :src="item.product.images[0]" :alt="item.product.name" />
                <span>{{ item.product.name }}</span>
              </td>
              <td class="product-price">
                <span>${{ item.product.price.toFixed(2) }}</span>
              </td>
              <td class="product-quantity">
                <div class="quantity-input">
                  <button @click="cartStore.decrementQuantity(item.product._id)">-</button>
                  <input type="number" :value="item.quantity" readonly />
                  <button @click="cartStore.incrementQuantity(item.product._id)">+</button>
                </div>
              </td>
              <td class="product-subtotal">
                <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-4">
        <div class="cart-totals">
          <h2>Cart Totals</h2>
          <div class="total-row">
            <span>Subtotal</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <div class="total-row">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div class="total-row total">
            <span>Total</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <button class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.page-title {
  text-align: center;
  margin-bottom: 2rem;
}
.row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.col-md-8 {
  flex: 2;
}
.col-md-4 {
  flex: 1;
}

.shop-table {
  width: 100%;
  border-collapse: collapse;
}
.shop-table th,
.shop-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  text-align: left;
}
.shop-table th {
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #666;
}

.cart-item td {
  vertical-align: middle;
}

.product-remove .remove-btn {
  border: 1px solid #ccc;
  background: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  color: #ccc;
}

.product-thumbnail {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.product-thumbnail img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.quantity-input {
  display: flex;
  border: 1px solid #ccc;
}
.quantity-input button {
  width: 30px;
  border: none;
  background: #f9f9f9;
  cursor: pointer;
}
.quantity-input input {
  width: 40px;
  text-align: center;
  border: none;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.cart-totals {
  background-color: #f9f9f9;
  padding: 2rem;
  border: 1px solid #e5e5e5;
}
.cart-totals h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}
.total-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: none;
}
.checkout-btn {
  width: 100%;
  padding: 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.cart-empty {
  text-align: center;
  padding: 4rem 0;
  border: 2px dashed #e5e5e5;
}

.return-to-shop {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #333;
  color: #fff;
  text-decoration: none;
}
</style>
