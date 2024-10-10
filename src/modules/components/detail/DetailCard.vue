<template>
    <aside class="col-md-5" style="display: flex; flex-direction: column;">
        <div style="margin-left: 1rem; flex-grow: 1;">
            <p class="fs-lg">매물 이름 : {{ cardData.roomName }}</p>
            <h4>월세 {{ cardData.depositMin }}-{{ cardData.depositMax }} / 보증금 {{ cardData.priceMin }}-{{ cardData.priceMax }} 만원</h4>
            <div>관리비 12만원</div>
            <hr class="mt-3 mb-3" style="height:2px; border-color:#0C0C0C;">
            <div class="fs-6" style="color:black;">{{ cardData.location }}</div>
            <div class="fs-6 mb-3" style="color:black;">{{ cardData.type }}</div>
            <div class="mb-3">
                <img :src="subway_3" width="25" height="25" />
                <span class="main1" style="margin-left:7px; font-weight:bolder; color:#7747B5;">
                    {{ nearestSubway.name }} 
                </span>
                <span v-if="walkTime" style="margin-left:1rem;">도보 {{ walkTime }}분 </span>
            </div>
            <div class="d-flex justify-content-end">
                <button class="s-btn"><i class="s-icon far fa-heart" style="margin-right:0.5rem;" /><span>116</span></button>
                <button class="s-btn"><i class="s-icon fas fa-map-marker-alt" /></button>
                <button class="s-btn"><i class="s-icon far fa-comments" /></button>
                <button class="s-btn"><i class="s-icon far fa-edit" /></button>
            </div>
        </div>
        <div class="market-price d-flex flex-column align-items-center">
            <h6 class="main1 mt-3" style="margin-left: 7px; font-weight: bolder; color: #D85F5F;">
                {{ cardData.roomAddr }}
            </h6>
            <div class="row" style="width: 25rem;">
                <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                    <div style="font-weight: bold; color:black;">평균</div>
                    <div><span style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원</div>
                </div>
                <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                    <div style="font-weight: bold; color:black;">평균</div>
                    <div><span style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원</div>
                </div>
                <div class="col text-center">
                    <div style="font-weight: bold; color:black;">평균</div>
                    <div><span style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원</div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import subway_3 from '@/assets/img/subway_3.png';

// Props
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
    }
});
</script>

<style scoped>
.s-btn {
    background: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-left: 0.5rem;
    padding: 5px 10px;
}

.s-icon {
    font-size: 20px;
}

.market-price {
    margin-top: 1rem;
    border-radius: 20px;
    background: #F1F1F1;
    height: 8.5rem;
}
</style>
