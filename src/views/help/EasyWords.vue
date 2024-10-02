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
            <img src="../../assets/img/staticIcon.png" alt="부동산 사전" class="bookIcon" /> 서울시 부동산이 궁금하다면?
          </h2>
        </div>
        <div class="accordion-holder">
          <div class="accordion-section">
            
            <div class="first-chart">
            
                <div class="stats-box">
                  <div class="stats-header">
                   
                    <span class="type-span">매매</span>
                    <span>전월세 대비 변동률</span>
                  </div>

                  <div class="stats-header">
                    <div class="category">
                      <span>연립/다세대</span>
                      <span class="increase">0.83% 상승</span>
                    </div>
                    <div class="category">
                      <span>오피스텔</span>
                      <span class="decrease">-0.83% 상승</span>
                    </div>
                  </div>
                </div>
              
              
            </div>
              
           

            <h4>🔎 지역별 가격 현황</h4>
            <div class="second-chart">
              <div class="td-chart">
                <div class="map-container">
                  <svg ref="svgMap" width="100%" height="600"></svg>
                </div>
              <div v-if="!showAllGu" class="return-button">
                <button @click="resetToAllGu">되돌리기</button>
              </div>
              </div>
                           
            </div>

            <h4>🔎 연립/다세대 & 오피스텔 통계 비교</h4>
            <div class="third-chart">
              <div class="fc-chart">
               
                <canvas id="line-chart"></canvas>
                <br>
                <p>최근 6개월 간 평균 월세가 추이</p>
              </div>

              <div class="fc-chart">
                
                <canvas id="bar-chart"></canvas> 
                <br>
                <p>최근 6개월 간 평균 전세가 추이</p>
              </div>
              

            </div>

            <div class="third-chart">
              <div class="fc-chart">
                <canvas id="second-line-chart"></canvas>
                <br>
                <p>최근 6개월 간 매매 대비 전세가 변동 추이</p>
              </div>
            
              <div class="fc-chart">
                <canvas id="third-line-chart"></canvas>
                <br>
                <p>최근 6개월 간 평균 전세보증금 변동 추이</p>
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
import { ref, onMounted, watch, nextTick } from 'vue';
import Pagination from '@/common/components/Pagination.vue';
import Chart from 'chart.js/auto';
import * as d3 from "d3"; // D3.js 라이브러리 import
import seoulSigGeoJson from "@/assets/data/seoul_sig.json"; // 서울시 구 경계 GeoJSON 데이터 import
import seoulDongGeoJson from "@/assets/data/seoul_dong.json"; // 서울시 동 GeoJSON 데이터 import

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

let lineChart = null;
let barChart = null; // Reference for the bar chart
let secondLineChart = null; // Reference for second line chart
let thirdLineChart = null;  // Reference for third line chart

// 차트를 그리는 함수 (기존 line chart)
const drawLineChart = () => {
  const canvas = document.getElementById('line-chart');
  
  if (!canvas) {
    console.error('Canvas element with id "line-chart" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');

  // If a chart instance already exists, destroy it to prevent duplication
  if (lineChart) {
    lineChart.destroy();
  }

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '2024',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '2024 중위 가격',
        data: [75, 69, 90, 71, 66, 45, 50],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
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
          text: '평균/중위(월세) 가격 비교'
        }
      }
    }
  };

  // Create the Chart.js chart and store the instance
  lineChart = new Chart(ctx, config);
};

// 차트를 그리는 함수 (새로운 바 차트)
const drawBarChart = () => {
  const canvas = document.getElementById('bar-chart');

  if (!canvas) {
    console.error('Canvas element with id "bar-chart" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');

  // Destroy previous chart if it exists
  if (barChart) {
    barChart.destroy();
  }

  const data = {
    labels: ['강남구', '서초구', '송파구', '마포구', '영등포구'], // Example districts
    datasets: [
      {
        label: '거래량',
        data: [120, 95, 78, 63, 47], // Example data for transaction volume
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '서울시 상위 5개 거래량'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // Create the Chart.js bar chart and store the instance
  barChart = new Chart(ctx, config);
};

// 두 번째 라인 차트 그리는 함수
const drawSecondLineChart = () => {
  const canvas = document.getElementById('second-line-chart');
  
  if (!canvas) {
    console.error('Canvas element with id "second-line-chart" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');

  // If a chart instance already exists, destroy it to prevent duplication
  if (secondLineChart) {
    secondLineChart.destroy();
  }

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: '매매 대비 전세가 변동 추이',
        data: [60, 62, 58, 65, 63, 70],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: '2024 중위 가격',
        data: [75, 69, 90, 71, 66, 45, 50],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
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
          text: '최근 6개월 간 매매 대비 전세가 변동 추이'
        }
      }
    }
  };

  // Create the Chart.js chart and store the instance
  secondLineChart = new Chart(ctx, config);
};

// 세 번째 라인 차트 그리는 함수
const drawThirdLineChart = () => {
  const canvas = document.getElementById('third-line-chart');
  
  if (!canvas) {
    console.error('Canvas element with id "third-line-chart" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');

  // If a chart instance already exists, destroy it to prevent duplication
  if (thirdLineChart) {
    thirdLineChart.destroy();
  }

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: '평균 전세보증금 변동 추이',
        data: [75, 73, 77, 72, 79, 74],
        fill: false,
        borderColor: 'rgb(255, 206, 86)',
        tension: 0.1
      },
      {
        label: '2024 중위 가격',
        data: [75, 69, 90, 71, 66, 45, 50],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
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
          text: '최근 6개월 간 평균 전세보증금 변동 추이'
        }
      }
    }
  };

  // Create the Chart.js chart and store the instance
  thirdLineChart = new Chart(ctx, config);
};

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  if (tab === 'chart') {
    drawSeoulMap();
    // drawLineChart(); // We'll handle chart drawing via watch
  }
};

