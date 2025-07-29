<script setup>
import { ref, watch } from 'vue'
import ButtonCommon from '@/components/common/ButtonCommon.vue'
import { Switch as ASwitch } from 'ant-design-vue'

const props = defineProps({
  userData: { type: Object, default: null },
  isSaving: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'cancel'])

const formState = ref({})

watch(
  () => props.userData,
  (newData) => {
    if (newData) {
      formState.value = { ...newData }
    } else {
      formState.value = { name: '', email: '', password: '', isAdmin: false }
    }
  },
  { immediate: true, deep: true },
)

const handleSubmit = () => {
  emit('submit', formState.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <div class="input-group">
      <label for="name">Name</label>
      <input v-model="formState.name" type="text" id="name" required />
    </div>
    <div class="input-group">
      <label for="email">Email</label>
      <input v-model="formState.email" type="email" id="email" required />
    </div>
    <div class="input-group" v-if="!formState._id">
      <label for="password">Password</label>
      <input v-model="formState.password" type="password" id="password" required />
    </div>
    <div class="input-group-switch">
      <label for="isAdmin">Is Admin</label>
      <a-switch v-model:checked="formState.isAdmin" id="isAdmin" />
    </div>

    <div class="form-actions">
      <ButtonCommon type="button" class="btn-cancel" @click="emit('cancel')">Cancel</ButtonCommon>
      <ButtonCommon type="submit" class="btn-save" :disabled="isSaving">
        {{ isSaving ? 'Saving...' : 'Save User' }}
      </ButtonCommon>
    </div>
  </form>
</template>

<style scoped>
.user-form {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.input-group,
.input-group-switch {
  display: flex;
  flex-direction: column;
}
.input-group-switch {
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
.input-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.input-group input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 1rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 1rem;
  border-top: 1px solid #f0f0f0;
}
.btn-save {
  background-color: #1677ff;
}
.btn-cancel {
  background-color: #fff;
  color: #555;
  border: 1px solid #d9d9d9;
}
</style>
