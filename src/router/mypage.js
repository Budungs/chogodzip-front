export default [
    {
        path: "/mypage/info",
        name: "mypage/info",
        component: () => import("../views/mypage/info.vue"),
    },

    {
        path: "/mypage/postRooms",
        name: "mypage/postRooms",
        component: () => import("../views/mypage/postRooms.vue"),
    },
    {
        path: "/mypage/favoriteLottos",
        name: "mypage/favoriteLottos",
        component: () => import("../views/mypage/favoriteLottos.vue"),
    },
    {
        path: "/mypage/favoriteRooms",
        name: "mypage/favoriteRooms",
        component: () => import("../views/mypage/favoriteRooms.vue"),
    },
    {
        path: "/mypage/postReviews",
        name: "mypage/postReviews",
        component: () => import("../views/mypage/postReviews.vue"),
    },
];

