import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

import houseRoutes from './house';
import subscriptionRoutes from './subscription';
import registRoom from './registroom';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
      ...houseRoutes,
      ...subscriptionRoutes,
      ...registRoom,
    ],
  });

export default router;