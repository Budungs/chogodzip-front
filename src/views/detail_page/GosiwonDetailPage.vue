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
                <DetailCard :cardData="house" :nearestSubway="nearestSubway" :walkTime="walkTime" />
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
import { reactive, onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailCard from '@/modules/components/detail/DetailCard.vue';
import DetailInfo from "@/modules/components/detail/DetailInfo.vue";
import DetailMap from "@/modules/components/detail/DetailMap.vue";
import ReviewTab from "@/modules/components/detail/ReviewTab.vue";
import GosiwonTable from "@/modules/components/detail/table/GosiwonTable.vue";
import api from '@/api/detailRoom';

const route = useRoute();

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

// Reactive state for subway data
const nearestSubway = ref({ name: '', distance: Infinity });
const walkTime = ref(0);

// Function to calculate the nearest subway station
function findNearbySubway(latitude, longitude) {
    const ps = new kakao.maps.services.Places();
    
    // 지하철역 키워드 검색
    ps.keywordSearch('지하철역', function (data, status) {
        if (status === kakao.maps.services.Status.OK) {
            data.forEach(subway => {
                const distance = calculateDistance(latitude, longitude, subway.y, subway.x);
                
                // 가장 가까운 역 업데이트
                if (distance < nearestSubway.value.distance) {
                    nearestSubway.value = { name: subway.place_name, distance: distance };
                    walkTime.value = Math.round((distance / 4800) * 60); // 도보 시간 계산
                }
            });
        } else {
            console.error('지하철역 검색 실패:', status);
        }
    }, { location: new kakao.maps.LatLng(latitude, longitude), radius: 1000 });
}

// Fetch data and calculate subway info on mount
onMounted(async () => {
    try {
        const roomIds = route.params.id;
        const data = await api.getOneGosiwon(roomIds); 
        Object.assign(house, data); 
        
        // 지하철역 계산
        findNearbySubway(house.roomLat, house.roomLong);
    } catch (error) {
        console.log('Failed to fetch Gosiwon data:', error);
    }
});

// Distance calculation function
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
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
