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
        <!-- 성별 필터링 UI -->
        <div v-if="filterType === 'gender'">
          <h6>성별</h6>
          <small class="text-muted">중복 선택 가능</small>
          <div class="gender-options">
            <button
              v-for="option in genderOptions"
              :key="option.value"
              :class="['gender-btn', { active: localFilters.gender.includes(option.value) }]"
              @click="toggleGender(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- 방 필터링 UI -->
        <div v-if="filterType === 'rooms'">
          <h6>방 개수</h6>
          <small class="text-muted">중복 선택 가능</small>
          <div class="gender-options">
            <button
              v-for="option in roomOptions"
              :key="option.value"
              :class="['gender-btn', { active: localFilters.rooms.includes(option.value) }]"
              @click="toggleRoom(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- 가격 필터링 UI -->
        <div v-if="filterType === 'price'">
          <h6>가격 설정</h6>
          <label for="depositRange" class="form-label">보증금(전세금)</label>
          <input type="range" class="form-range" min="0" max="20000" step="100" v-model="localFilters.price.deposit">
          <p>{{ formatCurrency(localFilters.price.deposit) }}</p>
          <label for="rentRange" class="form-label">월세</label>
          <input type="range" class="form-range" min="0" max="500" step="10" v-model="localFilters.price.rent">
          <p>{{ formatCurrency(localFilters.price.rent) }}</p>
        </div>
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

// 로컬 상태에 부모로부터 받은 필터 값을 복사 (초기값)
const localFilters = ref({
  gender: [...(props.filters.gender || [])], // gender가 undefined일 경우 빈 배열로 초기화
  rooms: [...(props.filters.rooms || [])], // rooms가 undefined일 경우 빈 배열로 초기화
  price: { ...props.filters.price } // price는 객체 복사
});

// 성별 선택 옵션
const genderOptions = ref([
  { label: '공용', value: 'unisex' },
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
]);

// 방 개수 선택 옵션
const roomOptions = ref([
  { label: '원룸', value: 'oneRoom' },
  { label: '투룸', value: 'twoRoom' },
  { label: '3룸 이상', value: 'threeRoom' },
]);

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

// 성별 선택을 토글 (중복 선택 가능)
const toggleGender = (gender) => {
  if (localFilters.value.gender.includes(gender)) {
    localFilters.value.gender = localFilters.value.gender.filter(item => item !== gender);
  } else {
    localFilters.value.gender.push(gender);
  }
};

// 방 개수 선택을 토글 (중복 선택 가능)
const toggleRoom = (room) => {
  if (localFilters.value.rooms.includes(room)) {
    localFilters.value.rooms = localFilters.value.rooms.filter(item => item !== room);
  } else {
    localFilters.value.rooms.push(room);
  }
};

// 부모 필터 값이 변경되면 로컬 필터 값도 동기화
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = {
      gender: [...(newFilters.gender || [])],
      rooms: [...(newFilters.rooms || [])],
      price: { ...newFilters.price }
    };
  },
  { deep: true }
);

// 필터 값을 초기값으로 리셋
const resetFilters = () => {
  localFilters.value = {
    gender: [],
    rooms: [],
    price: { deposit: 10000, rent: 60 }
  };
};

// 필터 적용: 부모 컴포넌트로 변경된 필터 값 전달
const applyFilters = () => {
  emit('update-filters', {
    ...localFilters.value,
    gender: [...(localFilters.value.gender || [])],
    rooms: [...(localFilters.value.rooms || [])]
  });
};

// 통화 형식으로 변환하는 함수
const formatCurrency = (value) => {
  return `${(value / 1000).toFixed(1)}억`;
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

.gender-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.gender-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #e0e0e0;
  color: black;
  font-size: 14px;
  cursor: pointer;
}

.gender-btn.active {
  background-color: #6b2e9b;
  color: white;
}

.btn-primary {
  background-color: #6b2e9b;
  border: none;
}

.btn-secondary {
  background-color: #e0e0e0;
  border: none;
}
</style>
