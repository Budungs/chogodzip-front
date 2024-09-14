import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/css/main.css'
import '@/assets/css/fonts.css' // font
import '@/assets/css/colors.css' // color

import router from './router' // router
import 'bootstrap/dist/css/bootstrap.css' // bootstrap

createApp(App).use(createPinia()).use(router).mount('#app');