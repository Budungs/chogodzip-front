<template>
    <div class="mypage-container">
        <h1 class="mt-5 mb-5" style="font-weight: 900;">MY PAGE</h1>
        <div class="tabs">
            <MyPageTab v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label"
                :isActive="isActiveTab(tab.name)" @tab-click="setActiveTab" />
        </div>
        <h1>등록매물</h1>
    </div>
</template>

<script>
import MyPageTab from '@/modules/components/mypage/MyPageTab.vue';

export default {
    name: "postRooms",
    components: {
        MyPageTab,
    },
    data() {
        return {
            activeTab: 'postRooms',
            tabs: [
                { name: 'info', label: '내 정보' },
                { name: 'favoriteLottos', label: '관심 청약 목록' },
                { name: 'favoriteRooms', label: '관심 매물 목록' },
                { name: 'postReviews', label: '작성 리뷰 목록' },
                { name: 'postRooms', label: '등록한 매물 목록' }
            ]
        };
    },
    methods: {
        isActiveTab(name) {
            return this.activeTab === name;
        },
        setActiveTab(name) {
            this.activeTab = name;
        }
    }
};
</script>

<style scoped>
* {
    font-family: 'Spoqa Han Sans Neo';
}


.tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.mypage-container {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}
</style>
