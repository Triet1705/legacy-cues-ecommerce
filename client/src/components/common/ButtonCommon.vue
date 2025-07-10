<script setup>
defineProps({
  type: Boolean,
  default: false,
})
</script>
<template>
  <button class="base-button">
    <span v-if="icon" class="icon">
      <slot name="icon"></slot>
    </span>
    <span class="text">
      <slot></slot>
    </span>
  </button>
</template>
<style scoped>
.base-button {
  align-items: center;
  justify-content: center;
  display: inline-block;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 1rem 2.5rem;
  /* width: 100%; */
  text-decoration: none;
}
.base-button:hover {
  background-color: #555;
}
.icon {
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
}
.text {
  line-height: 1;
}
</style>
