<template>
    <div class="container">
        <LottoTab />
        <div class="btn-bx">
            <button type="button" class="btn btn-primary"
            style="width:150px; font-size:1.3rem; background-color: var(--main1); border: none">전체</button>
            <button type="button" class="btn btn-secondary" style="width:150px; font-size:1.3rem">관심</button>
        </div>
        <FullCalendar />
    </div>
</template>

<script setup>
import LottoTab from '@/modules/components/lotto/LottoTab.vue';
import FullCalendar from '@/modules/components/lotto/FullCalendar.vue';
</script>

<style scoped>
.btn-bx {
    width:25%;
    margin:2% 0 3% 0;
    display:flex; 
    justify-content: space-between; 
}
</style>
