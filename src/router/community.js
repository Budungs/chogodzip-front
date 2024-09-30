export default [
    {
        path: "/communitymain",
        name: "/communityMain",
        component: () => import("@/views/community/CommunityMain.vue"),
    },
    {
        path: "/communitywrite",
        name: "/communityWrite",
        component: () => import("@/views/community/CommunityWrite.vue"),
    },
    {
        path: "/communitydetail",
        name: "/communityDetail",
        component: () => import("@/views/community/CommunityDetail.vue"),
    },
]