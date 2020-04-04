export default [
  {
    path: '/',
    name: 'welcome',
    component: () => import(/* webpackChunkName: "welcome" */ '@/pages/welcome'),
    meta: {
      layout: 'FullScreen',
      requiresVisitor: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login'),
    meta: {
      layout: 'FullScreen',
      requiresVisitor: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/pages/register'),
    meta: {
      layout: 'FullScreen',
      requiresVisitor: true,
    },
  },
  {
    path: '/buy',
    name: 'buy',
    component: () => import(/* webpackChunkName: "buy" */ '@/pages/buy'),
    meta: {
      layout: 'FlexboxApp',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '@/pages/contact'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import(/* webpackChunkName: "landing" */ '@/pages/landing'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/templates',
    name: 'templates',
    component: () => import(/* webpackChunkName: "templates" */ '@/pages/templates'),
    meta: {
      layout: 'Sidebar',
      requiresAuth: true,
    },
  },
  {
    path: '/documents',
    name: 'documents',
    component: () => import(/* webpackChunkName: "documents" */ '@/pages/documents'),
    meta: {
      layout: 'Sidebar',
      requiresAuth: true,
    },
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import(/* webpackChunkName: "reports" */ '@/pages/reports'),
    meta: {
      layout: 'Sidebar',
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "edit-profile" */ '@/pages/profile'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/pages/settings'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/items/:type(top|new|show|ask|job)/:page?',
    component: () => import(/* webpackChunkName: "items" */ '@/pages/items'),
  },
  {
    path: '/',
    redirect: '/top',
  },
  {
    path: '/items/:id(\\d+)',
    component: () => import(/* webpackChunkName: "item" */ '@/pages/item'),

  },
  {
    path: '/user/:id',
    component: () => import(/* webpackChunkName: "user" */ '@/pages/user'),

  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "not-found" */ '@/pages/notfound'),
  },
  {
    path: '*',
    redirect: {
      name: '404',
      params: {
        resource: 'page',
      },
    },
  },
]
