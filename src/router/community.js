export default [
    {
        path: "/community",
        name: "community",
        component: () => import("@/views/community/CommunityMain.vue"),
    },
    {
        path: "/community/new",
        name: "community/new",
        component: () => import("@/views/community/CommunityWrite.vue"),
    },
    {
        path: "/community/:id",
        name: "community/:id",
        component: () => import("@/views/community/CommunityDetail.vue"),
    },
]