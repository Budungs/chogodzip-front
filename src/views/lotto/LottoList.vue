<template>
    <div class="container">
        <LottoTab />
        <div class="con-lotto-list">
            <LottoListTab class="lotto-list-tab" />
            <div class="con-lotto-search-list">
                <LottoListSearch />
            </div>
        </div>
    </div>
</template>

<script setup>
import LottoListSearch from '@/modules/components/lotto/LottoListSearch.vue';
import LottoListTab from '@/modules/components/lotto/LottoListTab.vue';
import LottoTab from '@/modules/components/lotto/LottoTab.vue';
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
    display: flex; /* 내부 요소가 필요하면 추가 */
}
</style>