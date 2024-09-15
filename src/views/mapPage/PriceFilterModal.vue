<template>
    <div class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ getTitle }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div v-if="filterType === 'price'">
            <h6>가격 설정</h6>
            <label for="depositRange" class="form-label">보증금(전세금)</label>
            <input type="range" class="form-range" min="0" max="20000" step="100" v-model="localFilters.price.deposit">
            <p>{{ formatCurrency(localFilters.price.deposit) }}</p>
            <label for="rentRange" class="form-label">월세</label>
            <input type="range" class="form-range" min="0" max="500" step="10" v-model="localFilters.price.rent">
            <p>{{ formatCurrency(localFilters.price.rent) }}</p>
          </div>
          <!-- 다른 필터 설정 UI 추가 -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetFilters">조건 삭제</button>
          <button type="button" class="btn btn-primary" @click="applyFilters">적용</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  import { toRefs } from 'vue';
  
  // Props
  const props = defineProps({
    filterType: {
      type: String,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
  });
  const emit = defineEmits(['close', 'update-filters']);
  
  // 로컬 상태에 부모로부터 받은 필터 값을 복사
  const localFilters = ref({ ...props.filters });
  
  // 모달의 제목을 조건에 따라 변경
  const getTitle = computed(() => {
    switch (props.filterType) {
      case 'price':
        return '가격 필터';
      case 'gender':
        return '성별 필터';
      case 'rooms':
        return '방 개수 필터';
      default:
        return '';
    }
  });
  
  // 부모 필터 값이 변경되면 로컬 필터 값도 동기화
  watch(
    () => props.filters,
    (newFilters) => {
      localFilters.value = { ...newFilters };
    },
    { deep: true }
  );
  
  // 통화 형식으로 변환
  const formatCurrency = (value) => {
    return `${(value / 1000).toFixed(1)}억`;
  };
  
  // 필터 값을 초기값으로 리셋
  const resetFilters = () => {
    localFilters.value = { ...props.filters };
  };
  
  // 필터 적용: 부모 컴포넌트로 변경된 필터 값 전달
  const applyFilters = () => {
    emit('update-filters', localFilters.value);
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-body {
    margin-top: 20px;
  }
  
  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  </style>
  