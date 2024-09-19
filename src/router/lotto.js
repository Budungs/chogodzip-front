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
    path: '/lottos/news',
    name: 'lottos/news',
    component: () => import('../views/lotto/LottoNews.vue'),
  },
];