import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

import houseRoutes from './house';
import lottoRoutes from './lotto';
import registRoom from './registroom';
import addinfo from '../views/login_regist/AddInfo.vue';
import kakaoLogin from '../views/login_regist/KakaoLogin.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home }, // 처음 들어올 때는 Home을 띄운다.
    { path: '/AddInfo', name:'addInfo', component: addinfo}, // AddInfo 페이지로 이동
    { path: '/kakaoLogin', name:'kakaoLogin', component: kakaoLogin}, // AddInfo 페이지로 이동
      ...houseRoutes,
      ...lottoRoutes,
      ...registRoom,
    ],
  });

export default router;