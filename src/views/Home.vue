<template>
    <div>
        <SearchHouse />
        <div class="container">
            <LikeRegionState :position="position" :isPositionReady="isPositionReady" :siGuPosition="siGuPosition"  />
        </div>
        <LikeRegionLatest :siGuPosition="siGuPosition" />
        <div class="container">
            <LottosInfo />
        </div>
        <TodayLecture />
    </div>
</template>

<script setup>
import LikeRegionLatest from '@/modules/components/home/home03/LikeRegionLatest.vue';
import LikeRegionState from '@/modules/components/home/home02/LikeRegionState.vue';
import LottosInfo from '@/modules/components/home/home04/LottosInfo.vue';
import SearchHouse from '@/modules/components/home/home01/SearchHouse.vue';
import TodayLecture from '@/modules/components/home/home05/TodayLecture.vue';
import { useGeolocation } from '@/api/useLocation';
const { position, isPositionReady, getCurrentLocation, revertToGu, siGuPosition } = useGeolocation();
import { onMounted, watch } from 'vue';

onMounted(() => {
    getCurrentLocation(); // 현재 위치 
});

watch(isPositionReady, (ready) => {
    if (ready) {
        revertToGu(); // 위시 -> 주소 변환
    }
});
</script>

<style scoped> 
</style>