<script setup>
import ProductCard from '../components/ProductCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const products = ref()
const isLoading = ref(true)
const error = ref(null)

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products')
    products.value = response.data
  } catch (error) {
    error.value = 'Failed to fetch product. Please try again.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchProducts()
})
</script>
<template>
  <main class="home-view">
    <h1 class="page-title">Our Collection</h1>

    <div v-if="isLoading" class="loading-message">Loading products...</div>

    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="!isLoading && !error" class="product-grid">
      <RouterLink
        v-for="product in products"
        :key="product._id"
        :to="`/product/${product._id}`"
        class="product-link"
      >
        >
        <ProductCard :product="product" />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.page-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 2rem;
  font-weight: 600;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  padding: 4rem 0;
}

.error-message {
  color: red;
}
</style>
