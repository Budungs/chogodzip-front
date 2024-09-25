<template>
    <div class="container">
        <div class="dictionary-container">
            <h1>Community</h1>
            <form class="form-group" style="width:100%; height: 75px; display:flex; flex-direction:row; justify-content:center;">
                <!-- 분류 Dropdown -->
                <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
                    <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-sort-down me-2"></i>
                        <span class="dropdown-toggle-label">{{ selectedOwner }}</span>
                    </button>
                    <input type="hidden">
                    <ul class="dropdown-menu">
                        <li>
                            <a href="#" class="dropdown-item" @click="selectOwner('전체')">
                                <span class="dropdown-item-lab  el">전체</span>
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

                <!-- 검색 인풋 -->
                <div class="input-group input-group-lg">
                    <span class="input-group-text text-muted">
                        <i class="fas fa-search"></i>
                    </span>
                    <input type="text" class="form-control" placeholder="공고 제목을 입력하세요">
                </div>
                <hr class="d-sm-none my-2">
        
                <hr class="d-sm-none my-2">
        
                <button type="button" class="btn btn-translucent-primary ms-auto" style="width:200px">검색</button>
            </form>
            
            <div class="fuck">
                <div class="gun">hihihih</div>
                <div class="sun">susnusnsusnu</div>
            </div>

        </div>

    </div>

</template>

<script setup>
import { ref, computed } from 'vue';

// 드롭다운에서 선택한 값을 저장하는 상태
const selectedOwner = ref('분류');

// 선택된 값을 업데이트하는 메소드
const selectOwner = (owner) => {
    selectedOwner.value = owner;
    selectedCategory.value = '분류'; // 주관 변경 시 분류 초기화
};
</script>

<style scoped>
.fuck {
    display: grid; /* Grid 활성화 */
    grid-template-columns: auto auto; /* 두 개의 열 생성 */
    justify-content: end; /* 오른쪽 정렬 */
}
.gun {
    width: 100px;
    height: 30px;
    background-color: red;
    margin-right: 10px; /* 적절한 간격 설정 */
}
.sun {
    width: 100px;
    height: 30px;
    background-color: yellow; /* 색상 수정 */
}
</style>

