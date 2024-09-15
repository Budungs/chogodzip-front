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
  
      <br />
  
      <div v-if="activeTab === 'shareHouse'">
        <p>쉐어하우스 목록</p>
      </div>
      <div v-else-if="activeTab === 'sharedHouse'">
        <p>공유주택 목록</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue';
  import FilterModal from './PriceFilterModal.vue'; // 모달 컴포넌트 임포트
  
  const activeTab = ref('shareHouse');
  const showModal = ref(false);
  const currentFilterType = ref(null);
  
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
      resetFilters(); // 탭이 변경될 때 필터를 초기화
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
  
  // 필터 값 업데이트
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
  /* 탭 네비게이션 스타일링 */
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
  
  .filter-btn-group {
    margin-top: 15px;
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
  </style>
  