const routes = [
    {
        path: '/',
        name: 'AppLayout',
        component: () => import('../layouts/AppLayout.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                meta: {requiresAuth: false},
                component: () => import('../views/home.vue')
            },
            {
                path: '/creation',
                name: 'creation',
                meta: {requiresAuth: false},
                component: () => import('../views/creation.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                meta: {requiresAuth: true},
                component: () => import('../views/profile.vue')
            },
            {
                path: '/home/:id',
                name: 'detail',
                meta: {requiresAuth: false},
                component: () => import('../views/detail.vue')
            },
            {
                path: '/creation/:id',
                name: 'creationDetail',
                meta: {requiresAuth: false},
                component: () => import('../views/creationDetail.vue')
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {requiresAuth: false},
        component: () => import('../views/auth/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {requiresAuth: false},
        component: () => import('../views/auth/register.vue')
    }
];

export default routes;