<template>
  <div class="container">
    <div class="map-container">
      <svg ref="svgMap" width="100%" height="600"></svg>
    </div>
    <div v-if="!showAllGu" class="return-button">
      <button @click="resetToAllGu">되돌리기</button>
    </div>
  </div>
</template>

<script setup>
import * as d3 from "d3"; // D3.js 라이브러리 import
import { ref, onMounted } from "vue";
import seoulSigGeoJson from "@/assets/data/seoul_sig.json"; // 서울시 구 경계 GeoJSON 데이터 import
import seoulDongGeoJson from "@/assets/data/seoul_dong.json"; // 서울시 동 GeoJSON 데이터 import

const svgMap = ref(null); // SVG 요소를 참조하는 ref
const selectedGu = ref(null); // 사용자가 선택한 구
const showAllGu = ref(true);  // true면 모든 구를 보여주고, false면 선택한 구의 동들을 보여줌

// 구 경계를 그리는 함수
const drawGuMap = () => {
  const width = 800;
  const height = 600;

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
  const width = 800;
  const height = 600;

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
    .attr("font-size", "8px") // 글자 크기
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
.container {
  text-align: center;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

svg {
  width: 100%;
  height: 100%;
}

.return-button {
  margin-top: 10px;
}
</style>
