<template>
    <div class="container">
        <LottoTab />
        <div class="con-lotto-list">
            <LottoListTab class="lotto-list-tab" />
            <div class="con-lotto-search-list">
                <LottoListSearch />

                <div style="width:100%; display:flex; flex-direction: row; justify-content: space-between;">
                    <div class="txt-list-count-page" style="width:300px">
                        전체 1020건 1/N페이지
                    </div>
                    
                    <!-- Sorting-->
                    <div class="d-flex align-items-center mb-4">
                    <label class="d-inline-block me-2 pe-1 text-muted text-nowrap" for="sort"><i class="fi-arrows-sort mt-n1 me-1 align-middle opacity-80"></i></label>
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
        </div>
    </div>
</template>

<script setup>
import LottoListSearch from '@/modules/components/lotto/LottoListSearch.vue';
import LottoListTab from '@/modules/components/lotto/LottoListTab.vue';
import LottoTab from '@/modules/components/lotto/LottoTab.vue';
import LottoList from '@/modules/components/lotto/LottoList.vue';
import Pagination from '@/common/components/Pagination.vue';

import { ref } from 'vue';

const totalPages = 10;
const currentPage = ref(1); // 현재 페이지

// 페이지 변경 처리
const handlePageChange = (page) => {
    currentPage.value = page;
};
</script>

<style scoped>
.con-lotto-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap:2%;
    padding: 20px 0;
}

.lotto-list-tab {
    flex: 1.5; 
}

.con-lotto-search-list {
    flex: 9;
    display: flex; flex-direction: column;
}

.con-paging {
    width:100%; height:100px; display:flex; justify-content: center; align-items: end;
}
</style>