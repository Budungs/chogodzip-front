export default [
  {
    path: '/lottos/calendars',
    name: 'lottos/calendars',
    component: () => import('../views/lotto/LottoCalendar.vue'),
  },
  {
    path: '/lottos/lists',
    name: 'lottos/lists',
    component: () => import('../views/lotto/LottoList.vue'),
  },
  {
    path: '/lottos/lists/:page',
    name: 'LottoList',
    component: () => import('../views/lotto/LottoList.vue'),
    props: true,  // URL의 파라미터를 컴포넌트의 props로 전달
  },
  {
    path: '/lottos/news',
    name: 'lottos/news',
    component: () => import('../views/lotto/LottoNews.vue'),
  },
];