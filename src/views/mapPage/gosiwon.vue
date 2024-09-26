<template>
  <div class="container">
    <hr />
    <div class="tab-navigation d-flex">
      <a
        class="tab-item"
        :class="{ active: activeTab === 'gosiwon' }"
        @click.prevent="setTab('gosiwon')"
      >고시원</a>
      <div class="search-form">
        <form class="search-bar" action="/search" method="GET">
          <input type="text" name="query" placeholder="궁금한 지역을 검색하세요">
          <button type="submit">검색</button>
        </form>
      </div>
    </div>

   

    <div class="accordion" id="exampleAccordion">
      <hr>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFilter">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#filterCollapse" aria-expanded="true" aria-controls="filterCollapse">
            필터링 옵션
          </button>
        </h2>
        <div id="filterCollapse" class="accordion-collapse collapse show" aria-labelledby="headingFilter" data-bs-parent="#exampleAccordion">
          <div class="accordion-body">
            <div class="filter-section">
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
                      <input type="checkbox" value="남녀공용" v-model="filters.gender" />
                      &nbsp 남녀 공용
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

    <div class="map-list-container">
      <div class="property-list">
        <p>매물 목록</p>
        <div v-for="(property, index) in filteredProperties" :key="index" class="card">
          <!-- 이미지와 판매완료 오버레이 -->
          <div class="image-container">
            <img src="https://via.placeholder.com/150" class="card-img-top" alt="Property Image">
            
            <!-- 판매완료 오버레이 (isSale이 false일 때만 표시) -->
            <div v-if="!property.isSale" class="sold-overlay">
              <i class="bi bi-check-circle"></i>
              <p>판매완료</p>
            </div>
          </div>
          
          <div class="card-body">
            <h5 class="card-title">{{ property.name }}</h5>
            <p class="card-text fs-sm">{{ property.price }}만원</p>
            <a href="#" class="btn btn-sm btn-primary">상세보기</a>
        
            <!-- 관심매물 아이콘 -->
            <div class="interest-icon mt-2">
              <i :class="heartIcons[index]" @click="toggleHeartIcon(index)"></i>
            </div>
          </div>
        </div>
        
        
      </div>

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

// 탭 상태 관리
const activeTab = ref('gosiwon');
const showFilters = ref(true);

// 고시원 매물 데이터 설정
const propertiesData = {
  gosiwon: [
    { name: '건대 고시원', price: 500, gender: '남성', isSale: true },
    { name: '관악구 고시원', price: 600, gender: '여성', isSale: false },
    { name: '낙성대 고시원', price: 550, gender: '남녀공용', isSale: true },
  ],
};

// 하트 아이콘 상태 관리
const heartIcons = ref(Array(propertiesData.gosiwon.length).fill('far fa-heart'));

// 하트 아이콘 토글 함수
const toggleHeartIcon = (index) => {
  heartIcons.value[index] =
    heartIcons.value[index] === 'far fa-heart' ? 'fas fa-heart' : 'far fa-heart';
};

// 필터 관리
const filters = reactive({
  gender: ['남성', '여성', '남녀공용'],
  deposit: 200000000,
  rent: 5000000,
});

// 필터 값 형식 처리
const formattedDeposit = computed(() => {
  return `${(filters.deposit / 10000000).toFixed(1)}억 원`;
});

const formattedRent = computed(() => {
  return `${(filters.rent / 10000).toFixed(1)}만원`;
});

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

// 필터 초기화
const resetFilters = () => {
  filters.gender = ['남성', '여성', '남녀공용'];
  filters.deposit = 200000000;
  filters.rent = 5000000;
};

// 필터 적용된 매물 목록 계산
const filteredProperties = computed(() => {
  const properties = propertiesData[activeTab.value];

  return properties.filter((property) => {
    const matchesRent = property.price <= filters.rent;
    const matchesDeposit = filters.deposit === 0 || property.price <= filters.deposit;
    const matchesGender =
      filters.gender.length === 0 || filters.gender.includes(property.gender);
    return matchesRent && matchesDeposit && matchesGender;
  });
});

// 필터 적용 함수
const submitFilters = () => {
  console.log('Filters Applied:', filters);
};

// Kakao 지도 설정 및 마커 데이터 관리
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

const setCity = (city) => {
  selectedCity.value = city;
  selectedDistrict.value = '';
  selectedNeighborhood.value = '';
  showCitySelect.value = false;
};

const setDistrict = (district) => {
  selectedDistrict.value = district;
  selectedNeighborhood.value = '';
  showDistrictSelect.value = false;
};

const setNeighborhood = (neighborhood) => {
  selectedNeighborhood.value = neighborhood;
  showNeighborhoodSelect.value = false;
  console.log(`선택된 위치: ${selectedCity.value} ${selectedDistrict.value} ${selectedNeighborhood.value}`);
};

</script>

<style scoped>
@import "../../assets/css/mapPage/gosiwon.css";
</style>
