<template>
    <div class="container">
      <!-- SVG로 선택된 구만 그리기 -->
      <div class="map-container">
        <svg ref="svgMap" width="100%" height="600"></svg>
      </div>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3"; // D3.js 라이브러리 import
  import seoulDongGeoJson from "@/assets/data/seoul_dong.json"; // 서울시 동 GeoJSON 데이터 import
  
  export default {
    name: "SeoulMap",
    data() {
      return {
        selectedGu: "강남구", // 기본으로 필터링할 구 설정 (필요에 따라 변경 가능)
      };
    },
    mounted() {
      this.drawGuMap();
    },
    methods: {
      drawGuMap() {
        const width = 800;
        const height = 600;
  
        // 선택된 구 데이터만 필터링
        const guData = seoulDongGeoJson.features.filter(
          feature => feature.properties.adm_nm.includes(this.selectedGu) // 선택된 구 필터링
        );
  
        // SVG 요소 선택
        const svg = d3.select(this.$refs.svgMap)
          .attr("width", width)
          .attr("height", height);
  
        // D3 Projection 설정 (메르카토르 투영법 사용)
        const projection = d3.geoMercator();
  
        // 경로 생성기 (Path Generator)
        const path = d3.geoPath().projection(projection);
  
        // 선택된 동만 화면에 맞춰 확대/중앙 배치
        projection.fitSize([width, height], {
          type: "FeatureCollection",
          features: guData
        });
  
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
            alert(`${d.properties.adm_nm} 클릭됨`); // 구 이름 클릭 시 알림
          });
  
        // 선택된 구의 동 이름 텍스트 추가 (구 이름만 표시)
        svg.selectAll("text")
          .data(guData)
          .enter()
          .append("text")
          .attr("x", d => projection(d3.geoCentroid(d))[0]) // 각 구역의 중심 X 좌표
          .attr("y", d => projection(d3.geoCentroid(d))[1]) // 각 구역의 중심 Y 좌표
          .attr("text-anchor", "middle") // 텍스트 정렬 중앙으로
          .attr("font-size", "8px") // 글자 크기
          .attr("fill", "black") // 텍스트 색상
          .text(d => d.properties.adm_nm.replace(`서울특별시 ${this.selectedGu} `, "")); // 동 이름만 표시 (서울특별시와 구 이름 제외)
      }
    }
  };
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 600px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  </style>
  