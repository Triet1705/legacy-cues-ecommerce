<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'
</script>

<template>
  <Navbar />

  <main>
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped>
main {
  min-height: 75vh;
  padding: 2rem 0;
  background: #fff;
}
</style>
