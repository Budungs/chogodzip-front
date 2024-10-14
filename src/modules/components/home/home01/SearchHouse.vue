<template>
    <div class="bx-home-search">
      <div class="home-hero-cover"></div>
      <img class="home-hero-responsive-img" src="@/assets/images/backgrounds/home-2.jpg" alt="Hero Image" />
  
      <!-- 히어로 이미지 위 텍스트 + 검색 영역 -->
      <div class="bx-home-search-valid">
        <div class="bx-home-search-title pb-1">
          <h1>어떤 집을 찾고 계신가요?</h1>
        </div>

        <div class="bx-home-search-content">
            <!-- 필터링 -->
            <SearchNavBar @updateCategory="setCategory" />
            
            <!-- 검색 -->
            <div class="input-group" style="max-width:700px; height:70px">
                <input 
                  v-model="searchQuery" 
                  class="form-control px-4 fs-lg" 
                  type="text" 
                  placeholder="주변 매물을 찾고 싶은 대학교나 전철역을 입력하세요."
                />
                <button class="btn btn-primary"  @click="handleSearch">
                    <i class="fas fa-search display-6" />
                </button>
            </div>
        </div>
        
      </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchNavBar from './SearchNavBar.vue';

const searchQuery = ref('');
const router = useRouter();
const selectedCategory = ref('gosiwon'); 

const setCategory = (category) => {
  selectedCategory.value = category;
  console.log('선택된 카테고리:', selectedCategory.value); // 선택된 카테고리 출력 (디버깅용)
};

const handleSearch = () => {
  const queryParams = { query: searchQuery.value }; // 검색어 쿼리 파라미터 설정

  if (selectedCategory.value === 'gosiwon') {
    router.push({ name: 'Gosiwon', query: queryParams }); // 고시원 페이지로 이동
  } else if (selectedCategory.value === 'jachiroom') {
    router.push({ name: 'Jachiroom', query: queryParams }); // 자취방 페이지로 이동
  } else if (selectedCategory.value === 'sharehouse') {
    router.push({ name: 'Sharehouse', query: queryParams }); // 공유주거공간 페이지로 이동
  } else {
    console.error('잘못된 카테고리 선택');
  }
};


</script>

<style scoped>
/* 히어로 이미지 */
.bx-home-search {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    position: relative;
}

.home-hero-responsive-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    z-index: -2; 
}

/* 히어로 이미지 커버 */
.home-hero-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    z-index: -1;
}

/* 히어로 이미지 위 텍스트 + 검색 영역 */
.bx-home-search-valid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    align-items: center;
    z-index: 2;
    color: white;
    text-align: center;
    flex-direction: column;
    gap: 20px;
}
  
.home-hero-responsive-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    z-index:1;
}

/* 히어로 이미지 위 텍스트 + 검색 영역 */
.bx-home-search-valid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    color: white;
    text-align: center;
    flex-direction: column;
    gap:1px;
}
  
/* 타이틀 */
.bx-home-search-title {
    width: 100%;
}

.bx-home-search-title > h1 {
    color: white;
}

/* 필터링 + 검색 */
.bx-home-search-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
</style>