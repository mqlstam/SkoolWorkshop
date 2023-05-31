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
        component: () => import('../views/WorkshopDetails.vue'),
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
