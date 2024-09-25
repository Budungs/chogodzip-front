<template>
  <div class="container">
  
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'dictionary' }"
          id="nav-dictionary-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-dictionary"
          type="button"
          role="tab"
          aria-controls="nav-dictionary"
          aria-selected="activeTab === 'dictionary'"
          @click.prevent="setTab('dictionary')"
        >
          부동산 사전
        </button>
        <button
          class="nav-link"
          :class="{ active: activeTab === 'chart' }"
          id="nav-chart-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-chart"
          type="button"
          role="tab"
          aria-controls="nav-chart"
          aria-selected="activeTab === 'chart'"
          @click.prevent="setTab('chart')"
        >
          별별 통계
        </button>
      </div>
    </nav>
    
    <!-- 탭 콘텐츠 -->
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show" :class="{ active: activeTab === 'dictionary' }" id="nav-dictionary" role="tabpanel" aria-labelledby="nav-dictionary-tab">
        <div class="dictionary-container">
          <h2 class="title">
            <img src="../../assets/img/bookIcon.png" alt="부동산 사전" class="bookIcon" /> 부동산 사전
          </h2>
        </div>
        <!-- 부동산 용어 관련 아코디언 -->
        <div class="accordion-holder">
          <div class="accordion-section">
            <h2>궁금한 부동산 용어가 있으신가요?</h2>
            <div v-for="(item, index) in dictionaryData" :key="index" class="accordion-item">
              <button @click="toggleAccordion(index)" class="accordion-title">
                {{ item.question }}
                <span v-if="activeAccordion === index">▲</span>
                <span v-else>▼</span>
              </button>
              <div v-if="activeAccordion === index" class="accordion-content">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-pane fade" :class="{ active: activeTab === 'chart' }" id="nav-chart" role="tabpanel" aria-labelledby="nav-chart-tab">
        <div class="dictionary-container">
          <h2 class="title">
            <img src="../../assets/img/staticIcon.png" alt="부동산 사전" class="bookIcon" /> 별별 통계
          </h2>
        </div>
      </div>


    </div>

   
    <br><br><br><br><br><br>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 탭 상태 관리
const activeTab = ref('dictionary');
const activeAccordion = ref(null);

// 데이터 (임의로 작성된 질문 및 답변 데이터)
const dictionaryData = ref([
  { question: '지원서 제출해야할 서류가 있나요?', answer: '지원서 제출 시 필요한 서류는 신분증 사본, 증명사진 등입니다.' },
  { question: 'HRD-Net에서 과정 검색이 되지 않아요.', answer: 'HRD-Net에서 과정을 검색할 수 없는 경우에는 담당 부서에 문의하세요.' },
  { question: '재학자/재학생도 신청 가능한가요?', answer: '재학 중인 학생도 신청이 가능합니다.' },
  { question: '전공자와 비전공자의 차이가 궁금해요!', answer: '전공자와 비전공자는 일부 과정에서 차이가 발생할 수 있습니다.' },
  { question: '선발 프로세스가 궁금합니다.', answer: '선발 프로세스는 서류심사, 면접, 최종합격 순서로 진행됩니다.' },
  { question: '지원서 제출해야할 서류가 있나요?', answer: '지원서 제출 시 필요한 서류는 신분증 사본, 증명사진 등입니다.' },
  { question: 'HRD-Net에서 과정 검색이 되지 않아요.', answer: 'HRD-Net에서 과정을 검색할 수 없는 경우에는 담당 부서에 문의하세요.' },
  { question: '재학자/재학생도 신청 가능한가요?', answer: '재학 중인 학생도 신청이 가능합니다.' },
  { question: '전공자와 비전공자의 차이가 궁금해요!', answer: '전공자와 비전공자는 일부 과정에서 차이가 발생할 수 있습니다.' },
  { question: '선발 프로세스가 궁금합니다.', answer: '선발 프로세스는 서류심사, 면접, 최종합격 순서로 진행됩니다.' },
]);

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

// 아코디언 토글
const toggleAccordion = (index) => {
  if (activeAccordion.value === index) {
    activeAccordion.value = null;
  } else {
    activeAccordion.value = index;
  }
};

// 필터 초기화 (임시 함수)
const resetFilters = () => {
  // 필터를 초기화하는 로직을 추가하세요.
};
</script>

<style scoped>
@import "../../assets/css/help/easywords.css";


</style>
