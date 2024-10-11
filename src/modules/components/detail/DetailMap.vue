<template>
    <div class="white-box mt-4 p-5">
        <h4 class="mb-3">위치</h4>
        <div class="fs-6 mb-3" style="color:black;">{{ cardData.roomAddrFl }}</div>
        <div class="mb-3">
            <img :src="subway_3" width="20" height="20" />
            <span style="margin-left:16px;">
                {{ nearestSubway.name }}, 도보{{ walkTime }}분
            </span>
        </div>

        <div class="mb-3">
            <i class="fas fa-school" />
            <span style="margin-left:1rem;">{{ nearestUniversity.name }}</span>
        </div>

        <div class="position-relative mt-4">
            <DetailMap class="rounded-3" :latitude="cardData.room.roomLat" :longitude="cardData.room.roomLong" />
        </div>
    </div>
</template>

<script setup>
import subway_3 from '@/assets/img/subway_3.png';
import DetailMap from '@/common/components/DetailMap.vue';
import { defineProps } from 'vue';

const props = defineProps({
    cardData: {
        type: Object,
        required: true
    },
    nearestSubway: {
        type: Object,
        required: true
    },
    walkTime: {
        type: Number,
        required: true
    },
    nearestUniversity: {
        type: Object,
        required: true
    },
});

</script>