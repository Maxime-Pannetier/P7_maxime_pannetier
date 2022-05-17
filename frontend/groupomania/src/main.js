import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token!=null)
    {
        config.headers["authorization"]=token;
    }
    return config;
});



createApp(App).use(router).mount('#app')
