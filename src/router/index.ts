import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

function lazyView(viewName: string): () => Promise<any> {
  return () => import(`@/views/${viewName}.vue`);
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: lazyView('main')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
