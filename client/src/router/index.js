import { createRouter, createWebHistory } from 'vue-router'
import ProductCollectionView from '../views/ProductCollectionView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import AdminView from '@/views/Admin/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductCollectionView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/product/:id',
      name: 'detail',
      component: ProductDetailView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
  ],
})

export default router
