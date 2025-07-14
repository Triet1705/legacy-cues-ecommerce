<template>
  <div class="product-card">
    <div class="product-image-wrapper">
      <img :src="product.images[0]" :alt="product.name" class="product-image" />
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">${{ product.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.product-card {
  border: 1px solid #e5e5e5;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.4);
}

.product-image-wrapper {
  padding: 1rem;
  background-color: #fff;
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  display: block;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 1rem 1.5rem;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.4s ease-in-out;
  border-top: 1px solid #e5e5e5;
}

.product-card:hover .product-info {
  transform: translateY(0);
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}

.product-price {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
