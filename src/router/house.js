export default [
  {
    path: "/houses/maps/gosiwons",
    name: "Gosiwon",
    component: () => import("../views/mapPage/gosiwon.vue"),
  },
  {
    path: '/houses/maps/sharehouses',
    name: 'Sharehouse',
    component: () => import('../views/mapPage/Sharehouse.vue'),
  },
  {
    path: '/houses/maps/room',
    name: 'Jachiroom',
    component: () => import('../views/mapPage/RoomHouse.vue'),
  },
  {
    path: "/houses/rooms/:id",
    name: "RoomDetailPage",
    component: () => import("../views/detail_page/JachiroomDetailPage.vue"),
  },
  {
    path: "/houses/sharehouses/:id",
    name: "DetailPage",
    component: () => import("../views/detail_page/SharehouseDetailPage.vue"),
  },
  {
    path: "/houses/gosiwons/:id",
    name: "GosiwonDetailPage",
    component: () => import("../views/detail_page/GosiwonDetailPage.vue"),
  },
];

