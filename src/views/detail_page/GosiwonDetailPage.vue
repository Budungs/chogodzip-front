<template>
    <div class="container">
        <section class="container" style="margin-top: 10px;">
            <nav aria-label="breadcrumb" style="margin-bottom:1rem;">
                <ol class="breadcrumb" style="margin:0px;">
                    <li class="breadcrumb-item active">{{ houseTypeLabel }}</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-7">
                    <a class="gallery-item rounded" :href="house.room.thumbnail">
                        <img :src="house.room.thumbnail" alt="타이틀 이미지" class="img-fluid rounded"
                            style="height: 30rem; object-fit: cover;">
                    </a>
                </div>
                <DetailCard :cardData="house" :nearestSubway="nearestSubway" :walkTime="walkTime" :nameStatus="nameStatus"/>
            </div>
        </section>
    </div>
    <div class="gray-container">
        <div class="container">
            <DetailInfo :cardData="house" />
            <GosiwonTable :cardData="house"/>
            <DetailMap :cardData="house" :nearestSubway="nearestSubway" :walkTime="walkTime" :nearestUniversity="nearestUniversity"/>
        </div>
    </div>
    <ReviewTab :reviews="reviews" :summaryReviews="reviewSummary" :userId="id" :cardData="house"/>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from 'vue';
import axios from 'axios'; // axios로 서버 API 호출
// import fetchReviews from '@/utils/review'; // fetchReviews 함수를 가져옵니다.
// import fetchSummaryReviews from '@/utils/review'; // review.js에서 요약 리뷰 함수 가져오기
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import DetailCard from '@/modules/components/detail/DetailCard.vue';
import DetailInfo from "@/modules/components/detail/DetailInfo.vue";
import DetailMap from "@/modules/components/detail/DetailMap.vue";
import ReviewTab from "@/modules/components/detail/ReviewTab.vue";
import GosiwonTable from "@/modules/components/detail/table/GosiwonTable.vue";
import api from '@/api/detailRoom';

// 기존 reactive state 설정
const route = useRoute();
const nameStatus = reactive({
    maxPrice : '',
    avgPrice : '',
    minPrice : ''
});

const house = reactive({
    room: {
        roomId: '',
        userId: '',
        roomLat: '',
        roomLong: '',
        thumbnail: '',
        address:'',
        canLoan: '',
        createdAt: '',
        updatedAt: ''
    },
    category: null,
    gswId: '',
    title: '',
    postcode: '',
    detailAddress: '',
    priceMin: '',
    priceMax: '',
    depositMin: '',
    depositMax: '',
    maintenanceFee: '',
    privateFacilities: '',
    services: '',
    languages: '',
    etc: '',
    desc: '',
    pics: '',
    genderLimit: '',
    type: '',
    contractMin: '',
    ageMax: '',
    ageMin: '',
    facilityHeating: '',
    facilityCooling: '',
    facilityLife: '',
    facilitySecurity: '',
    buildingType: '',
    canParking: '',
    hasElevator: '',
    isSoldOut: ''
});

//const reviews = ref([]);
// 새로운 요약 리뷰 상태
//const { reviewSummary, getGPTResponse } = fetchSummaryReviews();

// Computed property for house type
const houseTypeLabel = computed(() => {
    return house.type === 0 ? '고시원' : '원룸텔';
});

// Reactive state for subway data
const nearestSubway = ref({ name: '', distance: Infinity });
const walkTime = ref(0);
const nearestUniversity = ref({ name: '', distance: Infinity });

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

function findNearbyUniversity(latitude, longitude) {
    const ps = new kakao.maps.services.Places();
    
    // 대학교 키워드 검색
    ps.keywordSearch('대학교', function (data, status) {
        if (status === kakao.maps.services.Status.OK) {
            data.forEach(university => {
                const distance = calculateDistance(latitude, longitude, university.y, university.x);
                
                // 가장 가까운 대학교 업데이트
                if (distance < nearestUniversity.value.distance) {
                    nearestUniversity.value = { name: university.place_name, distance: distance };
                    
                }
            });
        } else {
            console.error('대학교 검색 실패:', status);
        }
    }, { location: new kakao.maps.LatLng(latitude, longitude), radius: 2000 });
}

// Fetch data and calculate subway info on mount
onMounted(async () => {
    try {
        const roomIds = route.params.id;
        
        // 첫 번째 API 호출
        const data = await api.getOneGosiwon(roomIds); 
        Object.assign(house, data); 
        console.log('room loca : ', data.room.address);
        
        
        // 구 이름 추출
        const addressParts = data.room.address.split(' ');
        const guIndex = addressParts.findIndex(part => part.includes('구'));
        const districtName = guIndex !== -1 ? addressParts[guIndex] : '';
        
        console.log('구 이름: ', districtName);
        
        // 두 번째 API 호출 (GosiwonStatus)
        if (districtName) {
            const data2 = await api.getGosiwonStatus(districtName);
            Object.assign(nameStatus, data2);
            console.log('Status 데이터: ', nameStatus.maxPrice);
        } else {
            console.log('유효한 구 이름을 찾을 수 없습니다.');
        }

        // 지하철역 및 대학 계산
        findNearbySubway(house.room.roomLat, house.room.roomLong);
        findNearbyUniversity(house.room.roomLat, house.room.roomLong);
        
        // 리뷰 데이터 가져오기
        reviews.value = await api.getAllReview(roomIds);
        console.log('리뷰 데이터: ', reviews.value);

        // GPT를 사용한 요약 리뷰 가져오기
        // await getGPTResponse();

    } catch (error) {
        console.log('Gosiwon 데이터를 가져오는 데 실패했습니다:', error);
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

// 리뷰 데이터를 저장할 상태 변수
const reviews = ref([]);

//로그인 정보를 불러오는 중..
const auth = useAuthStore();

let islogin = computed(() => auth.isLogin); // islogin 을 직접 바꿀 수는 없음. (computed 속성) - 값을 바꾸려면 auth.isLogin 값을 바꿔야 함.
console.log('islogin : ' + islogin.value);
const id = computed(() => auth.id); // id 을 직접 바꿀 수는 없음. (computed 속성)  - 값을 바꾸려면 auth.id 값을 바꿔야 함.
console.log('id : ' + id.value);
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
