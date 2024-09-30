import { createRouter, createWebHistory } from 'vue-router';

// 1) vue 파일 가져오는 import 문 작성
import Home from '@/views/Home.vue';
import houseRoutes from './house';
import lottoRoutes from './lotto';
import registRoom from './registRoom';
import registMember from './registMember';

import helpRoutes from './help';
import community from './community';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 2) 라우팅 경로 정의
  routes: [
    // 1안 ) 하나씩 라우팅 경로를 지정
    { path: '/', name: 'home', component: Home }, // 처음 들어올 때는 Home을 띄운다.

    // 2안 ) 여러개의 경로를 묶을 수도 있다.
    ...houseRoutes,
      ...lottoRoutes,
      ...registRoom,
      ...registMember,
      ...helpRoutes,
      ...community,
    ],
  });

export default router;