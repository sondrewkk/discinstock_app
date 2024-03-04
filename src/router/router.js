import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'
import Retailers from '@/views/Retailers.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    { 
        path: "/", 
        name: "Forside", 
        component: Home 
    },
    { 
        path: "/retailers", 
        name: "Butikker", 
        component: Retailers 
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})  

export default router
