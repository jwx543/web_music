import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [
    {
        path: '/Home',
        component: resolve => require(['../pages/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/info',
                component: resolve => require(['../pages/InfoPage.vue'], resolve),
                meta: { title: 'Info' }
            },
            {
                path: '/Singer',
                component: resolve => require(['../pages/SingerPage.vue'], resolve),
                meta: { title: 'Singer' }
            },
            {
                path: '/song',
                component: resolve => require(['../pages/SongPage.vue'], resolve),
                meta: { title: 'Song' }
            },
            {
                path: '/Comment',
                component: resolve => require(['../pages/CommentPage.vue'], resolve),
                meta: { title: 'Comment' }
            },
            {
                path: '/User',
                component: resolve => require(['../pages/UserPage.vue'], resolve),
                meta: { title: 'User' }
            },
            {
                path: '/Save',
                component: resolve => require(['../pages/SavePage.vue'], resolve),
                meta: { title: 'Save' }
            },
            {
                path: '/SongList',
                component: resolve => require(['../pages/SongListPage.vue'], resolve),
                meta: { title: 'SongList' }
            },
            {
                path: '/ListContent',
                component: resolve => require(['../pages/ListContentPage.vue'], resolve),
                meta: { title: 'ListContent' }
            },
        ]
    },
    {
        path: '/',
        component: resolve => require(['../pages/Login.vue'], resolve)
    }
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRoutes
})
