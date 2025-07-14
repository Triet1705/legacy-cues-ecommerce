<script setup>
import Logo from '../icons/Logo.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <ul class="navbar-nav nav-left">
        <li><RouterLink to="/products">Products</RouterLink></li>
        <!-- <li><RouterLink to="/about">About</RouterLink></li> -->
        <li><RouterLink to="/admin">Admin</RouterLink></li>
      </ul>

      <RouterLink to="/" class="navbar-brand">
        <Logo />
      </RouterLink>

      <ul class="navbar-nav nav-right">
        <li><RouterLink to="/login">Login</RouterLink></li>
        <li><RouterLink to="/cart">Cart</RouterLink></li>
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
  color: #555;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease-in-out;
}

.navbar-nav a.router-link-exact-active {
  color: #000;
  font-weight: 700;
  border-bottom-color: #000;
}

.navbar-nav a:not(.router-link-exact-active):hover {
  color: #000;
}
</style>
