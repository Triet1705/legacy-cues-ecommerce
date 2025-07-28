<script setup>
import Logo from '../icons/Logo.vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <ul class="navbar-nav nav-left">
        <li><RouterLink to="/products">Products</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>

      <RouterLink to="/" class="navbar-brand">
        <Logo />
      </RouterLink>

      <ul class="navbar-nav nav-right">
        <li v-if="authStore.isAdmin" class="dropdown">
          <a href="#" class="dropdown-toggle">Admin</a>
          <ul class="dropdown-menu">
            <li><RouterLink to="/admin">Product Management</RouterLink></li>
            <li><RouterLink to="/admin/users">User Management</RouterLink></li>
          </ul>
        </li>

        <li v-if="authStore.isAuthenticated">
          <a href="#" @click.prevent="authStore.logout()">Logout</a>
        </li>
        <template v-else>
          <li><RouterLink to="/login">Login</RouterLink></li>
          <li class="separator">|</li>
          <li><RouterLink to="/register">Register</RouterLink></li>
        </template>
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
.separator {
  color: #e0e0e0;
  cursor: default;
}
.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  list-style: none;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease-in-out;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
}

.dropdown-menu li a:hover {
  background-color: #f5f5f5;
}
</style>
