export default [
  {
    path: "/houses/maps/gosiwons",
    name: "houses/maps/gosiwons",
    component: () => import("../views/House.vue"),
  },
  {
    path: "/houses/maps/onerooms",
    name: "houses/maps/onerooms",
    component: () => import("../views/House.vue"),
  },
  {
    path: '/houses/maps/sharehouses',
    name: 'houses/maps/sharehouses',
    component: () => import('../views/mapPage/Sharehouse.vue'),
  },
  {
    path: "/houses/:id",
    name: "DetailPage",
    component: () => import("../views/DetailPage.vue"),
  },
];
