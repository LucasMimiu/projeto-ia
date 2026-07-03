import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import ProdutosView from '../views/ProdutosView.vue'
import RelatoriosView from '../views/RelatoriosView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: ProdutosView
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: RelatoriosView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router