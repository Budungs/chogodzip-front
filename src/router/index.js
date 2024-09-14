import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

import houseRoutes from './house';
import subscriptionRoutes from './subscription';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
      ...houseRoutes,
      ...subscriptionRoutes,
    ],
  });

export default router;