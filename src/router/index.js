import { createRouter, createWebHistory } from 'vue-router';

// 1) vue 파일 가져오는 import 문 작성
import Home from '@/views/Home.vue';
import houseRoutes from './house';
import lottoRoutes from './lotto';
import registRoom from './registRoom';
import registMember from './registMember';
import addinfo from '../views/login_regist/AddInfo.vue';
import kakaoLogin from '../views/login_regist/KakaoLogin.vue';
import registUser from '../views/login_regist/RegistUser.vue';
import registComplete from '../views/login_regist/RegistComplete.vue';

import CommunityMain from '@/views/community/CommunityMain.vue';

import helpRoutes from './help';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 2) 라우팅 경로 정의
  routes: [
    // 1안 ) 하나씩 라우팅 경로를 지정
    { path: '/', name: 'home', component: Home }, // 처음 들어올 때는 Home을 띄운다.

    { path: '/communitymain', name:'communityMain', component: CommunityMain}, // CommunityMain 페이지로 이동
    // 2안 ) 여러개의 경로를 묶을 수도 있다.
    ...houseRoutes,
      ...lottoRoutes,
      ...registRoom,
      ...registMember,
      ...helpRoutes,

    ],
  });

export default router;