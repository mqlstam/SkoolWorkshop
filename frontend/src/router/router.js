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
        component: () => import('../views/WorkshopForm.vue')
    },
    {
        path: '/workshops/:id/addproduct',
        name: 'workshop-addproduct',
        meta: { nav: 'workshop' },
        component: () => import('../views/WorkshopAddProduct.vue')
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
    }

]

export default createRouter({
    history: createWebHistory(),
    routes
})
