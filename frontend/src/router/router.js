import { createRouter, createWebHistory } from 'vue-router'

const routes = [
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
        path: '/products/new/add-code/:name',
        name: 'add-code',
        meta: { nav: 'add-code' },
        component: () => import('../views/ScanToAdd.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
