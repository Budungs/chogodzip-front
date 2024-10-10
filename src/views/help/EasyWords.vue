<template>
  <div class="container">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link" :class="{ active: activeTab === 'dictionary' }" id="nav-dictionary-tab"
          data-bs-toggle="tab" data-bs-target="#nav-dictionary" type="button" role="tab" aria-controls="nav-dictionary"
          aria-selected="activeTab === 'dictionary'" @click.prevent="setTab('dictionary')"
          style="font-weight: bold; font-size: 1.2rem;">
          부동산 사전
        </button>
        <button class="nav-link" :class="{ active: activeTab === 'chart' }" id="nav-chart-tab" data-bs-toggle="tab"
          data-bs-target="#nav-chart" type="button" role="tab" aria-controls="nav-chart"
          aria-selected="activeTab === 'chart'" @click.prevent="setTab('chart')"
          style="font-weight: bold; font-size: 1.2rem;">
          별별통계
        </button>
      </div>
    </nav>

    <!-- 탭 콘텐츠 -->
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show" :class="{ active: activeTab === 'dictionary' }" id="nav-dictionary"
        role="tabpanel" aria-labelledby="nav-dictionary-tab">
        <div class="dictionary-container">
          <h2 class="title" style="font-size: 1.5rem;">
            <img src="../../assets/img/bookIcon.png" alt="부동산 사전" class="bookIcon" /> 부동산 사전
          </h2>
        </div>
        <!-- 부동산 용어 관련 아코디언 -->
        <div class="accordion-holder">
          <div class="accordion-section">
            <div class="d-flex justify-content-end">
              <input v-model="searchQuery" type="text" placeholder="검색어를 입력하세요" class="search-input" />
            </div>
            <div v-for="(item, index) in paginatedData" :key="index" class="accordion-item">
              <button @click="toggleAccordion(index)" class="accordion-title"
                style="font-weight: 600; font-size:1.1rem;">
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
      <div class="tab-pane fade" :class="{ active: activeTab === 'chart' }" id="nav-chart" role="tabpanel"
        aria-labelledby="nav-chart-tab">
        <div class="dictionary-container">
          <h2 class="title" style="font-size: 1.5rem;">
            <img src="../../assets/img/staticIcon.png" alt="부동산 사전" class="bookIcon" /> 서울시 부동산이 궁금하다면?
          </h2>
        </div>
        <div class="accordion-holder">
          <div class="accordion-section">
            <h4>🔎 지역별 가격 현황</h4>
            <br />
            <div class="second-chart">
              <div class="td-chart">
                <div class="map-container">
                  <svg ref="svgMap" width="100%" height="600"></svg>
                </div>
                <div v-if="!showAllGu" class="return-button">
                  <button type="button" class="btn btn-outline-secondary mb-3" @click="resetToAllGu">되돌리기</button>
                </div>
              </div>
            </div>
            <br /><br />
            <div v-if="selectedDong">
              <h4>🔎 {{ locationStats }}</h4>
              <div class="third-chart">
                <div class="fc-chart">

                  <canvas id="line-chart" style="height: 12rem;"></canvas>
                  <br>
                </div>

                <div class="fc-chart">

                  <canvas id="bar-chart"></canvas>
                  <br>
                </div>


              </div>

              <div class="third-chart">
                <div class="fc-chart">
                  <canvas id="second-line-chart"></canvas>
                  <br>
                </div>

                <div class="fc-chart">
                  <canvas id="bar-chart2"></canvas>
                  <br>
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
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import Pagination from '@/common/components/Pagination.vue';
import Chart from 'chart.js/auto';
import * as d3 from "d3"; // D3.js 라이브러리 import
import seoulSigGeoJson from "@/assets/data/seoul_sig.json"; // 서울시 구 경계 GeoJSON 데이터 import
import seoulDongGeoJson from "@/assets/data/seoul_dong.json"; // 서울시 동 GeoJSON 데이터 import

// 탭 상태 관리
const activeTab = ref('dictionary');
const activeAccordion = ref(null);

const currentPage = ref(1);
const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

const handlePageChange = (page) => {
  currentPage.value = page;
};


// 검색어 상태
const searchQuery = ref('');

// 검색 기능 구현
const filteredData = computed(() => {
  const filtered = dictionaryData.value.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  currentPage.value = 1;
  return filtered;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredData.value.slice(start, end);
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
})

