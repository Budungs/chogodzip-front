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
               <!-- 이곳에 그기능을 넣어줘 -->
               <div class="map-container">
                <svg ref="svgMap" width="100%" height="600"></svg>
                </div>
              <div v-if="!showAllGu" class="return-button">
                <button @click="resetToAllGu">되돌리기</button>
              </div>
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
import { ref,onMounted } from 'vue';
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

// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  if (tab === 'chart') {
    drawSeoulMap();
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
      alert(d.properties.SIG_KOR_NM);
      selectedGu.value = d.properties.SIG_KOR_NM; // 구 이름 추출
      showAllGu.value = false;
      drawDongMap();
    });
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
