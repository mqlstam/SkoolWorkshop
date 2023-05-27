import { createRouter, createWebHistory } from 'vue-router'

const Products = () => import('../views/Products.vue')
const Workshops = () => import('../views/Workshops.vue')
const WorkshopForm = () => import('../views/WorkshopForm.vue')

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
        path: '/workshops/create',
        name: 'workshop-create',
        component: WorkshopForm
        // TODO Add any necessary route guards to restrict access to admins
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