// 아코디언 토글
const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value == index ? null : index;
}

const locationStats = computed(() => {
  return `${adm_gu.value} ${adm_dong.value}의 통계 비교`;
})

// 데이터 (임의로 작성된 질문 및 답변 데이터)
const dictionaryData = ref([
  { question: '매매가란 무엇인가요?', answer: '집이나 땅을 사고팔 때 실제로 거래되는 가격을 말합니다.' },
  { question: '전세는 어떤 방식인가요?', answer: '보증금을 맡기고 일정 기간 동안 집을 빌려 사는 방법입니다. 계약이 끝나면 보증금을 돌려받습니다.' },
  { question: '월세는 무엇인가요?', answer: '매달 일정 금액을 집주인에게 지불하고 집을 빌려 사는 방식입니다.' },
  { question: '계약금이란 무엇인가요?', answer: '집을 사거나 빌릴 때, 계약을 체결할 때 미리 지불하는 돈입니다.' },
  { question: '잔금은 언제 내나요?', answer: '계약금 이후, 남은 금액을 계약 종료 시점에 모두 지불하는 돈입니다.' },
  { question: '부동산 중개사는 어떤 역할을 하나요?', answer: '부동산 거래를 도와주는 전문가로, 매매나 임대 시 중간에서 계약을 돕습니다.' },
  { question: '등기부등본은 왜 필요한가요?', answer: '집이나 땅의 소유권을 확인할 수 있는 공식 서류로, 거래 시 소유자를 확인하는 데 필수적입니다.' },
  { question: '담보 대출이란 무엇인가요?', answer: '집을 담보로 맡기고 돈을 빌리는 대출 방식을 말합니다.' },
  { question: '양도세는 언제 내나요?', answer: '집이나 땅을 팔 때 이익이 발생하면 그 이익에 대해 내는 세금입니다.' },
  { question: '취득세는 무엇인가요?', answer: '집이나 땅을 사면 내야 하는 세금으로, 매매 시 반드시 지불해야 합니다.' },
  { question: '시세란 무엇인가요?', answer: '현재 시장에서 거래되는 가격을 시세라고 합니다.' },
  { question: '공시지가란 무엇인가요?', answer: '정부에서 발표한 땅의 기준 가격으로, 세금을 계산할 때 기준이 됩니다.' },
  { question: '실거래가는 무엇인가요?', answer: '실제로 거래된 금액을 의미하며, 계약서를 근거로 확인할 수 있습니다.' },
  { question: '매도인은 누구인가요?', answer: '집이나 땅을 파는 사람을 매도인이라고 합니다.' },
  { question: '매수인은 누구인가요?', answer: '집이나 땅을 사는 사람을 매수인이라고 합니다.' },
  { question: '중도금이란 무엇인가요?', answer: '계약금과 잔금 사이에 일부 금액을 지불하는 것을 중도금이라고 합니다.' },
  { question: '명도란 무엇인가요?', answer: '부동산을 넘겨줄 때 집을 비워주는 과정을 명도라고 합니다.' },
  { question: '임대인은 누구인가요?', answer: '집이나 땅을 빌려주는 사람을 임대인이라고 합니다.' },
  { question: '임차인은 누구인가요?', answer: '집이나 땅을 빌려 쓰는 사람을 임차인이라고 합니다.' },
  { question: '경매란 무엇인가요?', answer: '법원에서 부동산을 공개적으로 판매하는 절차로, 여러 사람들이 경쟁적으로 입찰합니다.' },
  { question: '대출 한도란 무엇인가요?', answer: '은행에서 빌릴 수 있는 최대 금액을 대출 한도라고 합니다.' },
  { question: '금리란 무엇인가요?', answer: '돈을 빌릴 때 적용되는 이자율로, 대출할 때 추가로 갚아야 할 비용입니다.' },
  { question: 'LTV(Loan To Value)란 무엇인가요?', answer: '집값에 대비해서 대출받을 수 있는 비율을 의미합니다. 예를 들어, 집값의 70%까지 대출이 가능합니다.' },
  { question: 'DTI(Debt To Income)란 무엇인가요?', answer: '소득 대비 부채 비율로, 내가 버는 돈에 비해 얼마만큼의 대출을 받을 수 있는지 결정됩니다.' },
  { question: '대출상환이란 무엇인가요?', answer: '빌린 돈을 갚는 과정을 말하며, 주로 매달 일정 금액을 갚습니다.' },
  { question: '부동산 공인중개사는 어떤 사람인가요?', answer: '국가 자격증을 취득한 부동산 거래 전문가입니다.' },
  { question: '임대차 계약이란 무엇인가요?', answer: '집을 빌리거나 빌려주는 계약으로, 계약서를 작성하는 것이 중요합니다.' },
  { question: '분양이란 무엇인가요?', answer: '새로 지은 집이나 아파트를 구매자에게 판매하는 과정을 분양이라고 합니다.' },
  { question: '입주란 무엇인가요?', answer: '새로 구입하거나 빌린 집에 들어가서 사는 것을 입주라고 합니다.' },
  { question: '관리비란 무엇인가요?', answer: '아파트나 오피스텔 등에서 공동으로 사용하는 공간의 유지비를 관리비라고 합니다.' },
  { question: '주택청약이란 무엇인가요?', answer: '새로 지어질 아파트를 미리 신청하여 당첨되면 구매할 수 있는 절차를 말합니다.' },
  { question: '전입신고란 무엇인가요?', answer: '새로운 집으로 이사한 후 주소지를 변경 신고하는 절차입니다.' },
  { question: '이주비란 무엇인가요?', answer: '재개발이나 재건축을 할 때, 주민들이 임시로 이사할 때 받는 지원금입니다.' },
  { question: '분양권이란 무엇인가요?', answer: '아직 지어지지 않은 아파트나 건물을 미리 살 수 있는 권리를 의미합니다.' },
  { question: '종합부동산세란 무엇인가요?', answer: '고가의 주택이나 여러 부동산을 소유한 사람에게 부과되는 세금을 말합니다.' },
  { question: '재개발이란 무엇인가요?', answer: '낡은 주택이나 건물을 허물고 새로 짓는 과정을 재개발이라고 합니다.' },
  { question: '재건축이란 무엇인가요?', answer: '오래된 아파트나 건물을 새로 짓는 것을 재건축이라고 합니다.' },
  { question: '공동주택이란 무엇인가요?', answer: '여러 세대가 한 건물에 함께 사는 형태의 주택을 공동주택이라고 합니다.' },
  { question: '연립주택이란 무엇인가요?', answer: '여러 가구가 함께 사는 형태의 주택으로, 주로 한 건물에 여러 세대가 살게 됩니다.' },
  { question: '단독주택이란 무엇인가요?', answer: '한 가구가 독립적으로 사는 집을 단독주택이라고 합니다.' },
  { question: '지분이란 무엇인가요?', answer: '부동산 소유권을 나눠서 가지는 것을 지분이라고 합니다.' },
  { question: '보증금이란 무엇인가요?', answer: '임대차 계약 시 임차인이 임대인에게 맡기는 돈입니다. 계약이 끝나면 돌려받습니다.' },
  { question: '환불 보증이란 무엇인가요?', answer: '계약이 파기되거나 문제가 생길 경우, 임차인에게 돌려주는 보증금이나 금액을 의미합니다.' },
  { question: '채권이란 무엇인가요?', answer: '부동산을 담보로 한 법적 권리로, 돈을 빌려준 사람이 부동산을 담보로 돈을 받을 수 있는 권리입니다.' },
  { question: '담보 설정이란 무엇인가요?', answer: '대출 시 집이나 땅을 담보로 설정하는 것을 의미합니다.' },
  { question: '사전청약이란 무엇인가요?', answer: '본격적인 분양 전에 미리 신청하여 추첨을 통해 분양 자격을 받는 절차입니다.' },
  { question: '기한 연장이란 무엇인가요?', answer: '임대차 계약 기간이 끝났을 때, 계약을 더 연장하는 것을 의미합니다.' },
  { question: '중개 수수료란 무엇인가요?', answer: '부동산 거래를 도와준 중개인에게 지급하는 비용을 중개 수수료라고 합니다.' },
  { question: '매매 계약이란 무엇인가요?', answer: '집이나 땅을 사고팔 때 체결하는 계약서를 매매 계약이라고 합니다.' },
]);


