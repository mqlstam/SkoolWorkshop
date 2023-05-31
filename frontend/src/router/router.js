import { createRouter, createWebHistory } from 'vue-router'

const Products = () => import('../views/Products.vue')
const Workshops = () => import('../views/Workshops.vue')
const WorkshopDetails = () => import('../views/WorkshopDetails.vue')

const routes = [
    {
        path: '/',
        alias: '/workshops',
        name: 'workshops',
        component: Workshops
    },
    {
        path: '/products',
        name: 'products',
        component: Products
    },
    {
        path: '/workshops/:id',
        name: 'workshop-details',
        component: WorkshopDetails
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
