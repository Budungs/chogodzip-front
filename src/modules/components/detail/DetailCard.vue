<template>
    <aside class="col-md-5" style="display: flex; flex-direction: column;">
        <div style="margin-left: 1rem; flex-grow: 1;">
            <p class="fs-lg">매물 이름 : {{ cardData.title }}</p>
            <h4>보증금 {{ cardData.depositMin }}-{{ cardData.depositMax }} / 월세 {{ cardData.priceMin }}-{{ cardData.priceMax }} 만원</h4>
            <div>관리비 {{ cardData.maintenanceFee }} 만원</div>
            <hr class="mt-3 mb-3" style="height:2px; border-color:#0C0C0C;">
             <div class="fs-6" style="color:black;">{{ cardData.location }}</div>
            <!--<div class="fs-6 mb-3" style="color:black;">{{ cardData.type }}</div> -->
            <div class="mb-3">
                <img :src="subway_3" width="25" height="25" />
                <span class="main1" style="margin-left:7px; font-weight:bolder; color:#7747B5;">
                    {{ nearestSubway.name }} 
                </span>
                <span v-if="walkTime" style="margin-left:1rem;">도보 {{ walkTime }}분 </span>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <!-- 좋아요 버튼 -->
            <button class="s-btn" @click="toggleFavorite">
                <i :class="['s-icon', isFavorited ? 'fas fa-heart' : 'far fa-heart']" style="margin-right:0.5rem;" />
                <span>{{ favoriteCount }}</span>
            </button>
            <!-- 다른 버튼들 -->
            <button class="s-btn" @click="goToChat"><i class="s-icon far fa-comments" /></button>
            <!-- <button class="s-btn"><i class="s-icon far fa-edit" /></button> -->
            <button class="s-btn" @click="goToPayment"><i class="s-icon fas fa-wallet" /> 결제하기</button>
        </div>
        <div class="market-price d-flex flex-column align-items-center">
            <h6 class="main1 mt-3" style="margin-left: 7px; font-weight: bolder; color: #D85F5F;">
                서울시 {{ districtName }}
            </h6>
            <div class="row" style="width: 25rem;">
                <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                    <div style="font-weight: bold; color:black;">최대</div>
                    <div><span style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">{{nameStatus.maxPrice}}</span>만원</div>
                </div>
                <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                    <div style="font-weight: bold; color:black;">평균</div>
                    <div><span style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">{{ nameStatus.avgPrice ? nameStatus.avgPrice.toFixed(1) : '0.0' }}</span>만원</div>
                </div>
                <div class="col text-center">
                    <div style="font-weight: bold; color:black;">최소</div>
                    <div><span style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">{{nameStatus.minPrice}}</span>만원</div>
                </div>
            </div>
        </div>
    </aside>
</template>


<script setup>
import { defineProps, computed } from 'vue';
import subway_3 from '@/assets/img/subway_3.png';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    },
    nameStatus: {
        type: Object,
        required: true
    },
    favoriteCount: Number,
    isFavorited: Boolean
});

const emit = defineEmits(['toggleFavorite']); // 이벤트 정의

const toggleFavorite = () => {
    emit('toggleFavorite'); // 부모 컴포넌트로 이벤트 전달
};


// Computed property to extract '구' name from the address
const districtName = computed(() => {
    const addressParts = props.cardData.room.address.split(' ');
    const guIndex = addressParts.findIndex(part => part.includes('구'));
    return guIndex !== -1 ? addressParts[guIndex] : '';
});

// 채팅 페이지로 이동
const goToChat = () => {
    router.push({
        path: '/chat',
        query: {
            roomId : props.cardData.room.roomId,
            userId :props.cardData.room.userId
         }  // roomId를 쿼리 파라미터로 전달

    });
};
const goToPayment = () => {
    router.push({
        path: '/payment',
        query: {
            roomId: props.cardData.room.roomId,
            deposit: props.cardData.depositMin,
            price: props.cardData.priceMin
        }  // roomId와 가격 정보를 쿼리 파라미터로 전달
    });
};
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
