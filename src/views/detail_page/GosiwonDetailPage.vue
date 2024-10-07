<template>
    <div class="container">
        <section class="container" style="margin-top: 40px;">
            <nav aria-label="breadcrumb" style="margin-bottom:1rem;">
                <ol class="breadcrumb" style="margin:0px;">
                    <li class="breadcrumb-item active">{{ house.houseTypeNms }}</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-7">
                    <a class="gallery-item rounded" :href="house.imgId">
                        <img :src="house.imgId" alt="타이틀 이미지" class="img-fluid rounded"
                            style="height: 30rem; object-fit: cover;">
                    </a>
                </div>
                <DetailCard :cardData="house" />
            </div>
        </section>
    </div>
    <div class="gray-container">
        <div class="container">
            <DetailInfo :cardData="house"/>
            <GosiwonTable :cardData = "house"/>
            <DetailMap :cardData = "house"/>
        </div>
    </div>
    <ReviewTab />
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailCard from '@/modules/components/detail/DetailCard.vue';
import DetailInfo from "@/modules/components/detail/DetailInfo.vue";
import DetailMap from "@/modules/components/detail/DetailMap.vue";
import ReviewTab from "@/modules/components/detail/ReviewTab.vue";
import GosiwonTable from "@/modules/components/detail/table/GosiwonTable.vue";
import api from '@/api/detailRoom';

const route = useRoute();
// Reactive data
const cardData = reactive({
    depositMin: '10',
    depositMax: '20',
    priceMin: '50',
    priceMax: '100',
    location: '홍제동',
    type: '공유주거공간',
    subways: [
        { name: '홍제역', walkTime: '10분' },
    ],
    managementFee: '12만원',
    likes: 116,
    averagePrices: [97, 97, 97],
    detailedLocation: '서울시 광진구 화양동',
});

const house = reactive({
    roomId: '',
    userId: '',
    roomCnt: '',
    roomName: '',
    floor: '',
    houseTypeCd: '',
    houseTypeNms: '',
    genderCd: '',
    tags: '',
    imgId: '',
    roomAddr: '',
    roomAddrFl: '',
    roomLat: '',
    roomLong: '',
    depositMax: '',
    depositMin: '',
    priceMax: '',
    priceMin: '',
    isSoldOut: '',
    createdAt: '',
    updatedAt: ''
});

// Fetch data on mount
onMounted(async () => {
    try {
        const roomIds = route.params.id;
        console.log(route.params.id);
        const data = await api.getOneGosiwon(roomIds); 
        Object.assign(house, data); 
        console.log('Fetched Gosiwon:', house);
    } catch (error) {
        console.log('Failed to fetch Gosiwon data:', error);
    }
});
</script>

<style scoped>
.gray-container {
    background: #EDEDED;
    margin-top: 5rem;
    padding: 3rem;
    padding-top: 7rem;
    padding-bottom: 7rem;
}

.breadcrumb-item+.breadcrumb-item::before {
    content: ">";
}

.white-box {
    background: white;
}
</style>
