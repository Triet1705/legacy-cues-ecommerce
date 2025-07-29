<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
import { validateLoginIdentifier } from '../stores/validator'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  loginIdentifier: '',
  password: '',
})
const errors = ref({
  loginIdentifier: '',
  password: '',
})
const isLoading = ref(false)

const validateForm = () => {
  errors.value.loginIdentifier = validateLoginIdentifier(form.value.loginIdentifier)
  errors.value.password = form.value.password ? '' : 'Password is required.'

  return Object.values(errors.value).every((errorMsg) => errorMsg === '')
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  try {
    const success = await authStore.login(form.value.loginIdentifier, form.value.password)
    if (success) {
      message.success('Login successful!')
      if (authStore.isAdmin) {
        router.push({ name: 'admin-products' })
      } else {
        router.push({ name: 'home' })
      }
    }
  } catch (error) {
    message.error(error)
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
      <form @submit.prevent="handleLogin" novalidate>
        <div class="input-group">
          <label for="loginIdentifier">Email or Username</label>
          <input v-model="form.loginIdentifier" type="text" id="loginIdentifier" />
          <span v-if="errors.loginIdentifier" class="error-text">{{ errors.loginIdentifier }}</span>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" />
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>
        <ButtonCommon type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </ButtonCommon>
      </form>
      <p class="register-link">
        Doesn't have an account yet?
        <RouterLink to="/register">Register</RouterLink>
      </p>
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
  transition: border-color 0.3s ease;
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
.error-text {
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
.input-group:has(.error-text) input {
  border-color: #ff4d4f;
}
</style>
