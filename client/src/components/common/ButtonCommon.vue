<script setup></script>
<template>
  <button class="base-button">
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
}
.base-button:hover {
  background-color: #555;
}
.text {
  line-height: 1;
}
</style>
