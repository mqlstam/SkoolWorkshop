import {createRouter, createWebHistory} from 'vue-router'

const Products = () => import ('../views/Products.vue')
const Workshops = () => import ('../views/Workshops.vue')

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
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})