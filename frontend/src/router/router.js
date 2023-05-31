import { createRouter, createWebHistory } from 'vue-router'

const Products = () => import('../views/Products.vue')
const Workshops = () => import('../views/Workshops.vue')
const CreateProduct = () => import('../views/CreateProduct.vue')
const UpdateProduct = () => import('../views/UpdateProduct.vue')

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
        path: '/products/create',
        name: 'createProduct',
        component: CreateProduct
    },
    {
        path: '/product/:id',
        name: 'updateProduct',
        component: UpdateProduct
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})

