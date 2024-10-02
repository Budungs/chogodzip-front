<!-- 방 내놓기 페이지 -->
<template>
    <div class="container">
      <div class="property-info">
        <h1>방내놓기</h1>
        <!-- 매물 정보 -->
        <h2>매물 기초정보</h2>
        <hr />
        <table>
          <tr>
            <th rowspan="2">매물 기초정보<span class="star">*</span></th>
            <td>
              매물명
              <input class="large-input" type="text" placeholder="리스트에 노출되는 매물명은 40자 이내로 작성해 주세요." />
            </td>
          </tr>
          <tr>
            <td>
              매물 유형
              <div class="property-type">
                <button :class="{ active: selectedType === '고시원' }" @click="selectType('고시원')">고시원</button>
                <button :class="{ active: selectedType === '쉐어하우스' }" @click="selectType('쉐어하우스')">쉐어하우스</button>
                <button :class="{ active: selectedType === '자취방' }" @click="selectType('자취방')">자취방</button>
              </div>
            </td>
          </tr>
        </table>
        <br><br>

        <!-- 매물 정보 -->
        <h2>매물 정보</h2>
        <table>
          <tr>
            <th width="250px">임대 유형<span class="star">*</span></th>
            <td>
              <div class="radio-group">
                <label>
                  <input type="radio" name="transactionType" value="전세" checked /> 전세
                </label>
                <label>
                  <input type="radio" name="transactionType" value="월세" /> 월세
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th rowspan="2">층수<span class="star">*</span></th>
          </tr>
          <tr>
            <td class="d-flex w-100">
              <div class="cur-floor me-5">
                해당층
                <input type="number" class="form-control small-input" placeholder="숫자를 입력해주세요." aria-label="Username" aria-describedby="basic-addon1">층
              </div>
              <div class="all-floor">
                전체층
                <input type="number" class="form-control small-input" placeholder="숫자를 입력해주세요." aria-label="Username" aria-describedby="basic-addon1">층
              </div>
              
            </td>
          </tr>
          <!-- 방 정보 -->
          <tr>
            <th rowspan="2">방 정보<span class="star">*</span></th>
          </tr>
          <tr>
            <td>
              <div class="roomType-container">
                <div class="col-xl-2 col-lg-3 col-sm-5">
                  <select class="form-select large-select">
                    <option>방 구조를 선택하세요.</option>
                    <option>원룸(오픈형)</option>
                    <option>원룸(분리형)</option>
                    <option>복층 원룸</option>
                    <option>오피스텔 (원룸형)</option>
                  </select>
                </div>
              </div>
              
            </td>
          </tr>
        </table>

        <!-- 가격 정보 -->
        <div v-show="selectedType === '쉐어하우스'">
          <h2>가격 정보</h2>
          <hr>
          
          <table>
            <tr>
              <th width="250px">거래 종류<span class="star">*</span></th>
              <td>
                <div class="radio-group">
                  <label>
                    <input type="radio" name="transactionType" value="전세" checked /> 전세
                  </label>
                  <label>
                    <input type="radio" name="transactionType" value="월세" /> 월세
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="2">가격 정보<span class="star">*</span></th>
            </tr>
            <tr>
              <td>
                전세 <br>
                <input class="small-input" type="number" placeholder=" " /> 만원
                <span> ~ </span>
                <input class="small-input" type="number" placeholder=" " /> 만원
                <br><br>
                보증금 <br>
                <input class="small-input" type="number" placeholder=" " /> 만원
                <span> ~ </span>
                <input class="small-input" type="number" placeholder=" " /> 만원
              </td>
            </tr>
          </table>
        </div>

    
        <!-- 사진 등록 -->
        <br><br>
        <h2>사진 등록</h2>
        <hr>
        <table>
          <tr>
            <th width="250px">일반 사진<span class="star">*</span></th>
            <td>          
              <button class="add-photo-button" @click="triggerFileInput">+ 사진 추가</button>
              <input type="file" accept="image/*" multiple ref="fileInput" style="display: none;" @change="handleFileUpload" />
            </td>
          </tr>
        </table>
    
        <!-- 태그 -->
        <br><br>
        <h2>태그</h2>
        <hr>
        <table>
          <th width="250px">태그<span class="star">*</span></th>
          <td><input class="large-input" type="text" placeholder="태그를 입력해주세요. #으로 구분하여 입력해주세요."></td>
        </table>
    
        <!-- 매물 등록 버튼 -->
        <br><br>
        <div class="register-button-container">
          <!-- <button class="register-button">매물 등록</button> -->
          <button type="button" class="btn btn-light">등록</button>
        </div>
      </div>
    </div>
  
  </template>
  
    
    <script setup>
      import { ref } from 'vue';

      const selectedType = ref('고시원'); // 기본 선택된 매물 유형

      const selectType = (type) => {
        selectedType.value = type;
        if(type === "고시원") {
          console.log("고시원 선택됨");
        }
        if(type === "쉐어하우스") {
          console.log("쉐어하우스 선택됨");
        }
        if(type === "자취방") {
          console.log("자취방 선택됨");
        }
      };

      const fileInput = ref(null);

      const triggerFileInput = () => {
        fileInput.value.click(); // 파일 입력 클릭 이벤트 트리거
      };

      const handleFileUpload = (event) => {
        const files = event.target.files;
        // 파일 업로드 처리 로직을 여기에 추가
        console.log(files); // 선택한 파일을 콘솔에 출력 (예시)
      };
    </script>
    
    <style scoped>
    .property-info {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    
    h2 {
      margin: 10px 0; /* 제목과 줄 간격 조정 */
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: left;
    }
    
    h1 {
      text-align: center;
    }
    
    .property-type {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .address-search {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    
    .input-group {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    
    .input-with-margin {
      margin-top: 10px; /* 한 줄 간격 추가 */
      display: flex;
      gap: 10px;
    }
    
    .subway-info {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    
    .number-input {
      display: flex;
      align-items: center;
    }
    
    .large-input {
      width: 400px;
    }
    .small-input {
      width: 100px;
    }
    
    span.unit {
      margin-left: 7px; /* 개와 입력란 사이 간격 */
    }
    .star { /* 필수 입력을 위한 * 표시  */
      color:#a28cd1;
    }
  
    .radio-group { 
      display: flex;
      gap: 20px; /* 라디오 버튼 간격 조정 */
      margin-top: 10px; /* 상단 여백 추가 */
    }
  
    /* 매물 등록 버튼 */
    /* .register-button {
      background-color:#a28cd1;
      color: white;
      width: 200px;
      height: 70px;
    } */
    .register-button:hover {
      background-color:#dfcef7;
    }
    .register-button-container {
      display: flex; /* Flexbox 활성화 */
      justify-content: center; /* 수평 가운데 정렬 */
    }
  
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #e0e0e0;
    }
    
    button.active {
      background-color: #a28cd1; /* 강조된 색상 */
      color: white;
    }
    
    .cur-floor, .all-floor {
      display: flex;
      align-items: center;
      gap: 5px; /* 해당층/전체층 텍스트와 input 간의 간격 */
    }

    .roomType-container {
      display:flex;
    }
    .form-select {
      min-width: 220px; /* 최소 너비를 텍스트 크기에 맞게 설정 */
    }
    </style>