let lineChart = null;
let barChart = null;
let secondLineChart = null;
let thirdLineChart = null;

const normalizeDongName = (dongName) => {
  return dongName.replace(/[0-9]동$/, '동'); // "역삼1동"을 "역삼동"으로 변환
};

const processDataByDate = (data, targetDong) => {
  const normalizedDong = normalizeDongName(targetDong);
  const filteredData = data.filter(item => normalizeDongName(item.STDG_NM) === normalizedDong);

  const dailyData = {};

  filteredData.forEach(item => {
    const date = item.CTRT_DAY;
    if (!dailyData[date]) {
      dailyData[date] = {
        detached: { // 단독다가구/연립다세대
          jeonseDepositTotal: 0,
          jeonseCount: 0,
          rentDepositTotal: 0,
          rentTotal: 0,
          rentCount: 0
        },
        officetel: { // 오피스텔
          jeonseDepositTotal: 0,
          jeonseCount: 0,
          rentDepositTotal: 0,
          rentTotal: 0,
          rentCount: 0
        }
      };
    }

    const deposit = parseFloat(item.GRFE);
    const rentAmount = parseFloat(item.RTFE);


    if (item.BLDG_USG === '단독다가구' || item.BLDG_USG === '연립다세대') {
      if (item.RENT_SE === '전세') {
        dailyData[date].detached.jeonseDepositTotal += deposit;
        dailyData[date].detached.jeonseCount += 1;
      } else if (item.RENT_SE === '월세') {
        dailyData[date].detached.rentDepositTotal += deposit;
        dailyData[date].detached.rentTotal += rentAmount;
        dailyData[date].detached.rentCount += 1;
      }
    } else if (item.BLDG_USG === '오피스텔') {
      if (item.RENT_SE === '전세') {
        dailyData[date].officetel.jeonseDepositTotal += deposit;
        dailyData[date].officetel.jeonseCount += 1;
      } else if (item.RENT_SE === '월세') {
        dailyData[date].officetel.rentDepositTotal += deposit;
        dailyData[date].officetel.rentTotal += rentAmount;
        dailyData[date].officetel.rentCount += 1;
      }
    }
  });

  const labels = [];
  const detachedAvgJeonseDeposit = [];
  const detachedAvgRentDeposit = [];
  const detachedAvgRentAmount = [];
  const officetelAvgJeonseDeposit = [];
  const officetelAvgRentDeposit = [];
  const officetelAvgRentAmount = [];


  Object.keys(dailyData).sort().forEach(date => {
    labels.push(date);

    detachedAvgJeonseDeposit.push(dailyData[date].detached.jeonseDepositTotal / dailyData[date].detached.jeonseCount || 0);
    detachedAvgRentDeposit.push(dailyData[date].detached.rentDepositTotal / dailyData[date].detached.rentCount || 0);
    detachedAvgRentAmount.push(dailyData[date].detached.rentTotal / dailyData[date].detached.rentCount || 0);

    officetelAvgJeonseDeposit.push(dailyData[date].officetel.jeonseDepositTotal / dailyData[date].officetel.jeonseCount || 0);
    officetelAvgRentDeposit.push(dailyData[date].officetel.rentDepositTotal / dailyData[date].officetel.rentCount || 0);
    officetelAvgRentAmount.push(dailyData[date].officetel.rentTotal / dailyData[date].officetel.rentCount || 0);
  });

  return {
    labels,
    detachedAvgJeonseDeposit,
    detachedAvgRentDeposit,
    detachedAvgRentAmount,
    officetelAvgJeonseDeposit,
    officetelAvgRentDeposit,
    officetelAvgRentAmount
  };
};



