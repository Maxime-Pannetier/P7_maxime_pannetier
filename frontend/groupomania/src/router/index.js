import { createRouter, createWebHashHistory } from 'vue-router'
//import MurView from '../views/MurView.vue'
import connexionView from '../views/PageConnexionView.vue'

const routes = [ // routes qui se chargent dans app.vue
{
  path: '/',
  name: 'connexion',
  
  component: connexionView    // tout le temps chargé, cette version
},
  {
    path: '/mur',
    name: 'mur',
    component: () => import('../views/MurView.vue')
    
  },
  
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
