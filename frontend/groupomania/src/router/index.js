import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [ // routes qui se chargent dans app.vue
  {
    path: '/',
    name: 'home',
    component: HomeView    // tout le temps chargé, cette version
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },// version lazy loading
  {
    path: '/connexion',
    name: 'connexion',
    
    component: () => import('../views/ConnexionView.vue') // appelle le composant dans le fichier views
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
