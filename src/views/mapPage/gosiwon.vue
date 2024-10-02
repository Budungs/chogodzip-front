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
        <form class="search-bar" @submit.prevent="performSearch">
          <input
            type="text"
            v-model="searchQuery"
            name="query"
            placeholder="궁금한 지역을 검색하세요"
            @input="performSearch" 
          />
          <button type="submit">검색</button>
        </form>
      
        <div class="search-results-dropdown" v-if="showDropdown && searchResults.length">
          <div class="dropdown-header">
            <button @click="closeDropdown" class="close-btn">닫기</button>
          </div>
          <ul>
            <li v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
              {{ result.name }} ({{ result.type }})
            </li>
          </ul>
        </div>
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
                  <h5>대출</h5>
                  <div class="checkbox-group vertical">
                   
                    <label>
                      <input type="checkbox" value="버팀목" v-model="filters.loan" />
                      &nbsp 버팀목
                    </label>
                    
                  </div>
                </div>

                <div class="filter-box">
                  <h5>방 종류</h5>
                  <div class="checkbox-group vertical">
                    <label>
                      <input type="checkbox" value="under" v-model="filters.floor" />
                      &nbsp 고시원
                    </label>
                    <label>
                      <input type="checkbox" value="1floor" v-model="filters.floor" />
                      &nbsp 원룸텔
                    </label>
                    
                  </div>
                </div>
              </div>

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
                      <input type="range" id="depositRange" v-model="filters.deposit" min="0" max="10000000" step="1000000">
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
        
        <div class="list-header">
          <p>매물 목록</p>
    
          <div class="sort-dropdown">
            <select v-model="selectedSort" @change="sortProperties">
              <option value="distance">거리순</option>
              <option value="highPrice">높은가격순</option>
              <option value="lowPrice">낮은가격순</option>
              <option value="likes">좋아요순</option>
            </select>
          </div>
        </div>

        <div v-for="(property, index) in filteredPropertiesByDistance" :key="index" class="card">
          <!-- 이미지와 판매완료 오버레이 -->
          <div class="image-container">
            <img src="https://via.placeholder.com/150" class="card-img-top" alt="Property Image">
            
            <!-- 판매완료 오버레이 (isSale이 false일 때만 표시) -->
            <div v-if="!property.isSale" class="sold-overlay">
              <i class="bi bi-check-circle"></i>
              <p>판매완료</p>
            </div>
        
            <!-- 좋아요 개수와 하트 아이콘 (판매 완료가 아닌 경우에만 표시) -->
            <div v-if="property.isSale" class="like-overlay">
              <i class="bi bi-heart-fill"></i>
              <p>{{ property.likes }}</p>
            </div>
          </div>
          
          <div class="card-body">
            <h5 class="card-title">{{ property.roomName }}</h5>
            <p class="card-text fs-sm">전세 {{ property.depositMax }} 만원 | 월세 {{property.priceMax}}</p>
            
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
          <!-- <div class="location-filters"> -->
            <!-- 시/도 선택 -->
            <div class="btn-group">
              <button type="button" class="btn btn-filter">
                {{ selectedCity }}
              </button>
            </div>

            <!-- 구 선택 -->
            <div class="btn-group">
              <button type="button" class="btn btn-filter" @click="showDistrictSelect = !showDistrictSelect">
                {{ selectedDistrict || '구' }}
              </button>
              <div v-if="showDistrictSelect" class="dropdown-menu">
                <a 
                  v-for="district in districts" 
                  :key="district" 
                  href="#" 
                  class="dropdown-item" 
                  @click.prevent="setDistrict(district)"
                >
                  {{ district }}
                </a>
              </div>
            </div>

            
          </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import api from '@/api/mapApi'; // 고시원 데이터를 가져올 api 파일
import markerImageSrc from '@/assets/img/room/house1.png'; // 마커 이미지

// Search query and results
const searchQuery = ref('');
const searchResults = ref([]);
const showDropdown = ref(false); 

