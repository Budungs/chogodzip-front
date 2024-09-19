import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

import houseRoutes from './house';
import lottoRoutes from './lotto';
import registRoom from './registroom';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
      ...houseRoutes,
      ...lottoRoutes,
      ...registRoom,
    ],
  });

export default router;