<template>
    <div class="white-box mt-4 p-5">
        <h4 class="mb-3">위치</h4>
        <div class="fs-6 mb-3" style="color:black;">{{ cardData.roomAddrFl }}</div>
        <div class="mb-3">
            <img :src="subway_3" width="20" height="20" />
            <span style="margin-left:16px;">
                홍제역
            </span>
        </div>

        <div class="mb-3">
            <i class="fas fa-school" />
            <span style="margin-left:1rem;">숭실대학교</span>
        </div>

        <div class="position-relative mt-4">
            <DetailMap class="rounded-3" :latitude="cardData.roomLat" :longitude="cardData.roomLong" />
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
    }
});

</script>