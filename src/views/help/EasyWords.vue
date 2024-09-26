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
            <br>
            <div class="con-paging">
              <Pagination :currentPage="currentPage" :totalPages="totalPages" @update:page="handlePageChange" />
            </div>
          </div>
        </div>
      </div>

      <!-- 차트 탭 -->
      <div class="tab-pane fade" :class="{ active: activeTab === 'chart' }" id="nav-chart" role="tabpanel" aria-labelledby="nav-chart-tab">
        <div class="dictionary-container">
          <h2 class="title">
            <img src="../../assets/img/staticIcon.png" alt="부동산 사전" class="bookIcon" /> 별별 통계
          </h2>
        </div>
        <div class="accordion-holder">
          <div class="accordion-section">
            <h2>궁금한 부동산 통계가 있으신가요?</h2>
            <div class="first-chart">
              <div class="fc-chart">
                <h3>연령별 매매 가격 지수</h3>
                <canvas id="myChart"></canvas>
              </div>
              <div class="sd-chart">
                <h3>서울시 최근 5년 전세 보증금 차트</h3>
                <canvas id="lineChart"></canvas>
              </div>
            </div>

            <div class="second-chart">
              <div class="td-chart">
                <h3>서울시 주택 현황(원룸,빌라,오피스텔,고시원,기타)</h3>
                <canvas id="doughnutChart"></canvas>
              </div>
                           
            </div>

            <div class="third-chart">
              <div class="fc-chart">
                <h3>평균/중위(월세) 가격 비교</h3>
                <canvas id="radarChart"></canvas>
              </div>

              <div class="sk-chart">
                <div class="divide-cht">
                  <h3>서울시 상위 5개 거래량 차트</h3>
                  <canvas id="horizontalBarChart"></canvas> <!-- 새로운 수평 바 차트 -->
                </div>
                
                <br>
                <div class="divide-cht">
                  <h3>초갓집은 APP으로 돌아온다.</h3>
                  <h3>TO BE CONTINUE..</h3>
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <br><br><br><br><br><br>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Pagination from '@/common/components/Pagination.vue';
import Chart from 'chart.js/auto';

const totalPages = 10;
const currentPage = ref(1);

const handlePageChange = (page) => {
  currentPage.value = page;
};

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
  if (tab === 'chart') {
    drawChart();
    drawLineChart();
    drawDoughnutChart();
    drawRadarChart();
    drawHorizontalBarChart(); // 새로운 수평 바 차트 그리기 함수 호출
  }
};

const toggleAccordion = (index) => {
  if (activeAccordion.value === index) {
    activeAccordion.value = null;
  } else {
    activeAccordion.value = index;
  }
}

// 첫 번째 차트 그리기 함수 (세로 막대 차트)
const drawChart = () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }
    },
  });
};

// 두 번째 차트 그리기 함수 (라인 차트)
const drawLineChart = () => {
  const ctx = document.getElementById('lineChart').getContext('2d');
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Line Dataset',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }
  };

  new Chart(ctx, config);
};

// 세 번째 차트 그리기 함수 (도넛 차트)
const drawDoughnutChart = () => {
  const ctx = document.getElementById('doughnutChart').getContext('2d');
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Doughnut Dataset',
      data: [300, 50, 100, 75, 25, 150],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ]
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        }
      }
    }
  };

  new Chart(ctx, config);
};

// 네 번째 차트 그리기 함수 (수평 막대 차트)
const drawHorizontalBarChart = () => {
  const ctx = document.getElementById('horizontalBarChart').getContext('2d');
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Horizontal Sales Data',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y', // 수평 바 차트를 위해 y축을 기본 축으로 설정
      responsive: true,
      plugins: {
        
        title: {
          display: true,
          text: 'Chart.js Horizontal Bar Chart'
        }
      },
      elements: {
        bar: {
          borderWidth: 2
        }
      }
    }
  };

  new Chart(ctx, config);
};

// 네 번째 차트 그리기 함수 (Radar 차트)
const drawRadarChart = () => {
  const ctx = document.getElementById('radarChart').getContext('2d');
  const data = {
    labels: ['Speed', 'Agility', 'Strength', 'Endurance', 'Flexibility', 'Power'],
    datasets: [{
      label: 'Athlete Performance',
      data: [65, 59, 90, 81, 56, 55],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Radar Skip Points Chart'
        }
      }
    }
  };

  new Chart(ctx, config);
};
</script>

<style scoped>
@import "../../assets/css/help/easywords.css";

.con-paging {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fc-chart, .sd-chart {
  width: 45%; /* 차트의 너비를 설정 */
  margin: 10px; /* 차트 간의 간격을 설정 */
}


canvas {
  width: 100%;
  max-width: 600px;
  max-height: 400px;
}
</style>
