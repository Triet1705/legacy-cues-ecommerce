<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
import { PlusOutlined, MoreOutlined } from '@ant-design/icons-vue'
import { Popover, Modal, message } from 'ant-design-vue'
import ActionMenu from '@/components/common/ActionMenu.vue'
import FormProduct from './CreateForm/FormProduct.vue'
const products = ref()
const isLoading = ref(true)
const error = ref(null)
const isSaving = ref(false)

const isModalOpen = ref(false)
const editingProduct = ref(null)

const openAddModal = () => {
  isModalOpen.value = true
  editingProduct.value = null
}
const openEditModal = (product) => {
  editingProduct.value = { ...product }
  isModalOpen.value = true
}
const handleCancel = () => {
  isModalOpen.value = false
}

const handleDelete = (id) => {
  Modal.confirm({
    title: 'Are you sure you want to delete this product?',
    content: 'This action cannot be undone.',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk: async () => {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`)
        products.value = products.value.filter((p) => p._id !== id)
        message.success('Product deleted successfully!')
      } catch (err) {
        console.error('Failed to delete product:', err)
        message.error('Failed to delete product.')
      }
    },
    onCancel() {
      console.log('Delete canceled')
    },
  })
}

const handleSave = async (dataFromForm) => {
  isSaving.value = true
  const { files, ...productData } = dataFromForm

  const formData = new FormData()

  Object.entries(productData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((url) => formData.append('existingImages[]', url))
      } else {
        formData.append(key, value)
      }
    }
  })

  if (files && files.length > 0) {
    files.forEach((file) => {
      if (file.originFileObj) {
        formData.append('images', file.originFileObj)
      }
    })
  }

  try {
    let successMessage = ''
    if (productData._id) {
      await axios.put(`http://localhost:5000/api/products/${productData._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      successMessage = 'Product updated successfully!'
    } else {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      successMessage = 'Product created successfully!'
    }

    isModalOpen.value = false
    await fetchProducts()
    message.success(successMessage)
  } catch (err) {
    console.error('Failed to save product:', err)
    message.error(err.response?.data?.message || 'An unknown error occurred')
  } finally {
    isSaving.value = false
  }
}

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products')
    products.value = response.data
  } catch (error) {
    error.value = 'Failed to fetch product. Please try again.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchProducts()
})
</script>
<template>
  <div class="admin-view-wrapper">
    <div class="admin-view container">
      <div class="page-header">
        <h1 class="page-title">Product Management</h1>
        <ButtonCommon :icon="true" @click="openAddModal">
          <template #icon><PlusOutlined /></template>
          Add New Product
        </ButtonCommon>
      </div>

      <div v-if="isLoading" class="loading-message">Loading...</div>
      <div v-if="error" class="error-message">{{ error }}</div>

      <div v-if="!isLoading && !error" class="table-container">
        <table class="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th style="width: 120px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product._id">
              <td>
                <img
                  v-if="product.images && product.images.length > 0"
                  :src="product.images[0]"
                  :alt="product.name"
                  class="product-thumbnail"
                />
              </td>
              <td class="product-name-cell">{{ product.name }}</td>
              <td>{{ product.brand }}</td>
              <td>${{ product.price.toFixed(2) }}</td>
              <td>{{ product.countInStock }}</td>
              <td>
                <Popover trigger="click" placement="bottom">
                  <template #content>
                    <ActionMenu
                      @edit="openEditModal(product)"
                      @delete="handleDelete(product._id)"
                    />
                  </template>

                  <ButtonCommon :icon="true" class="btn-action-trigger">
                    <template #icon><MoreOutlined /></template>
                  </ButtonCommon>
                </Popover>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal v-model:open="isModalOpen" :footer="null" @cancel="handleCancel" width="850px">
          <FormProduct
            :productData="editingProduct"
            :is-saving="isSaving"
            @submit="handleSave"
            @cancel="handleCancel"
          />
        </Modal>
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
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.product-table th,
.product-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.product-table thead th {
  background-color: #fafafa;
  font-weight: 600;
  color: #333;
}

.product-table tbody tr:last-child td {
  border-bottom: none;
}

.product-table tbody tr:hover {
  background-color: #f5f5f5;
}

.product-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name-cell {
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn-action-trigger {
  background: none !important;
  border: 1px solid transparent;
  color: #555;
  font-size: 1.2rem;
  padding: 0.5rem !important;
}

.popover-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  background: #fff;
  border-radius: 8px;
}
.error-message {
  color: #ff4d4f;
}
</style>
