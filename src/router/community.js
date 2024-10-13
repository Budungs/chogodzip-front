export default [
    {
        path: "/community",
        name: "community",
        component: () => import("@/views/community/CommunityMain.vue"),
    },
    {
        path: "/community/new",
        name: "community/new",
        component: () => import("@/views/community/CommunityForm.vue"),
    },
    {
        path: "/community/:id/modify",
        name: "community/modify",
        component: () => import("@/views/community/CommunityForm.vue"),
    },
    {
        path: "/community/:id",
        name: "community/:id",
        component: () => import("@/views/community/CommunityDetail.vue"),
    },
    {
        path: "/community/articles",
        name: "community/articles",
        component: () => import("@/views/community/ArticleForm.vue"),
    },
    {
        path: "/community/articles/:id",
        name: "community/articles/:id",
        component: () => import("@/views/community/ArticleDetail.vue"),
    },
]