<template>
  <div class="container">
    <hr />
    <div class="tab-navigation d-flex">
      <a
        class="tab-item"
        :class="{ active: activeTab === 'oneRoom' }"
        @click.prevent="setTab('oneRoom')"
      >원룸</a>
      <a
        class="tab-item"
        :class="{ active: activeTab === 'villa' }"
        @click.prevent="setTab('villa')"
      >빌라/투룸</a>
      <a
        class="tab-item"
        :class="{ active: activeTab === 'opistel' }"
        @click.prevent="setTab('opistel')"
      >오피스텔</a>
    </div>

    <hr />

    <!-- 필터링 영역 (제조사별) -->
    <div class="filter-section">
      <h5>대출</h5>
      <div class="checkbox-group">
        <label>
          <input type="checkbox" value="LH" v-model="filters.loan" />
          LH
        </label>
        <label>
          <input type="checkbox" value="버팀목" v-model="filters.loan" />
          버팀목
        </label>
        <label>
          <input type="checkbox" value="중기청80" v-model="filters.loan" />
          중기청80
        </label>
        <label>
          <input type="checkbox" value="중기청100" v-model="filters.loan" />
          중기청100
        </label>
      </div>
    </div>

    <hr />

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
import { ref, reactive, computed, onMounted } from 'vue';

// 탭 상태 관리
const activeTab = ref('oneRoom');

// 매물 데이터 설정 (필요에 따라 추가 가능)
const propertiesData = {
  oneRoom: [
    { name: '서울 용산구 위례성대로 8길 28', price: 500, loan: '원룸' },
    { name: '관악구 원룸', price: 600, loan: '삼성전자' },
    { name: '낙성대 원룸', price: 550, loan: '레노버' },
  ],
  villa: [
    { name: '강남 빌라', price: 1000, loan: 'LG전자' },
    { name: '서초 빌라', price: 950, loan: '삼성전자' },
  ],
  opistel: [
    { name: '서울대 오피스텔', price: 850, loan: '레노버' },
    { name: '강남 오피스텔', price: 1200, loan: '삼성전자' },
  ],
};

// 필터 관리
const filters = reactive({
  loan: [], 
  price: { rent: 0 },
});

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

// 필터 초기화
const resetFilters = () => {
  filters.loan = [];
  filters.price.rent = 0;
};

// 필터 적용된 매물 목록 계산
const filteredProperties = computed(() => {
  const properties = propertiesData[activeTab.value];

  return properties.filter((property) => {
    const matchesPrice = property.price >= filters.price.rent;
    const matchesManufacturer =
      filters.loan.length === 0 || filters.loan.includes(property.loan);
    return matchesPrice && matchesManufacturer;
  });
});

// Kakao 지도 설정 및 마커 데이터 관리
const map = ref(null);
const markers = ref([]);

onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
    level: 5,
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

/* 필터 섹션 */
.filter-section {
  padding: 10px 0;
  margin-left: 20px;
}

.checkbox-group label {
  margin-right: 20px;
}

/* 지도와 매물 목록을 나란히 배치하는 컨테이너 */
.map-list-container {
  display: flex;
  flex-direction: row;
  height: 1200px;
}

/* 매물 목록 스타일 */
.property-list {
  width: 25%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;
  height: 80%;
  scrollbar-width: thin;
  scrollbar-color: #6b2e9b #f9f9f9;
}

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
  height: 80%;
  border-radius: 8px;
}

/* 스크롤바 스타일 커스터마이징 */
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
