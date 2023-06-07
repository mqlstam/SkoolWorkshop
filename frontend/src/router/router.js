import { createRouter, createWebHistory } from 'vue-router'
import authInterceptor from './authInterceptor.js'

const routes = [
    {
        path: '/login',
        name: 'login',
        meta: { public: true },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        alias: '/workshops',
        name: 'workshops',
        meta: { nav: 'workshop' },
        component: () => import('../views/Workshops.vue')
    },
    {
        path: '/workshops/:id',
        name: 'workshop-details',
        meta: { nav: 'workshop' },
        component: () => import('../views/WorkshopDetails.vue')
    },
    {
        path: '/workshops/new',
        name: 'workshop-create',
        role: 'workshop',
        meta: { nav: 'workshop' },
        component: () => import('../views/WorkshopCreate.vue')
    },
    {
        path: '/products',
        name: 'products',
        meta: { nav: 'product' },
        component: () => import('../views/Products.vue')
    },
    {
        path: '/products/new',
        name: 'product-create',
        meta: { nav: 'product' },
        component: () => import('../views/ProductCreate.vue')
    },
    {
        path: '/products/:id',
        name: 'product-details',
        meta: { nav: 'product' },
        component: () => import('../views/ProductDetails.vue')
    },
    {
        path: '/scan',
        name: 'scan',
        meta: { nav: 'scan' },
        component: () => import('../views/Scan.vue')
    },
    {
        name: 'users',
        path: '/users',
        meta: { nav: 'user', role: ['admin'] },
        component: () => import('../views/Users.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authInterceptor)

export default router
