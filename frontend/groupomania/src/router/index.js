import { createRouter, createWebHashHistory } from 'vue-router'
import MurView from '../views/MurView.vue'

const routes = [ // routes qui se chargent dans app.vue
  {
    path: '/',
    name: 'mur',
    component: MurView    // tout le temps chargé, cette version
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/PageConnexionView.vue')
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
