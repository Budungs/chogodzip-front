<template>
  <div class="container">
    <hr />
    <div class="tab-navigation d-flex">
      <a
        href="#"
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

    <!-- 지도 및 매물 목록을 좌우로 나열하는 컨테이너 -->
    <div class="map-list-container">
      <!-- 매물 목록 표시 -->
      <div class="property-list">
        <p>매물 목록</p>
        <div v-for="(property, index) in propertyList" :key="index" class="card">
          <img src="https://via.placeholder.com/150" class="card-img-top" alt="Property Image">
          <div class="card-body">
            <h5 class="card-title">{{ property.name }}</h5>
            <p class="card-text fs-sm">{{ property.price }}만원</p>
            <a href="#" class="btn btn-sm btn-primary">상세보기</a>
          </div>
        </div>
      </div>

      <!-- Kakao 지도 컴포넌트 -->
      <KakaoMap />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'; // reactive 추가
import KakaoMap from './KakaoMap.vue'; // Kakao 지도 컴포넌트
import FilterModal from './PriceFilterModal.vue'; // 필터 모달 컴포넌트

// 탭 상태 관리
const activeTab = ref('shareHouse');

// 매물 목록 (더미 데이터)
const propertyList = ref([
  { name: '서울대입구 쉐어하우스', price: 500 },
  { name: '관악구 쉐어하우스', price: 600 },
  { name: '낙성대 쉐어하우스', price: 550 },
]);

// 모달 상태 관리
const showModal = ref(false);
const currentFilterType = ref(null);

// 필터 상태
const filters = reactive({
  gender: null,
  rooms: null,
  price: {
    deposit: 10000,
    rent: 60,
  },
});

const defaultFilters = reactive({
  gender: null,
  rooms: null,
  price: {
    deposit: 10000,
    rent: 60,
  },
});

// 탭 전환 시 필터 초기화
const setTab = (tab) => {
  if (activeTab.value !== tab) {
    resetFilters(); // 탭이 변경될 때 필터 초기화
  }
  activeTab.value = tab;
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

// 필터 초기화
const resetFilters = () => {
  filters.gender = defaultFilters.gender;
  filters.rooms = defaultFilters.rooms;
  filters.price.deposit = defaultFilters.price.deposit;
  filters.price.rent = defaultFilters.price.rent;
};
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
  flex-direction: row; /* 매물 목록을 왼쪽, 지도를 오른쪽에 배치 */
}

/* 매물 목록 스타일 */
.property-list {
  width: 35%; /* 매물 목록을 35% 너비로 설정 */
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto; /* 목록이 많을 때 스크롤 가능하게 설정 */
  height: 500px; /* 목록 높이 고정 */
  scrollbar-width: thin; /* 스크롤바 스타일을 얇게 */
  scrollbar-color: #6b2e9b #f9f9f9; /* 스크롤바 색상 설정 */
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
  background-color: #6b2e9b;
  border: none;
}

.btn-primary:hover {
  background-color: #5a2384;
}

/* 지도 스타일 */
#map {
  width: 60%; /* 지도의 너비를 60%로 설정 */
  height: 500px;
  border-radius: 8px;
}

/* 스크롤바 스타일 커스터마이징 (Chrome, Edge, Safari) */
.property-list::-webkit-scrollbar {
  width: 8px;
}

.property-list::-webkit-scrollbar-thumb {
  background-color: #6b2e9b;
  border-radius: 10px;
}

.property-list::-webkit-scrollbar-track {
  background-color: #f9f9f9;
}
</style>