// Sample data for subway stations and universities
const allLocations = [
  { id: 1, name: '강남역', type: '지하철' },
  { id: 2, name: '서울대입구역', type: '지하철' },
  { id: 3, name: '연세대학교', type: '학교' },
  { id: 4, name: '고려대학교', type: '학교' },
  { id: 5, name: '홍대입구역', type: '지하철' },
];

// Function to filter search results based on query
const performSearch = () => {
  const query = searchQuery.value.trim().toLowerCase();

  console.log('Search Query:', query);

  searchResults.value = allLocations.filter(location =>
    location.name.toLowerCase().includes(query)
  );
  
  // Show dropdown if there are results
  showDropdown.value = searchResults.value.length > 0;
  console.log('Filtered Results:', searchResults.value);  
};

const selectResult = (result) => {
  console.log('Selected:', result);
  searchQuery.value = result.name;  // Update the search input with the selected result
  showDropdown.value = false;  // Hide the dropdown after selecting an item
};


const closeDropdown = () => {
  showDropdown.value = false;
};

// 탭 상태 관리
const activeTab = ref('gosiwon');
const showFilters = ref(true);

// 고시원 매물 데이터 설정
const propertiesData = ref([]); // API로부터 데이터를 받을 상태

// 하트 아이콘 상태 관리
const heartIcons = ref([]);

// 하트 아이콘 토글 함수
const toggleHeartIcon = (index) => {
  heartIcons.value[index] =
    heartIcons.value[index] === 'far fa-heart' ? 'fas fa-heart' : 'far fa-heart';
};

// 필터 관리
const filters = reactive({
  gender: ['남성', '여성', '남녀공용'],
  loan: ['버팀목'], // 대출 필터 초기화
  floor: ['under', '1floor'], // 방 종류 필터 초기화
  deposit: 10000000,
  rent: 5000000,
});

// 필터 값 형식 처리
const formattedDeposit = computed(
  () => `${(filters.deposit / 10000000).toFixed(1)}억 원`
);
const formattedRent = computed(() => `${(filters.rent / 10000).toFixed(1)}만원`);

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

// 필터 초기화
const resetFilters = () => {
  filters.gender = ['남성', '여성', '남녀공용'];
  filters.loan = ['버팀목'];
  filters.floor = ['under', '1floor'];
  filters.deposit = 10000000;
  filters.rent = 5000000;
};

// 필터 적용된 매물 목록 계산
const filteredProperties = computed(() => {
  return propertiesData.value.filter((property) => {
    const matchesRent = property.priceMin <= filters.rent;
    const matchesDeposit = property.depositMin <= filters.deposit;
    const matchesGender =
      filters.gender.length === 0 || filters.gender.includes(property.genderCd);
    const matchesLoan =
      filters.loan.length === 0 || filters.loan.includes(property.loanType); // loan 필터 적용
    const matchesFloor =
      filters.floor.length === 0 || filters.floor.includes(property.floorType); // floor 필터 적용
    return matchesRent && matchesDeposit && matchesGender && matchesLoan && matchesFloor;
  });
});

// 필터 적용 함수
const submitFilters = () => {
  console.log('Filters Applied:', filters);
};

// Kakao 지도 설정 및 마커 데이터 관리
const map = ref(null);
const markers = ref([]);

const fetchGosiwonData = async (lat, lng) => {
  try {
    const params = { lat, lng }; 
    const data = await api.getGosiwonList({ params }); 

    propertiesData.value = data; // 받아온 데이터를 상태에 저장
    heartIcons.value = Array(data.length).fill('far fa-heart'); // 하트 아이콘 초기화

    markers.value.forEach((marker) => marker.setMap(null));
    markers.value = [];

    // 마커 생성 및 customOverlay 사용
    markers.value = data.map((property) => {
      const markerPosition = new kakao.maps.LatLng(property.roomLat, property.roomLong);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        title: property.roomName,
        image: new kakao.maps.MarkerImage(markerImageSrc, new kakao.maps.Size(30, 35)),
      });
      marker.setMap(map.value); 
      return marker;
    });

  } catch (error) {
    console.error('고시원 데이터를 가져오는 중 오류 발생:', error);
  }
};

