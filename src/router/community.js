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
]