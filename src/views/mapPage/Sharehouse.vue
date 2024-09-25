<template>
  <div class="container">
    <hr />
    <div class="tab-navigation d-flex">
      <a
        class="tab-item"
        :class="{ active: activeTab === 'sharehouse' }"
        @click.prevent="setTab('sharehouse')"
      >공유주거공간</a>
      
      <div class="search-form">
        <form class="search-bar" action="/search" method="GET">
          <input type="text" name="query" placeholder="궁금한 지역을 검색하세요">
          <button type="submit">검색</button>
        </form>
      </div>
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
              <div class="row">
                <div class="filter-box">
                  <h5>주거 타입</h5>
                  <div class="checkbox-group vertical">
                    <label>
                      <input type="checkbox" value="공유주택" v-model="filters.type" />
                      &nbsp 공유주택
                    </label>
                    <label>
                      <input type="checkbox" value="쉐어하우스" v-model="filters.type" />
                      &nbsp 쉐어하우스
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- 성별 필터 -->
              <div class="row">
                <div class="filter-box">
                  <h5>성별</h5>
                  <div class="checkbox-group vertical">
                    <label>
                      <input type="checkbox" value="남성" v-model="filters.gender" />
                      &nbsp 남성 전용
                    </label>
                    <label>
                      <input type="checkbox" value="여성" v-model="filters.gender" />
                      &nbsp 여성 전용
                    </label>
                    <label>
                      <input type="checkbox" value="공용" v-model="filters.gender" />
                      &nbsp 남녀 공용
                    </label>
                  </div>
                </div>
              </div>

              <!-- 층수 및 가격 필터 -->
              <div class="row">
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

            <!-- 관심매물 아이콘 -->
            <div class="interest-icon">
              <i
                :class="heartIcons[index]"
                @click="toggleHeartIcon(index)"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Kakao 지도 -->
      <div id="map" class="map">
        <div class="map-overlay">
          <div class="location-filters">
            <!-- 시/도 선택 -->
            <div class="btn-group">
              <button type="button" class="btn btn-filter" @click="showCitySelect = !showCitySelect">
                {{ selectedCity || '시/도' }}
              </button>
              <div v-if="showCitySelect" class="dropdown-menu">
                <a href="#" class="dropdown-item" @click.prevent="setCity('서울시')">서울시</a>
                <a href="#" class="dropdown-item" @click.prevent="setCity('부산시')">부산시</a>
                <!-- 필요한 다른 시/도 추가 -->
              </div>
            </div>
        
            <!-- 구 선택 -->
            <div class="btn-group">
              <button type="button" class="btn btn-filter" @click="showDistrictSelect = !showDistrictSelect">
                {{ selectedDistrict || '시/군/구' }}
              </button>
              <div v-if="showDistrictSelect" class="dropdown-menu">
                <a href="#" class="dropdown-item" @click.prevent="setDistrict('강북구')">강북구</a>
                <a href="#" class="dropdown-item" @click.prevent="setDistrict('강남구')">강남구</a>
                <!-- 필요한 다른 구 추가 -->
              </div>
            </div>
        
            <!-- 동 선택 -->
            <div class="btn-group">
              <button type="button" class="btn btn-filter" @click="showNeighborhoodSelect = !showNeighborhoodSelect">
                {{ selectedNeighborhood || '읍/면/동' }}
              </button>
              <div v-if="showNeighborhoodSelect" class="dropdown-menu">
                <a href="#" class="dropdown-item" @click.prevent="setNeighborhood('수유동')">수유동</a>
                <a href="#" class="dropdown-item" @click.prevent="setNeighborhood('삼성동')">삼성동</a>
                <!-- 필요한 다른 동 추가 -->
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const activeTab = ref('sharehouse');
const showFilters = ref(true);

// 쉐어하우스와 공유주택 매물 목록
const propertiesData = {
  sharehouse: [
    { name: '강남 공유주택', price: 1000, type: '공유주택', gender: '공용', floor: '1floor', interested: true },
    { name: '서초 공유주택', price: 950, type: '공유주택', gender: '남성', floor: '2floor', interested: false },
    { name: '서울대 쉐어하우스', price: 500, type: '쉐어하우스', gender: '여성', floor: '2floor', interested: false },
    { name: '관악구 쉐어하우스', price: 600, type: '쉐어하우스', gender: '남성', floor: 'under', interested: false },
  ],
};

// 필터링 관련 설정
const filters = reactive({
  type: ['공유주택', '쉐어하우스'],
  gender: ['남성', '여성', '공용'],
  floor: ['under', '1floor', '2floor'],
  rent: 5000000,
  deposit: 200000000,
});

// 필터 적용된 매물 목록 계산
const filteredProperties = computed(() => {
  const properties = propertiesData[activeTab.value];

  return properties.filter(property => {
    const matchesType = filters.type.length === 0 || filters.type.includes(property.type);
    const matchesGender = filters.gender.length === 0 || filters.gender.includes(property.gender);
    const matchesFloor = filters.floor.length === 0 || filters.floor.includes(property.floor);
    const matchesRent = property.price <= filters.rent;
    const matchesDeposit = property.price <= filters.deposit;
    return matchesType && matchesGender && matchesFloor && matchesRent && matchesDeposit;
  });
});

// 관심 매물 토글 함수
const toggleInterest = (property) => {
  property.interested = !property.interested;
};

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

// 하트 아이콘 상태 관리
const heartIcons = ref(Array(propertiesData.sharehouse.length).fill('far fa-heart'));

// 하트 아이콘 토글 함수
const toggleHeartIcon = (index) => {
  heartIcons.value[index] =
    heartIcons.value[index] === 'far fa-heart' ? 'fas fa-heart' : 'far fa-heart';
};

// 필터 값 형식 처리
const formattedDeposit = computed(() => {
  return `${(filters.deposit / 10000000).toFixed(1)}억 원`;
});

const formattedRent = computed(() => {
  return `${(filters.rent / 10000).toFixed(1)}만원`;
});

const resetFilters = () => {
  filters.type = ['공유주택', '쉐어하우스'];
  filters.gender = ['남성', '여성', '공용'];
  filters.floor = ['under', '1floor', '2floor'];
  filters.deposit = 200000000;
  filters.rent = 5000000;
};

// Kakao 지도 관련 설정
const map = ref(null);
const markers = ref([]);

onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), 
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

// 상태 관리
const selectedCity = ref('');
const selectedDistrict = ref('');
const selectedNeighborhood = ref('');

const showCitySelect = ref(false);
const showDistrictSelect = ref(false);
const showNeighborhoodSelect = ref(false);

// 시 선택
const setCity = (city) => {
  selectedCity.value = city;
  selectedDistrict.value = ''; // 구 초기화
  selectedNeighborhood.value = ''; // 동 초기화
  showCitySelect.value = false;
};

// 구 선택
const setDistrict = (district) => {
  selectedDistrict.value = district;
  selectedNeighborhood.value = ''; // 동 초기화
  showDistrictSelect.value = false;
};

// 동 선택
const setNeighborhood = (neighborhood) => {
  selectedNeighborhood.value = neighborhood;
  showNeighborhoodSelect.value = false;
  console.log(`선택된 위치: ${selectedCity.value} ${selectedDistrict.value} ${selectedNeighborhood.value}`);
};

</script>

<style scoped>
@import "../../assets/css/mapPage/sharehouse.css";
</style>
