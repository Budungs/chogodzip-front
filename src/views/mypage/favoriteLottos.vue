<template>
    <div class="mypage-container">
        <h1 class="mt-5 mb-5" style="font-weight: 900;">MY PAGE</h1>
        <div class="tabs">
            <MyPageTab v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label"
                :isActive="isActiveTab(tab.name)" @tab-click="setActiveTab" />
        </div>
        <div class="con-total">
            <div class="txt-list-count-page">
                전체 <span id="num-total-count">1020</span>건 <span id="num-now-page">1</span>/<span
                    id="num-total-pages">N</span>페이지
            </div>

            <div class="d-flex align-items-center" style="width:150px">
                <label class="d-inline-block me-2 pe-1 text-muted text-nowrap" for="sort"><i
                        class="fas fa-sort-amount-down mt-n1 me-1 align-middle opacity-80"></i></label>
                <select class="form-select" id="sort">
                    <option>10건</option>
                    <option>20건</option>
                    <option>30건</option>
                </select>
            </div>
        </div>

        <LottoList />

        <div class="con-paging">
            <Pagination :currentPage="currentPage" :totalPages="totalPages" @update:page="handlePageChange" />
        </div>
    </div>

</template>

<script>
import MyPageTab from '@/modules/components/mypage/MyPageTab.vue';
import LottoList from '@/modules/components/lotto/LottoList.vue';
import Pagination from '@/common/components/Pagination.vue';
import { ref } from 'vue';

const totalPages = 10;
const currentPage = ref(1); // 현재 페이지

// 페이지 변경 처리
const handlePageChange = (page) => {
    currentPage.value = page;
};
export default {
    name: "favoriteLottos",
    components: {
        MyPageTab,
        LottoList,
        Pagination
    },
    data() {
        return {
            activeTab: 'favoriteLottos',
            totalCount: 1020,
            currentPage: 1,
            totalPages: 10,
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
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        handleSortChange(event) {
            const selectedValue = event.target.value;
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

.con-total {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: end;
    margin-bottom: 5px;
}

.txt-list-count-page {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: end;
    gap: 4px;
}

#num-total-count,
#num-now-page {
    font-weight: bold;
    color: var(--main1);
}


.con-paging {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: end;
}
</style>