// 월세 보증금 
const drawLineChart = ({ labels, detachedAvgRentDeposit, officetelAvgRentDeposit }) => {
  const canvas = document.getElementById('line-chart');

  if (!canvas) {
    console.error('Canvas element with id "line-chart" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');

  if (lineChart) {
    lineChart.destroy();
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: '단독다가구•연립다세대 평균 월세 보증금',
        data: detachedAvgRentDeposit,
        borderColor: 'rgb(255, 99, 132)', // 빨간색
        tension: 0, // 직선 연결
        fill: false,
      },
      {
        label: '오피스텔 평균 월세 보증금',
        data: officetelAvgRentDeposit,
        borderColor: 'rgb(75, 192, 192)', // 파란색
        tension: 0, // 직선 연결
        fill: false,
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          labels: labels,
          ticks: {
            maxTicksLimit: 10, // 레이블이 많을 때 겹침 방지
          }
        }
      },
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: `${normalizeDongName(adm_dong.value)}의 날짜별 평균 월세 보증금 비교` }
      }
    }
  };

  lineChart = new Chart(ctx, config);
};

const drawJeonseChart = ({ labels, detachedAvgJeonseDeposit, officetelAvgJeonseDeposit }) => {
  const canvas = document.getElementById('second-line-chart');
  if (!canvas) return console.error('Canvas element with id "second-line-chart" not found.');

  const ctx = canvas.getContext('2d');
  if (secondLineChart) secondLineChart.destroy();

  secondLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '단독다가구•연립다세대 평균 전세가',
          data: detachedAvgJeonseDeposit,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
          fill: false,
        },
        {
          label: '오피스텔 평균 전세가',
          data: officetelAvgJeonseDeposit,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          labels: labels,
          ticks: {
            maxTicksLimit: 10,
          }
        }
      },
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: `${normalizeDongName(adm_dong.value)}의 날짜별 평균 전세가 비교` }
      }
    }
  });
};

