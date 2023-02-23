import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/item',
    name: 'item',
    component: () => import('../views/Item.vue')
  },
  {
    path: '/kategori',
    name: 'kategori',
    component: () => import('../views/Kategori.vue')
  },  
  {
    path: '/history/stok',
    name: 'history stok',
    component: () => import('../views/HistoryStok.vue')
  },    
  {
    path: '/supplier',
    name: 'supplier',
    component: () => import('../views/Supplier.vue')
  },
  {
    path: '/supplier/detail/:id',
    name: 'supplier detail',
    component: () => import('../views/SupplierDetail.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import('../views/Customer.vue')
  },
  {
    path: '/customer/detail/:id',
    name: 'customer detail',
    component: () => import('../views/CustomerDetail.vue')
  },  
  {
    path: '/penjualan',
    name: 'penjualan',
    component: () => import('../views/Penjualan.vue')
  } ,
  {
    path: '/bon',
    name: 'bon',
    component: () => import('../views/Bon.vue')
  } ,         
  {
    path: '/pembelian',
    name: 'pembelian',
    component: () => import('../views/Pembelian.vue')
  } ,     
  {
    path: '/form/pembelian',
    name: 'form pembelian',
    component: () => import('../views/PembelianForm.vue')
  } ,       
  {
    path: '/pengguna',
    name: 'pengguna',
    component: () => import('../views/Pengguna.vue')
  }          
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
