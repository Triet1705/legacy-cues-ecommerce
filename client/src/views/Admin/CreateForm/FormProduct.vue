<script setup>
import { ref, watch } from 'vue'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { Modal as AModal, Upload as AUpload } from 'ant-design-vue'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
const previewVisible = ref(false)
const previewImage = ref('')
const handlePreviewCancel = () => {
  previewVisible.value = false
}
const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj)
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
}

const props = defineProps({
  productData: {
    type: Object,
    default: null,
  },
  isSaving: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const formState = ref({})
const fileList = ref([])

watch(
  () => props.productData,
  (newData) => {
    if (newData) {
      formState.value = { ...newData }
      fileList.value = (newData.images || []).map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.png`,
        status: 'done',
        url: url,
      }))
    } else {
      formState.value = {
        name: '',
        brand: '',
        price: 0,
        countInStock: 0,
        material: '',
        weight: '',
        pin: '',
        diameter: '',
        description: '',
        images: [],
      }
      fileList.value = []
    }
  },
  { immediate: true, deep: true },
)

const handleSubmit = () => {
  const formDataWithFiles = {
    ...formState.value,
    files: fileList.value,
  }
  emit('submit', formDataWithFiles)
}

const handleBeforeUpload = (file) => {
  return false
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <div class="text-title-form">Add Product</div>
    <div class="form-section">
      <div class="section-grid">
        <div class="input-group">
          <label for="name">Name</label>
          <input v-model="formState.name" type="text" id="name" required />
        </div>
        <div class="input-group">
          <label for="brand">Brand</label>
          <input v-model="formState.brand" type="text" id="brand" required />
        </div>
        <div class="input-group">
          <label for="price">Price ($)</label>
          <input v-model.number="formState.price" type="number" id="price" required />
        </div>
        <div class="input-group">
          <label for="countInStock">Stock Quantity</label>
          <input v-model.number="formState.countInStock" type="number" id="countInStock" required />
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="section-grid">
        <div class="input-group">
          <label for="material">Material</label>
          <input v-model="formState.material" type="text" id="material" />
        </div>
        <div class="input-group">
          <label for="weight">Weight (oz)</label>
          <input v-model="formState.weight" type="text" id="weight" />
        </div>
        <div class="input-group">
          <label for="pin">Pin</label>
          <input v-model="formState.pin" type="text" id="pin" />
        </div>
        <div class="input-group">
          <label for="diameter">Diameter (mm)</label>
          <input v-model="formState.diameter" type="text" id="diameter" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="input-group full-width">
        <label for="description">Description</label>
        <textarea v-model="formState.description" id="description" rows="4"></textarea>
      </div>
      <div class="input-group full-width">
        <label for="images">Images</label>
        <AUpload
          v-model:file-list="fileList"
          list-type="picture-card"
          :before-upload="handleBeforeUpload"
          @remove="handleRemove"
          multiple
          @preview="handlePreview"
        >
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </AUpload>
        <AModal :open="previewVisible" :title="null" :footer="null" @cancel="handlePreviewCancel">
          <img alt="preview" style="width: 100%" :src="previewImage" />
        </AModal>
      </div>
    </div>

    <div class="form-actions">
      <ButtonCommon type="button" class="btn-cancel" @click="emit('cancel')">Cancel</ButtonCommon>
      <ButtonCommon type="submit" class="btn-save" :disabled="isSaving">
        {{ isSaving ? 'Saving...' : 'Save Product' }}
      </ButtonCommon>
    </div>
  </form>
</template>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.input-group input,
.input-group textarea {
  padding: 0.4rem 0.8rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #6e7c6e;
  box-shadow: 0 0 0 2px rgba(162, 189, 159, 0.2);
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #f0f0f0;
}
.btn-save {
  background-color: #1677ff;
}
.btn-save:hover {
  background-color: #4096ff;
}
.btn-save:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}
.btn-cancel {
  background-color: #fff;
  color: #555;
  border: 1px solid #d9d9d9;
}
.btn-cancel:hover {
  background-color: #f5f5f5;
}
</style>
