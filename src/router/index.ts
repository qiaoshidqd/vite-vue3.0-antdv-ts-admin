import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("/@/views/Login/index.vue"),
    children:[],
  },
  {
    path: "/",
    name: "Menu",
    component: () => import("/@/components/Menu/index.vue"),
    children:[
      {
        path: 'project',
        name: 'Project',
        component: () => import("/@/views/Project/index.vue"),
        meta: {
          requireAuth: true,
          title: 'menu',
        }
      },
      {
        path: '/project/add',
        component: () => import("/@/views/Project/components/ProjectAdd.vue"),
        meta: {
          requireAuth: true,
          title: 'add',
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import("/@/views/User/index.vue"),
        meta: {
          requireAuth: true,
          title: 'user',
        },
        children: []
      },
      {
        path: 'noPower',
        name: 'NoPower',
        component: () => import("/@/components/NoPower/index.vue"),
        meta: {
          requireAuth: true,
          title: '404',
        }
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    name: '404',
    redirect: "/noPower",
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router