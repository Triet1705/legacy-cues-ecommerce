<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'
import ButtonCommon from '@/components/common/ButtonCommon.vue'

const router = useRouter()
const authStore = useAuthStore()
const loginIdentifier = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  try {
    const success = await authStore.login(loginIdentifier.value, password.value)
    if (success) {
      message.success('Login successful!')
      if (authStore.isAdmin) {
        router.push({ name: 'admin' })
      } else {
        router.push({ name: 'home' })
      }
    }
  } catch (error) {
    message.error(error.toString())
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-form-container">
      <h1 class="form-title">Login</h1>
      <p class="form-subtitle">Welcome back!</p>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="loginIdentifier">Email or Username</label>
          <input v-model="loginIdentifier" type="text" id="loginIdentifier" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <ButtonCommon type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </ButtonCommon>
        <p class="register-link">
          Doesn't have an account yet?
          <RouterLink to="/register">Register</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background-color: #fff;
}
.login-form-container {
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
.form-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.form-subtitle {
  text-align: center;
  color: #888;
  margin-bottom: 2rem;
}
.input-group {
  margin-bottom: 1.5rem;
}
.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.input-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 1rem;
}
.login-btn {
  width: 100%;
}
.register-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #555;
}
.register-link a {
  font-weight: 600;
  color: #1677ff;
  text-decoration: none;
}
</style>