const fetchData = async () => {
  const url = createApiUrl();
  try {
    const response = await fetch(url);
    const text = await response.text();

    const data = JSON.parse(text).tbLnOpendataRentV.row;
    const dailyData = processDataByDate(data, adm_dong.value);
    const topDongPercentages = calculateTopDongPercentages(data, adm_gu.value);

    drawLineChart(dailyData);
    drawJeonseChart(dailyData);
    drawBarChart(dailyData);
    drawBarChart2(topDongPercentages);

  } catch (error) {
    console.error("API 요청 오류 또는 JSON 파싱 오류:", error);
  }
};

const drawBarChart = ({ labels, detachedAvgRentAmount, officetelAvgRentAmount }) => {
  const canvas = document.getElementById('bar-chart');

  if (!canvas) {
    console.error('Canvas element with id "bar-chart" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');

  if (barChart) {
    barChart.destroy();
  }

  const maxYValue = Math.max(...detachedAvgRentAmount, ...officetelAvgRentAmount) * 1.2;

  barChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '단독다가구•연립다세대 평균 월세가',
          data: detachedAvgRentAmount,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
          fill: false,
        },
        {
          label: '오피스텔 평균 월세가',
          data: officetelAvgRentAmount,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          labels: labels,
          ticks: {
            maxTicksLimit: 10,
          }
        },
        y: {
          beginAtZero: true,
          max: maxYValue || 1000,
          ticks: {
            stepSize: 50,  // 원하는 간격을 설정합니다.
          }
        }
      },
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: `${normalizeDongName(adm_dong.value)}의 날짜별 평균 월세 비교` }
      }
    }
  });
};



// 선택된 구에서 상위 4개와 기타 동의 거래 건수 비율을 계산하는 함수
const calculateTopDongPercentages = (data, targetGu) => {
  // 선택된 구 기준으로 데이터 필터링
  const filteredData = data.filter(item => item.CGG_NM === targetGu);

  // 각 동의 거래 수 계산
  const dongCounts = filteredData.reduce((acc, item) => {
    const dong = item.STDG_NM;
    acc[dong] = (acc[dong] || 0) + 1;
    return acc;
  }, {});

  // 거래 수에 따라 정렬하고 상위 4개 동과 기타로 분류
  const sortedDongs = Object.entries(dongCounts).sort((a, b) => b[1] - a[1]);
  const topDongs = sortedDongs.slice(0, 4);
  const otherCount = sortedDongs.slice(4).reduce((acc, [, count]) => acc + count, 0);

  // 총 거래 건수로 비율 계산
  const totalTransactions = sortedDongs.reduce((acc, [, count]) => acc + count, 0);

  const percentages = topDongs.map(([dong, count]) => ({
    dong,
    percentage: (count / totalTransactions) * 100
  }));

  if (otherCount > 0) {
    percentages.push({
      dong: '기타',
      percentage: (otherCount / totalTransactions) * 100
    });
  }

  return percentages;
};

