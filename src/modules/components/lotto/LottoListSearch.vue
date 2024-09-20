<template>
    <form class="form-group" style="width:100%; height: 75px; display:flex; flex-direction:row; justify-content:center;">
        <!-- 검색 인풋 -->
        <div class="input-group input-group-lg">
            <span class="input-group-text text-muted">
                <i class="fas fa-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="공고 제목을 입력하세요">
        </div>
        
        <hr class="d-sm-none my-2">

        <!-- 주관 Dropdown -->
        <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
            <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                <i class="fas fa-sort-down me-2"></i>
                <span class="dropdown-toggle-label">{{ selectedOwner }}</span>
            </button>
            <input type="hidden">
            <ul class="dropdown-menu">
                <li>
                    <a href="#" class="dropdown-item" @click="selectOwner('공공')">
                        <span class="dropdown-item-label">전체</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectOwner('공공')">
                        <span class="dropdown-item-label">공공</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectOwner('민간')">
                        <span class="dropdown-item-label">민간</span>
                    </a>
                </li>
            </ul>
        </div>

        <hr class="d-sm-none my-2">

        <!-- 분류 Dropdown -->
        <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
            <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                <i class="fas fa-sort-down me-2"></i>
                <span class="dropdown-toggle-label">{{ selectedCategory }}</span>
            </button>
            <input type="hidden">
            <ul class="dropdown-menu">
                <li v-for="category in categoryOptions" :key="category">
                    <a href="#" class="dropdown-item" 
                    @click="category !== '주관을 선택하세요' && selectCategory(category)"
                    :class="{disabled: category == '주관을 선택하세요'}"
                    :style="{cursor: category == '주관을 선택하세요' ? 'not-allowed' : 'pointer'}"
                    >
                        <span class="dropdown-item-label">{{ category }}</span>
                    </a>
                </li>
            </ul>
        </div>

        <hr class="d-sm-none my-2">

        <!-- 지역 Dropdown -->
        <div class="dropdown w-sm-40 border-end-md" data-bs-toggle="select">
            <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                <i class="fas fa-sort-down me-2"></i>
                <span class="dropdown-toggle-label">{{ selectedRegion }}</span>
            </button>
            <input type="hidden">
            <ul class="dropdown-menu">
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('전체')">
                        <span class="dropdown-item-label">전체</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('부산광역시')">
                        <span class="dropdown-item-label">부산광역시</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('인천광역시')">
                        <span class="dropdown-item-label">인천광역시</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('대구광역시')">
                        <span class="dropdown-item-label">대구광역시</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('대전광역시')">
                        <span class="dropdown-item-label">대전광역시</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('광주광역시')">
                        <span class="dropdown-item-label">광주광역시</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('울산광역시')">
                        <span class="dropdown-item-label">울산광역시</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('세종특별자치시')">
                        <span class="dropdown-item-label">세종특별자치시</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('경기도')">
                        <span class="dropdown-item-label">경기도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('충청북도')">
                        <span class="dropdown-item-label">충청북도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('충청남도')">
                        <span class="dropdown-item-label">충청남도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('전라남도')">
                        <span class="dropdown-item-label">전라남도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('경상북도')">
                        <span class="dropdown-item-label">경상북도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('경상남도')">
                        <span class="dropdown-item-label">경상남도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('강원특별자치도')">
                        <span class="dropdown-item-label">강원특별자치도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('전북특별자치도')">
                        <span class="dropdown-item-label">전북특별자치도</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectRegion('제주특별자치도')">
                        <span class="dropdown-item-label">제주특별자치도</span>
                    </a>
                </li>
            </ul>
        </div>

        <hr class="d-sm-none my-2">

        <!-- 상태 Dropdown -->
        <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
            <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                <i class="fas fa-sort-down me-2"></i>
                <span class="dropdown-toggle-label">{{ selectedStatus }}</span>
            </button>
            <input type="hidden">
            <ul class="dropdown-menu">
                <li>
                    <a href="#" class="dropdown-item" @click="selectStatus('공고중')">
                        <span class="dropdown-item-label">전체</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectStatus('공고중')">
                        <span class="dropdown-item-label">공고중</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectStatus('접수예정')">
                        <span class="dropdown-item-label">접수예정</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-item" @click="selectStatus('마감')">
                        <span class="dropdown-item-label">마감</span>
                    </a>
                </li>
            </ul>
        </div>

        <button type="button" class="btn btn-translucent-primary ms-auto" style="width:200px">검색</button>
    </form>
</template>

<script setup>
import { ref, computed } from 'vue';

// 드롭다운에서 선택한 값을 저장하는 상태
const selectedOwner = ref('주관');
const selectedCategory = ref('분류');
const selectedRegion = ref('지역');
const selectedStatus = ref('상태');

// 주관에 따라 분류 목록 변경
const publicCategories = ['청년안심주택', '기타'];
const privateCategories = ['공공지원민간주택', '기타'];

// 선택된 값에 따라 분류 항목을 동적으로 변경하는 계산된 속성
const categoryOptions = computed(() => {
    if (selectedOwner.value === '주관') {
        return ['주관을 선택하세요'];
    }
    return selectedOwner.value === '공공' ? publicCategories : privateCategories;
});

// 선택된 값을 업데이트하는 메소드
const selectOwner = (owner) => {
    selectedOwner.value = owner;
    selectedCategory.value = '분류'; // 주관 변경 시 분류 초기화
};

const selectCategory = (category) => {
    selectedCategory.value = category;
};

const selectRegion = (region) => {
    selectedRegion.value = region;
};

const selectStatus = (status) => {
    selectedStatus.value = status;
};
</script>