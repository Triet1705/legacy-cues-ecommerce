<script setup>
import Logo from '../icons/Logo.vue'
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <ul class="navbar-nav nav-left">
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About</a></li>
      </ul>

      <a class="navbar-brand" href="/">
        <Logo />
      </a>

      <ul class="navbar-nav nav-right">
        <li><a href="#">Login</a></li>
        <li><a href="#">Cart</a></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #fff;
  border-bottom: 1px solid #e7e7e7;
  padding: 1rem 0;
  height: 80px;
  display: flex;
  align-items: center;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navbar-nav {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0;
  padding: 0;
  flex: 1;
}

.nav-left {
  justify-content: flex-start;
}

.nav-right {
  justify-content: flex-end;
}

.navbar-brand {
  text-decoration: none;
}

.navbar-nav a {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
