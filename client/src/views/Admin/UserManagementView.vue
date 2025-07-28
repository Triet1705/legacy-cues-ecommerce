<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { message, Switch as ASwitch } from 'ant-design-vue'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'

const users = ref([])
const isLoading = ref(true)

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get('/api/users')
    users.value = data
  } catch (error) {
    message.error('Failed to fetch users.')
  } finally {
    isLoading.value = false
  }
}

const handleAdminChange = async (user, checked) => {
  try {
    await axios.put(`/api/users/${user._id}`, { isAdmin: checked })
    message.success(`User ${user.name}'s admin status updated.`)
    const userInList = users.value.find((u) => u._id === user._id)
    if (userInList) {
      userInList.isAdmin = checked
    }
  } catch (error) {
    message.error('Failed to update admin status.')
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="admin-view-wrapper">
    <div class="admin-view container">
      <div class="page-header">
        <h1 class="page-title">User Management</h1>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.name }}</td>
              <td>
                <a :href="`mailto:${user.email}`">{{ user.email }}</a>
              </td>
              <td>
                <a-switch
                  :checked="user.isAdmin"
                  @change="(checked) => handleAdminChange(user, checked)"
                >
                  <template #checkedChildren><CheckOutlined /></template>
                  <template #unCheckedChildren><CloseOutlined /></template>
                </a-switch>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-view-wrapper {
  background-color: #f0f1f3;
  width: 100%;
  min-height: calc(100vh - 80px);
}
.admin-view {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.page-header {
  margin-bottom: 2rem;
}
.page-title {
  font-size: 2rem;
  font-weight: 700;
}
.table-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.data-table th,
.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}
.data-table thead th {
  background-color: #fafafa;
  font-weight: 600;
}
</style>
