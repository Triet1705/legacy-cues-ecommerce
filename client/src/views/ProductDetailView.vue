<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
import { ShoppingCartOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const productId = route.params.id

const product = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/products/${productId}`)
    product.value = response.data
  } catch (error) {
    error.value = 'Product not found'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div class="product-detail-page">
    <div v-if="isLoading" class="loading-message">Loading...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="product" class="container">
      <div class="product-main">
        <div class="row">
          <div class="product-gallery col">
            <img :src="product.images" :alt="product.name" class="main-image" />
          </div>

          <div class="product-info col">
            <h1 class="text-title-xl">{{ product.name }}</h1>
            <p class="text-subtle" style="margin-bottom: 1.5rem">by {{ product.brand }}</p>
            <p class="text-title-lg" style="margin-bottom: 1.5rem">
              ${{ product.price.toFixed(2) }}
            </p>
            <p class="text-body" style="margin-bottom: 2rem">{{ product.description }}</p>

            <ButtonCommon :icon="true" class="add-to-cart-btn">
              <template #icon>
                <ShoppingCartOutlined />
              </template>
              Add to Cart
            </ButtonCommon>
            <!-- <button class="add-to-cart-btn">Add to Cart</button> -->

            <div class="product-specs">
              <h3>Specifications</h3>
              <ul>
                <li><strong>Weight:</strong> {{ product.weight }}</li>
                <li><strong>Pin:</strong> {{ product.pin }}</li>
                <li><strong>Diameter:</strong> {{ product.diameter }}</li>
                <li><strong>Material:</strong> {{ product.material }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  margin: 2rem auto;
  padding: 0 2rem;
}
.product-main {
  padding: 40px 0;
}
.main-image {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
}

.add-to-cart-btn {
  width: 100%;
  border: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;
}
.add-to-cart-btn:hover {
  background-color: #555;
}

.product-specs h3 {
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}
.product-specs ul {
  list-style: none;
}
.product-specs li {
  margin-bottom: 0.5rem;
}
</style>
