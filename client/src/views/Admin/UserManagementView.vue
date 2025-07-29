<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { message, Switch as ASwitch, Modal as AModal, Popover as APopover } from 'ant-design-vue'
import { PlusOutlined, MoreOutlined } from '@ant-design/icons-vue'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
import ActionMenu from '@/components/common/ActionMenu.vue'
import FormUser from './CreateForm/FormUser.vue'
const users = ref([])
const isLoading = ref(true)
const isSaving = ref(false)

const isModalOpen = ref(false)
const editingUser = ref(null)

const openAddModal = () => {
  editingUser.value = null
  isModalOpen.value = true
}

const openEditModal = (user) => {
  editingUser.value = { ...user }
  isModalOpen.value = true
}

const handleCancel = () => {
  isModalOpen.value = false
}

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

const handleSaveUser = async (userData) => {
  isSaving.value = true
  try {
    if (userData._id) {
      const { data: updatedUser } = await axios.put(`/api/users/${userData._id}`, userData)
      const index = users.value.findIndex((u) => u._id === updatedUser._id)
      if (index !== -1) users.value[index] = { ...users.value[index], ...updatedUser }
      message.success('User updated successfully!')
    } else {
      await axios.post('/api/users', userData)
      message.success('User created successfully!')
      await fetchUsers()
    }
    isModalOpen.value = false
  } catch (err) {
    message.error(err.response?.data?.message || 'Failed to save user.')
  } finally {
    isSaving.value = false
  }
}
const handleDelete = (user) => {
  AModal.confirm({
    title: `Delete user ${user.name}?`,
    content: 'This action cannot be undone.',
    okText: 'Delete',
    okType: 'danger',
    onOk: async () => {
      try {
        await axios.delete(`/api/users/${user._id}`)
        users.value = users.value.filter((u) => u._id !== user._id)
        message.success('User deleted successfully!')
      } catch (err) {
        message.error(err.response?.data?.message || 'Failed to delete user.')
      }
    },
  })
}

const handleAdminChange = async (user, checked) => {
  try {
    await axios.put(`/api/users/${user._id}`, { isAdmin: checked })
    message.success(`User ${user.name}'s admin status updated.`)
    const userInList = users.value.find((u) => u._id === user._id)
    if (userInList) userInList.isAdmin = checked
  } catch (error) {
    message.error('Failed to update admin status.')
    const userInList = users.value.find((u) => u._id === user._id)
    if (userInList) userInList.isAdmin = !checked
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="admin-view-wrapper">
    <div class="admin-view container">
      <div class="page-header">
        <h1 class="page-title">User Management</h1>
        <ButtonCommon :icon="true" @click="openAddModal">
          <template #icon><PlusOutlined /></template>
          Add New User
        </ButtonCommon>
      </div>
      <div v-if="isLoading" class="loading-message">Loading...</div>
      <div v-else class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th style="width: 120px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user.name }}</td>
              <td>
                <a :href="`mailto:${user.email}`">{{ user.email }}</a>
              </td>
              <td>
                <a-switch
                  :checked="user.isAdmin"
                  @change="(checked) => handleAdminChange(user, checked)"
                />
              </td>
              <td>
                <a-popover trigger="click" placement="left">
                  <template #content>
                    <ActionMenu @edit="openEditModal(user)" @delete="handleDelete(user)" />
                  </template>
                  <ButtonCommon :icon="true" class="btn-action-trigger">
                    <template #icon><MoreOutlined /></template>
                  </ButtonCommon>
                </a-popover>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AModal
        v-model:open="isModalOpen"
        :title="editingUser ? 'Edit User' : 'Add New User'"
        :footer="null"
        @cancel="handleCancel"
        width="500px"
        destroyOnClose
      >
        <FormUser
          :userData="editingUser"
          :is-saving="isSaving"
          @submit="handleSaveUser"
          @cancel="handleCancel"
        />
      </AModal>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.btn-action-trigger {
  background: none !important;
  border: 1px solid transparent;
  color: #555;
  font-size: 1.2rem;
  padding: 0.5rem !important;
}
.loading-message {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
}
</style>