const toggleAccordion = (index) => {
  if (activeAccordion.value === index) {
    activeAccordion.value = null;
  } else {
    activeAccordion.value = index;
  }
}

const svgMap = ref(null); // SVG 요소를 참조하는 ref
const selectedGu = ref(null); // 사용자가 선택한 구
const showAllGu = ref(true);  // true면 모든 구를 보여주고, false면 선택한 구의 동들을 보여줌

// 구 경계를 그리는 함수
const drawGuMap = () => {
  const width = 600;
  const height = 500;

  // SVG 요소 초기화
  d3.select(svgMap.value).selectAll("*").remove();

  // D3 Projection 설정 (메르카토르 투영법 사용)
  const projection = d3.geoMercator()
    .center([126.9780, 37.5665]) // 서울 중심 좌표 (경도, 위도)
    .scale(70000) // 확대/축소 비율
    .translate([width / 2, height / 2]); // 지도 중앙 맞춤

  // 경로 생성기 (Path Generator)
  const path = d3.geoPath().projection(projection);

  // SVG 요소 선택
  const svg = d3.select(svgMap.value)
    .attr("width", width)
    .attr("height", height);

  // 구별 폴리곤 그리기
  svg.selectAll("path")
    .data(seoulSigGeoJson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "lightblue") // 구역 채우기 색상
    .attr("stroke", "black")   // 경계선 색상
    .attr("stroke-width", 1)
    // 마우스 호버 이벤트 추가
    .on("mouseover", function () {
      d3.select(this).attr("fill", "orange"); // 마우스 오버 시 색상 변경
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "lightblue"); // 마우스 아웃 시 원래 색상으로 돌아옴
    })
    // 구 클릭 시 해당 구의 동 경계를 그리도록 변경
    .on("click", (event, d) => {
     
      selectedGu.value = d.properties.SIG_KOR_NM; // 구 이름 추출
      showAllGu.value = false;
      drawDongMap();
    });

    svg.selectAll("text")
    .data(seoulSigGeoJson.features)
    .enter()
    .append("text")
    .attr("x", d => projection(d3.geoCentroid(d))[0]) // 구역 중심 X 좌표
    .attr("y", d => projection(d3.geoCentroid(d))[1]+10) // 구역 중심 Y 좌표
    .attr("text-anchor", "middle") // 텍스트 중앙 정렬
    .attr("font-size", "12px") // 텍스트 크기
    .attr("fill", "black") // 텍스트 색상
    .text(d => d.properties.SIG_KOR_NM); // 구 이름 표시
};

// 선택된 구의 동 경계를 그리는 함수
const drawDongMap = () => {
  const width = 600;
  const height = 500;

  d3.select(svgMap.value).selectAll("*").remove();

  // 선택된 구 데이터만 필터링
  const guData = seoulDongGeoJson.features.filter(
    feature => feature.properties.adm_nm.includes(selectedGu.value) // 선택된 구 필터링
  );

  // D3 Projection 설정
  const projection = d3.geoMercator();
  
  // 경로 생성기 (Path Generator)
  const path = d3.geoPath().projection(projection);

  // 선택된 동만 화면에 맞춰 확대/중앙 배치
  projection.fitSize([width, height], {
    type: "FeatureCollection",
    features: guData
  });

  // SVG 요소 선택
  const svg = d3.select(svgMap.value)
    .attr("width", width)
    .attr("height", height);

  // 선택된 구 폴리곤 그리기
  svg.selectAll("path")
    .data(guData)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#ACF797") // 구역 채우기 색상
    .attr("stroke", "black")   // 경계선 색상
    .attr("stroke-width", 1)
    // 마우스 호버 이벤트 추가
    .on("mouseover", function () {
      d3.select(this).attr("fill", "orange"); // 마우스 오버 시 색상 변경
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#ACF797"); // 마우스 아웃 시 원래 색상으로 돌아옴
    })
    // 클릭 이벤트 추가
    .on("click", (event, d) => {
      alert(`${d.properties.adm_nm} 클릭됨`);
    });

  // 선택된 구의 동 이름 텍스트 추가
  svg.selectAll("text")
    .data(guData)
    .enter()
    .append("text")
    .attr("x", d => projection(d3.geoCentroid(d))[0]) // 각 구역의 중심 X 좌표
    .attr("y", d => projection(d3.geoCentroid(d))[1]) // 각 구역의 중심 Y 좌표
    .attr("text-anchor", "middle") // 텍스트 정렬 중앙으로
    .attr("font-size", "10px") // 글자 크기
    .attr("fill", "black") // 텍스트 색상
    .text(d => d.properties.adm_nm.replace(`서울특별시 ${selectedGu.value} `, "")); // 동 이름만 표시 (서울특별시와 구 이름 제외)
};

// 되돌리기 버튼을 눌렀을 때 구로 다시 돌아가기
const resetToAllGu = () => {
  showAllGu.value = true;
  drawGuMap();
};

// 차트 탭이 활성화될 때 차트를 그리도록 함
watch(activeTab, async (newTab) => {
  if (newTab === 'chart') {
    await nextTick(); 
    drawLineChart(); 
    drawBarChart(); // 추가된 차트 함수 호출
    drawSecondLineChart();
    drawThirdLineChart();
  }
});

// mounted 시 구 지도 그리기
onMounted(() => {
  drawGuMap();
});
</script>



<style scoped>
@import "../../assets/css/help/easywords.css";

.con-paging {
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  width: 100%;
  max-width: 600px;

}


</style>