// 차트를 그리는 함수 (새로운 바 차트)
const drawBarChart2 = (dongPercentages) => {
  const canvas = document.getElementById('bar-chart2');

  if (!canvas) {
    console.error('Canvas element with id "bar-chart2" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');

  // 기존 차트가 있다면 파괴
  if (window.barChart2) {
    window.barChart2.destroy();
  }

  const labels = dongPercentages.map(d => d.dong);
  const data = dongPercentages.map(d => d.percentage);

  // 동별 고유 색상을 할당
  const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(54, 162, 235, 0.2)'
  ];
  const borderColors = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(201, 203, 207, 1)',
    'rgba(54, 162, 235, 1)'
  ];

  // colors 배열의 개수를 동 개수에 맞춰 동적으로 반복
  const backgroundColors = data.map((_, index) => colors[index % colors.length]);
  const borderColorArray = data.map((_, index) => borderColors[index % borderColors.length]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '거래량 (%)',
        data: data,
        backgroundColor: backgroundColors, // 동별 배경색
        borderColor: borderColorArray, // 동별 경계선 색
        borderWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${adm_gu.value} 동별 거래량 (%) - 상위 4개 및 기타`
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  };

  // 차트 생성
  window.barChart2 = new Chart(ctx, config);
};



// 탭 전환 시 필터 초기화 및 탭 변경 처리
const setTab = (tab) => {
  activeTab.value = tab;
  if (tab === 'chart') {
    drawSeoulMap();
    // drawLineChart(); // We'll handle chart drawing via watch
  }
};

const svgMap = ref(null); // SVG 요소를 참조하는 ref
const selectedGu = ref(null); // 사용자가 선택한 구
const showAllGu = ref(true);  // true면 모든 구를 보여주고, false면 선택한 구의 동들을 보여줌
const selectedDong = ref(false);

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
    .attr("fill", "#F2ECF9") // 구역 채우기 색상
    .attr("stroke", "black")   // 경계선 색상
    .attr("stroke-width", 1)
    // 마우스 호버 이벤트 추가
    .on("mouseover", function () {
      d3.select(this).attr("fill", "#9D7AC3"); // 마우스 오버 시 색상 변경
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#F2ECF9"); // 마우스 아웃 시 원래 색상으로 돌아옴
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
    .attr("y", d => projection(d3.geoCentroid(d))[1] + 10) // 구역 중심 Y 좌표
    .attr("text-anchor", "middle") // 텍스트 중앙 정렬
    .attr("font-size", "12px") // 텍스트 크기
    .attr("font-weight", "bold")
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
    .attr("fill", "#F2ECF9") // 구역 채우기 색상
    .attr("stroke", "black")   // 경계선 색상
    .attr("stroke-width", 1)
    // 마우스 호버 이벤트 추가
    .on("mouseover", function () {
      d3.select(this).attr("fill", "#9D7AC3"); // 마우스 오버 시 색상 변경
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#F2ECF9"); // 마우스 아웃 시 원래 색상으로 돌아옴
    })

    // 클릭 이벤트 추가
    .on("click", (event, d) => {
      const [si, gu, dong] = (d.properties.adm_nm).split(" ");

      adm_si.value = si;
      adm_gu.value = gu;
      adm_dong.value = dong;

      selectedDong.value = true;

      console.log(`시: ${adm_si.value}, 구: ${adm_gu.value}, 동: ${adm_dong.value}`)
      alert(`${d.properties.adm_nm} 클릭됨`);

      fetchData();
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

const adm_si = ref(null);
const adm_gu = ref(null);
const adm_dong = ref(null);

const createApiUrl = (dongName) => {
  const API_KEY = '71434f686774617933387952755651';
  const START_INDEX = 1;
  const END_INDEX = 1000;
  const TYPE = 'json';

  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/${TYPE}/tbLnOpendataRentV/${START_INDEX}/${END_INDEX}/2024/%20/${adm_gu.value}`;
  console.log("API 요청 URL:", url);
  return url;
};


</script>



<style scoped>
@import "../../assets/css/help/easywords.css";

.search-input {
  margin-bottom: 10px;
  padding: 8px 10px 8px 40px;
  width: 40%;
  border: 0px solid #ccc;
  border-radius: 4px;
  background-color: #F5F6F7;
  background-image: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png');
  background-size: 20px;
  background-position: 10px center;
  background-repeat: no-repeat;
}

.search-input::placeholder {
  text-indent: 0;
}

.search-input:focus {
  outline: none;
}


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
