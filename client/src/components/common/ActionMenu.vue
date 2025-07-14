<script setup>
import ButtonCommon from './ButtonCommon.vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['edit', 'delete'])
</script>
<template>
  <div class="action-menu">
    <ButtonCommon :icon="true" class="btn-action btn-edit" @click="emit('edit')">
      <template #icon><EditOutlined /></template>
      Edit
    </ButtonCommon>
    <ButtonCommon :icon="true" class="btn-action btn-delete" @click="emit('delete')">
      <template #icon><DeleteOutlined /></template>
      Delete
    </ButtonCommon>
  </div>
</template>
<style scoped>
.action-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-menu .btn-action {
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem 0.8rem !important;
  color: #333;
  background: none !important;
  transition: all 0.2s ease;
}

.action-menu .btn-action:hover {
  background-color: #f5f5f5 !important;
}

.action-menu .btn-delete {
  color: #ff4d4f;
}
.action-menu .btn-edit {
  color: #1890ff;
}
</style>
