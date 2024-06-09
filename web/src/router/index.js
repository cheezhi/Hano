import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'home',
        meta: {
            title: "之若窝"
        },
        component: () =>
            import ('../Home.vue')
    },
    {
        path: '/archives',
        name: 'archives',
        meta: {
            title: "归档——之若窝"
        },
        component: () =>
            import ('../Archives.vue')
    },
    {
        path: '/friends',
        name: 'friends',
        meta: {
            title: "友人——之若窝"
        },
        component: () =>
            import ('../Links.vue')
    },
    {
        path: '/projects',
        name: 'projects',
        meta: {
            title: "项目——之若窝"
        },
        component: () =>
            import ('../Projects.vue')
    },
    {
        path: '/post/:pid',
        name: 'APost',
        component: () =>
            import ('../Post.vue')
    },
    {
        path: '/:pid',
        name: 'APage',
        component: () =>
            import ('../Page.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router