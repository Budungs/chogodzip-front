export default [
    {
      path: "/help/easyDictionary",
      name: "/help/easyDictionary",
      component: () => import("../views/help/EasyWords.vue"),
    },
    {
      path: "/help/easyDictionary/test",
      name: "/help/easyDictionary/test",
      component: () => import("../views/help/test.vue"),
    },
    {
      path: "/help/easyDictionary/test/1",
      name: "/help/easyDictionary/test/1",
      component: () => import("../views/help/dongtest.vue"),
    },
]