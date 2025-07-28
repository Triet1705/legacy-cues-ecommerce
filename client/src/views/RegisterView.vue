<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import axios from 'axios'
import ButtonCommon from '@/components/common/ButtonCommon.vue'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    message.error('Passwords do not match!')
    return
  }
  isLoading.value = true
  try {
    await axios.post('/api/users/register', {
      name: name.value,
      email: email.value,
      password: password.value,
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
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="name">Name</label>
          <input v-model="name" type="text" id="name" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" required />
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
</style>
