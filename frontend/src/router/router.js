import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        alias: '/workshops',
        name: 'workshops',
        component: () => import('../views/Workshops.vue')
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/Products.vue')
    },
    {
        path: '/workshops/:id',
        name: 'workshop-details',
        component: () => import('../views/WorkshopDetails.vue')
    },
    {
        path: '/products/new',
        name: 'product-create',
        component: () => import('../views/ProductCreate.vue')
    },
    {
        path: '/products/:id',
        name: 'product-details',
        component: () => import('../views/ProductDetails.vue')
    },
    {
        path: '/workshops/create',
        name: 'workshop-create',
        component: () => import('../views/WorkshopForm.vue')
        // TODO Add any necessary route guards to restrict access to admins
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