// 컴포넌트 마운트 후 지도 초기화 및 고시원 리스트 불러오기
onMounted(async () => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 지도 중심 좌표 (서울 기준)
    level: 5, // 지도 확대 레벨
  };

  map.value = new kakao.maps.Map(container, options);

  // 초기 로드 시 지도 중심 좌표를 사용하여 고시원 데이터 가져오기
  const center = map.value.getCenter();
  await fetchGosiwonData(center.getLat(), center.getLng());

  // 지도 드래그 완료 후, 새로운 중심 좌표로 고시원 데이터 가져오기
  kakao.maps.event.addListener(map.value, 'dragend', async () => {
    console.log('지도 드래그가 끝났습니다.');
    const center = map.value.getCenter(); // 드래그 후 중심 좌표
    await fetchGosiwonData(center.getLat(), center.getLng()); // 중심 좌표로부터 고시원 데이터 가져오기
  });
});

// 상태 관리
const selectedCity = ref('서울시');
const selectedDistrict = ref('');
const selectedNeighborhood = ref(''); // 선택된 동을 관리하는 변수
const showDistrictSelect = ref(false);

// 서울시의 구 리스트
const districts = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

// 각 구의 좌표 설정
const districtCoordinates = {
  강남구: { lat: 37.5172, lng: 127.0473 },
  강동구: { lat: 37.5301, lng: 127.1238 },
  강북구: { lat: 37.6396, lng: 127.0257 },
  강서구: { lat: 37.5509, lng: 126.8495 },
  관악구: { lat: 37.4784, lng: 126.9514 },
  광진구: { lat: 37.5384, lng: 127.0823 },
  구로구: { lat: 37.4955, lng: 126.8875 },
  금천구: { lat: 37.4569, lng: 126.8955 },
  노원구: { lat: 37.6544, lng: 127.0564 },
  도봉구: { lat: 37.6688, lng: 127.0466 },
  동대문구: { lat: 37.5744, lng: 127.0399 },
  동작구: { lat: 37.5124, lng: 126.9393 },
  마포구: { lat: 37.5638, lng: 126.9084 },
  서대문구: { lat: 37.5791, lng: 126.9368 },
  서초구: { lat: 37.4836, lng: 127.0327 },
  성동구: { lat: 37.5502, lng: 127.0413 },
  성북구: { lat: 37.5894, lng: 127.0167 },
  송파구: { lat: 37.5145, lng: 127.1054 },
  양천구: { lat: 37.5162, lng: 126.8665 },
  영등포구: { lat: 37.5262, lng: 126.8962 },
  용산구: { lat: 37.5324, lng: 126.9903 },
  은평구: { lat: 37.6176, lng: 126.9227 },
  종로구: { lat: 37.5735, lng: 126.9792 },
  중구: { lat: 37.5637, lng: 126.9973 },
  중랑구: { lat: 37.6063, lng: 127.0923 },
};

const selectedSort = ref('distance');

// 구 선택 처리
const setDistrict = (district) => {
  selectedDistrict.value = district;
  selectedNeighborhood.value = '';
  showDistrictSelect.value = false;

  // 선택한 구의 좌표로 지도 중심 이동
  const coordinates = districtCoordinates[district];
  if (coordinates) {
    console.log(coordinates.lat, coordinates.lng);
    const newCenter = new kakao.maps.LatLng(coordinates.lat, coordinates.lng);
    if (map.value) {
      map.value.setCenter(newCenter); // 지도 중심을 이동
      fetchGosiwonData(newCenter.getLat(), newCenter.getLng()); // 이동 후 새로운 중심 좌표로 데이터 가져오기
    } else {
      console.error('Map is not initialized');
    }
  }
};

</script>


<style scoped>
@import "../../assets/css/mapPage/gosiwon.css";
</style>