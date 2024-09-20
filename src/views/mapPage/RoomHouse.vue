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
    
    <div class="accordion" id="exampleAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFilter">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#filterCollapse" aria-expanded="true" aria-controls="filterCollapse">
            필터링 옵션
          </button>
        </h2>
        <div id="filterCollapse" class="accordion-collapse collapse show" aria-labelledby="headingFilter" data-bs-parent="#exampleAccordion">
          <div class="accordion-body">
            <!-- 필터링 영역 -->
            <div class="filter-section">
              <!-- 첫번째 줄: 대출, 층수 -->
              <div class="row">
                <div class="filter-box">
                  <h5>대출</h5>
                  <div class="checkbox-group vertical">
                    <label>
                      <input type="checkbox" value="LH" v-model="filters.loan" />
                      &nbsp LH
                    </label>
                    <label>
                      <input type="checkbox" value="버팀목" v-model="filters.loan" />
                      &nbsp 버팀목
                    </label>
                    <label>
                      <input type="checkbox" value="중기청80" v-model="filters.loan" />
                      &nbsp 중기청80
                    </label>
                    <label>
                      <input type="checkbox" value="중기청100" v-model="filters.loan" />
                      &nbsp 중기청100
                    </label>
                  </div>
                </div>
                
                <div class="filter-box">
                  <h5>층수</h5>
                  <div class="checkbox-group vertical">
                    <label>
                      <input type="checkbox" value="under" v-model="filters.floor"/>
                      &nbsp 지하
                    </label>
                    <label>
                      <input type="checkbox" value="1floor" v-model="filters.floor"/>
                      &nbsp 1층
                    </label>
                    <label>
                      <input type="checkbox" value="2floor" v-model="filters.floor"/>
                      &nbsp 2층 이상
                    </label>
                  </div>
                </div>
              </div>

              <!-- 두번째 줄: 전/월세 -->
              <div class="row">
                <div class="filter-box">
                  <h5>전/월세</h5>
                  <div class="checkbox-group horizontal">
                    <label>
                      <input type="checkbox" value="junse" v-model="filters.type"/>
                      &nbsp 전세
                    </label>
                    <label>
                      <input type="checkbox" value="month" v-model="filters.type"/>
                      &nbsp 월세
                    </label>
                  </div>
                </div>

                <div class="filter-box">
                  <div class="price-slider-group">
                    <div class="price-slider">
                      <label for="depositRange">보증금(전세금)</label>
                      <input type="range" id="depositRange" v-model="filters.deposit" min="0" max="200000000" step="1000000">
                      <span>{{ formattedDeposit }}</span>
                    </div>
                    <div class="price-slider">
                      <label for="rentRange">월세</label>
                      <input type="range" id="rentRange" v-model="filters.rent" min="0" max="5000000" step="50000">
                      <span>{{ formattedRent }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="button-group">
                <form class="search-bar" action="/search" method="GET">
                  <input type="text" name="query" placeholder="주변 지하철역을 검색">
                </form>

                <div class="submit-button-container">
                  <button class="btn btn-submit" @click="submitFilters">필터 적용</button>
                  <button class="btn btn-reset" @click="resetFilters">조건 초기화</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
const showFilters = ref(true); 

// 매물 데이터 설정: 전세/월세와 층수 정보를 추가
const propertiesData = {
  oneRoom: [
    { name: '서울 용산구 위례성대로 8길 28', price: 500, loan: 'LH', type: 'junse', floor: '2floor' },
    { name: '관악구 원룸', price: 600, loan: '버팀목', type: 'month', floor: '1floor' },
    { name: '낙성대 원룸', price: 550, loan: '중기청80', type: 'month', floor: 'under' },
  ],
  villa: [
    { name: '강남 빌라', price: 1000, loan: '중기청100', type: 'junse', floor: '2floor' },
    { name: '서초 빌라', price: 950, loan: 'LH', type: 'month', floor: '1floor' },
  ],
  opistel: [
    { name: '서울대 오피스텔', price: 850, loan: '중기청100', type: 'junse', floor: '2floor' },
    { name: '강남 오피스텔', price: 1200, loan: '버팀목', type: 'month', floor: 'under' },
  ],
};

// 필터 관리: 기본값을 모두 선택된 상태로 설정
const filters = reactive({
  loan: ['LH', '버팀목', '중기청80', '중기청100'], // 모든 대출 옵션 선택
  floor: ['under', '1floor', '2floor'], // 모든 층수 옵션 선택
  type: ['junse', 'month'], // 전세와 월세 모두 선택
  rent: 5000000, // 월세 슬라이더를 최대로 설정
  deposit: 200000000, // 보증금 슬라이더를 최대로 설정
});

// 필터 값 형식 처리
const formattedDeposit = computed(() => {
  return `${(filters.deposit / 10000000).toFixed(1)}억 원`;
});

const formattedRent = computed(() => {
  return `${(filters.rent / 10000).toFixed(1)}만원`;
});

// 필터 초기화: 전체 선택으로 되돌리기
const resetFilters = () => {
  filters.loan = ['LH', '버팀목', '중기청80', '중기청100'];
  filters.floor = ['under', '1floor', '2floor'];
  filters.type = ['junse', 'month'];
  filters.deposit = 200000000;
  filters.rent = 5000000;
};

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

// 필터 적용된 매물 목록 계산
const filteredProperties = computed(() => {
  const properties = propertiesData[activeTab.value];

  return properties.filter((property) => {
    const matchesLoan = filters.loan.length === 0 || filters.loan.includes(property.loan);
    const matchesFloor = filters.floor.length === 0 || filters.floor.includes(property.floor);
    const matchesType = filters.type.length === 0 || filters.type.includes(property.type);
    const matchesRent = property.price <= filters.rent;
    const matchesDeposit = property.price <= filters.deposit || filters.deposit === 0;
    return matchesLoan && matchesFloor && matchesType && matchesRent && matchesDeposit;
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
/* 필터 섹션 */
.filter-section {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin-left: 20px;
  gap: 20px; /* Add spacing between rows */
}

.row {
  display: flex;
  justify-content: space-between; /* Ensure items are spaced out */
  width: 100%;
}

.full-width {
  width: 100%; /* Make the 전/월세 section take full width */
}

/* 대출, 층수 필터 박스 */
.filter-box {
  flex: 1; /* Each filter box takes equal width */
  padding: 10px;
}

/* 전/월세 체크박스와 가격 슬라이더 */
.checkbox-group.horizontal {
  display: flex;
  gap: 20px; /* Space between 전세 and 월세 checkboxes */
}

.price-slider-group {
  display: flex;
  gap: 20px; /* Space between the two sliders */
}

.price-slider {
  display: flex;
  flex-direction: column;
  width: 100%; /* Make sliders take full width */
}

.price-slider label {
  margin-bottom: 5px; /* Add space between the label and slider */
}

.price-slider input {
  width: 100%; /* Slider width */
}

/* 탭 네비게이션 */
.tab-navigation {
  font-weight: bold;
  font-size: 24px; /* 탭 네비게이션의 기본 폰트 크기 */
  margin-left: 26px;
}

.tab-item {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 15px;
  color: gray;
  text-decoration: none;
  position: relative;
  font-size: 28px; /* 탭 아이템의 폰트 크기를 증가 */
  cursor: pointer;
}

.tab-item.active {
  color: #6b2e9b;
  font-size: 28px; /* 활성화된 탭의 폰트 크기를 더 크게 설정 */
}

/* checkbox-group 클래스를 가로 배치 */
.checkbox-group.horizontal {
  display: flex;
  gap: 20px; /* 각 항목 간의 간격을 조정 */
}

.checkbox-group label {
  display: inline-flex;
  align-items: center;
  margin-right: 7px;
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

/* 제출 버튼 스타일 */
.submit-button-container {
  display: flex;
  align-items: center;
}

.btn-submit {
  background-color: var(--main1);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #5a2384;
}

.btn-reset {
  background-color: #e5e5e5;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  margin-right: 20px;
  cursor: pointer;
}

.btn-reset:hover {
  background-color: #8f8484;
}

/* 작은 버튼 크기 조정 */
.small-btn {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
}

/* 검색바 및 버튼 그룹을 같은 줄에 배치 */
.button-group {
  display: flex;
  align-items: flex-end;
  gap: 20px; /* 검색창과 필터 적용 버튼 사이 간격 */
}

/* 검색창 스타일 */
.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input[type="text"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

hr {
  border: 0;
  height: 3px; /* 원하는 굵기로 설정 */
  background-color: var(--main-gray1); /* 진한 색상으로 설정 */
}
</style>
