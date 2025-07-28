<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
})
const mainImage = ref('')

const changeMainImage = (imageUrl) => {
  mainImage.value = imageUrl
}

watch(
  () => props.images,
  (newImages) => {
    if (newImages && newImages.length > 0) {
      mainImage.value = newImages[0]
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="product-gallery">
    <div class="main-image-container">
      <img v-if="mainImage" :src="mainImage" alt="Main product view" class="main-image" />
    </div>
    <div v-if="images && images.length > 1" class="thumbnail-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="thumbnail-item"
        :class="{ active: image === mainImage }"
        @click="changeMainImage(image)"
      >
        <img :src="image" :alt="`Product thumbnail ${index + 1}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-gallery {
  width: 100%;
}

.main-image-container {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  /* aspect-ratio: 1 / 1; */
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.thumbnail-item {
  width: 80px;
  height: 80px;
  border: 2px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-item:hover {
  border-color: #aaa;
}

/* Style cho thumbnail đang được chọn */
.thumbnail-item.active {
  border-color: #333;
}
</style>
