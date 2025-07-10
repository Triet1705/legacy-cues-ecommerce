<script setup>
import { RouterLink } from 'vue-router'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
</script>

<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>Welcome to LegacyCues</h1>
      <p>Where craftsmanship meets precision.</p>
      <!-- <RouterLink to="/products" class="cta-button">Shop The Collection</RouterLink> -->
      <RouterLink to="/products">
        <ButtonCommon>The Collection</ButtonCommon>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}
.hero-section {
  text-align: center;
}
.hero-section h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.hero-section p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}
.cta-button {
  display: inline-block;
  background-color: #333;
  color: #fff;
  padding: 1rem 2.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.cta-button:hover {
  background-color: #555;
}
</style>
