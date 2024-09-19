<template>
  <div class="container">
    <hr />
    <div class="tab-navigation d-flex">
      <a
        
        class="tab-item"
        :class="{ active: activeTab === 'shareHouse' }"
        @click.prevent="setTab('shareHouse')"
      >쉐어하우스</a>
      <a
        href="#"
        class="tab-item"
        :class="{ active: activeTab === 'sharedHouse' }"
        @click.prevent="setTab('sharedHouse')"
      >공유주택</a>
    </div>

    <hr />

    <div class="filter-btn-group d-flex">
      <button class="filter-btn" @click="openModal('gender')">성별</button>
      <button class="filter-btn" @click="openModal('rooms')">방 개수</button>
      <button class="filter-btn" @click="openModal('price')">가격</button>
    </div>

    <hr />

    <!-- 모달 컴포넌트 -->
    <FilterModal
      v-if="showModal"
      :filterType="currentFilterType"
      :filters="filters"
      @update-filters="updateFilters"
      @close="closeModal"
    />

    <!-- 매물 목록 및 지도 -->
    <div class="map-list-container">
      <div class="property-list">
        <p>매물 목록</p>
        <div v-for="(property, index) in filteredProperties" :key="index" class="card">
          <img src="https://via.placeholder.com/150" class="card-img-top" alt="Property Image">
          <div class="card-body">
            <h5 class="card-title">{{ property.name }}</h5>
            <p class="card-text fs-sm">{{ property.price }}만원</p>
            <a href="#" class="btn btn-sm btn-primary">상세보기</a>
          </div>
        </div>
      </div>

      <!-- Kakao 지도 -->
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script setup>
import FilterModal from './PriceFilterModal.vue'; // 필터 모달 컴포넌트
import { ref, reactive, computed, onMounted } from 'vue';



// 탭 상태 관리
const activeTab = ref('shareHouse');

// 쉐어하우스와 공유주택 매물 목록
const shareHouseProperties = ref([
  { name: '서울대입구 쉐어하우스', price: 500 },
  { name: '관악구 쉐어하우스', price: 600 },
  { name: '낙성대 쉐어하우스', price: 550 },
]);

const sharedHouseProperties = ref([
  { name: '강남 공유주택', price: 1000 },
  { name: '서초 공유주택', price: 950 },
]);

// 모달 상태 및 필터 관리
const showModal = ref(false);
const currentFilterType = ref(null);
const filters = reactive({
  gender: ['unisex', 'male', 'female'],
  rooms: ['oneRoom','twoRoom','threeRoom'],
  price: {
    deposit: 10000,
    rent: 60,
  },
});

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

// 모달 열기
const openModal = (filterType) => {
  currentFilterType.value = filterType;
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
  currentFilterType.value = null;
};

// 필터 업데이트
const updateFilters = (updatedFilters) => {
  filters.gender = updatedFilters.gender ?? filters.gender;
  filters.rooms = updatedFilters.rooms ?? filters.rooms;
  filters.price.deposit = updatedFilters.price?.deposit ?? filters.price.deposit;
  filters.price.rent = updatedFilters.price?.rent ?? filters.price.rent;
  showModal.value = false;
};

// 필터 적용된 매물 목록 계산
const filteredProperties = computed(() => {
  const properties =
    activeTab.value === 'shareHouse' ? shareHouseProperties.value : sharedHouseProperties.value;

  return properties.filter((property) => {
    const matchesPrice = property.price >= filters.price.rent;
    return matchesPrice;
  });
});

// 필터 초기화
const resetFilters = () => {
  filters.gender = [];
  filters.rooms = [];
  filters.price.deposit = 10000;
  filters.price.rent = 60;
};

// Kakao 지도 설정 및 마커 데이터 관리
const map = ref(null);
const markers = ref([]);

onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
    level: 5, // 맵 줌 레벨
  };

  map.value = new kakao.maps.Map(container, options);

  const clusterer = new kakao.maps.MarkerClusterer({
    map: map.value,
    averageCenter: true,
    minLevel: 7,
  });

  const markerData = [
    { lat: 37.5665, lng: 126.9780, title: 'Marker 1' },
    { lat: 37.5655, lng: 126.9760, title: 'Marker 2' },
    { lat: 37.5645, lng: 126.9750, title: 'Marker 3' },
  ];

  markers.value = markerData.map(({ lat, lng, title }) => {
    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({ position: markerPosition, title });
    return marker;
  });

  clusterer.addMarkers(markers.value);
});
</script>

<style scoped>
/* 탭 네비게이션 */
.tab-navigation {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 22px;
  margin-left: 26px;
}

.tab-item {
  margin-right: 15px;
  color: gray;
  text-decoration: none;
  position: relative;
}

.tab-item.active {
  color: #6b2e9b;
}

/* 필터 버튼 그룹 */
.filter-btn-group {
  margin-top: 15px;
  margin-left: 20px;
}

.filter-btn {
  background-color: var(--main1);
  border: none;
  color: white;
  border-radius: 20px;
  padding: 10px 15px;
  margin-right: 10px;
  font-size: 16px;
}

/* 지도와 매물 목록을 나란히 배치하는 컨테이너 */
.map-list-container {
  display: flex;
  flex-direction: row;
  height: 1200px; /* 페이지가 길어지도록 설정 */
}

/* 매물 목록 스타일 */
.property-list {
  width: 25%; /* 매물 목록을 25% 너비로 설정 */
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;
  height: 80%; /* 높이를 100%로 설정 */
  scrollbar-width: thin;
  scrollbar-color: #6b2e9b #f9f9f9;
}

/* 카드 스타일 */
.card {
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.card-img-top {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
}

.btn-primary {
  background-color: var(--main1);
  border: none;
}

.btn-primary:hover {
  background-color: #5a2384;
}

/* 지도 스타일 */
.map {
  width: 75%;
  height: 80%; /* 지도의 높이를 100%로 설정 */
  border-radius: 8px;
}

/* 스크롤바 스타일 커스터마이징 (Chrome, Edge, Safari) */
.property-list::-webkit-scrollbar {
  width: 8px;
}

.property-list::-webkit-scrollbar-thumb {
  background-color: var(--main1);
  border-radius: 10px;
}

.property-list::-webkit-scrollbar-track {
  background-color: #f9f9f9;
}
</style>
