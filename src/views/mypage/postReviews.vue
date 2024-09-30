<template>
    <div class="mypage-container">
        <h1 class="mt-5 mb-5" style="font-weight: 900;">MY PAGE</h1>
        <div class="tabs">
            <MyPageTab v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label"
                :isActive="isActiveTab(tab.name)" @tab-click="setActiveTab" />
        </div>
        <div class="card-list">
            <div class="card" v-for="(review, index) in reviews" :key="index">
                <div class="card-header">
                    <img :src="review.profileImage" alt="Profile" class="profile-image" />
                    <div class="header-content">
                        <h3>{{ review.title }}</h3>
                        <span class="date">{{ review.date }}</span>
                    </div>
                    <i class="fas fa-trash-alt delete-icon" @click="deleteReview(index)"></i>
                    <button class="delete-button" @click="deleteReview(index)">삭제</button>
                </div>
                <div class="card-content">
                    <p>{{ review.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyPageTab from '@/modules/components/mypage/MyPageTab.vue';

export default {
    name: "postReviews",
    components: {
        MyPageTab,
    },
    data() {
        return {
            activeTab: 'postReviews',
            tabs: [
                { name: 'info', label: '내 정보' },
                { name: 'favoriteLottos', label: '관심 청약 목록' },
                { name: 'favoriteRooms', label: '관심 매물 목록' },
                { name: 'postReviews', label: '작성 리뷰 목록' },
                { name: 'postRooms', label: '등록한 매물 목록' }
            ],
            reviews: [
                {
                    title: "삼성중앙하이츠빌리지",
                    content: "작성한 리뷰 내용을 여기 표시",
                    date: "2024.08.28",
                    profileImage: "https://via.placeholder.com/40" // 프로필 이미지 URL
                },
                {
                    title: "삼성중앙하이츠빌리지",
                    content: "작성한 리뷰 내용을 여기 표시",
                    date: "2024.08.28",
                    profileImage: "https://via.placeholder.com/40"
                },
                {
                    title: "삼성중앙하이츠빌리지",
                    content: "작성한 리뷰 내용을 여기 표시",
                    date: "2024.08.28",
                    profileImage: "https://via.placeholder.com/40"
                },
                {
                    title: "삼성중앙하이츠빌리지",
                    content: "작성한 리뷰 내용을 여기 표시",
                    date: "2024.08.28",
                    profileImage: "https://via.placeholder.com/40"
                },
                {
                    title: "삼성중앙하이츠빌리지",
                    content: "작성한 리뷰 내용을 여기 표시",
                    date: "2024.08.28",
                    profileImage: "https://via.placeholder.com/40"
                },
                {
                    title: "삼성중앙하이츠빌리지",
                    content: "작성한 리뷰 내용을 여기 표시",
                    date: "2024.08.28",
                    profileImage: "https://via.placeholder.com/40"
                }
            ]
        };
    },
    methods: {
        isActiveTab(name) {
            return this.activeTab === name;
        },
        setActiveTab(name) {
            this.activeTab = name;
        },
        deleteReview(index) {
            this.reviews.splice(index, 1);
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

.page-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
}

.card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    /* 카드 간격 */
}

.card {
    display: flex;
    flex-direction: column;
    /* 카드 내부 요소를 세로로 정렬 */
    width: 300px;
    /* 카드 너비 */
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.card-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.date {
    font-size: 0.9rem;
    color: gray;
}

.delete-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #ff1a1a;
}
</style>
