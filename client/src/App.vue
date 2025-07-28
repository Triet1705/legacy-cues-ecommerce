<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'
import { message } from 'ant-design-vue'

const [messageApi, contextHolder] = message.useMessage()
</script>

<template>
  <context-holder />

  <Navbar />

  <main>
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped>
main {
  min-height: 75vh;
  padding: 2rem 0;
  background: #fff;
}
</style>
