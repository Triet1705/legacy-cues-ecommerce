<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import axios from 'axios'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/stores/validator'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const validateForm = () => {
  errors.value.name = validateName(form.value.name)
  errors.value.email = validateEmail(form.value.email)
  errors.value.password = validatePassword(form.value.password)
  errors.value.confirmPassword = validateConfirmPassword(
    form.value.password,
    form.value.confirmPassword,
  )

  return Object.values(errors.value).every((errorMsg) => errorMsg === '')
}
const isLoading = ref(false)

const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  try {
    await axios.post('/api/users/register', {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    })
    message.success('Registration successful! Please log in.')
    router.push({ name: 'login' })
  } catch (error) {
    message.error(error.response?.data?.message || 'Registration failed.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-view">
    <div class="register-form-container">
      <h1 class="form-title">Create Account</h1>
      <form @submit.prevent="handleRegister" novalidate>
        <div class="input-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" />
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" />
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" id="confirmPassword" />
          <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>
        </div>
        <ButtonCommon type="submit" class="register-btn" :disabled="isLoading">
          {{ isLoading ? 'Creating Account...' : 'Register' }}
        </ButtonCommon>
      </form>
      <p class="login-link">
        Already have an account?
        <RouterLink to="/login">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background-color: #fff;
}
.register-form-container {
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
.register-btn {
  width: 100%;
}
.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #555;
}
.login-link a {
  font-weight: 600;
  color: #1677ff;
  text-decoration: none;
}
.error-text {
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
.input-group input {
  transition: border-color 0.3s ease;
}
.input-group:has(.error-text) input {
  border-color: #ff4d4f;
}
</style>
