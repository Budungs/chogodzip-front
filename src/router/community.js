export default [
    {
        path: "/community",
<<<<<<< Updated upstream
        name: "community",
=======
        name: "/communityMain",
>>>>>>> Stashed changes
        component: () => import("@/views/community/CommunityMain.vue"),
    },
    {
        path: "/community/new",
<<<<<<< Updated upstream
        name: "community/new",
=======
        name: "/communityWrite",
>>>>>>> Stashed changes
        component: () => import("@/views/community/CommunityWrite.vue"),
    },
    {
        path: "/community/:id",
<<<<<<< Updated upstream
        name: "community/:id",
=======
        name: "/communityDetail",
>>>>>>> Stashed changes
        component: () => import("@/views/community/CommunityDetail.vue"),
    },
]