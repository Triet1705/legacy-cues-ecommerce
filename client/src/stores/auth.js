import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('userInfo')) || null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.isAdmin || false)

  const login = async (loginIdentifier, password) => {
    try {
      const { data } = await axios.post('/api/users/login', { loginIdentifier, password })

      user.value = data
      localStorage.setItem('userInfo', JSON.stringify(data))

      return true
    } catch (error) {
      console.error('Login failed:', error)
      throw error.response?.data?.message || 'An error occurred during login.'
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/users/logout')
      user.value = null
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  }
})
