<template>
    <div class="container">
      <div class="property-info">
        <h1>방내놓기</h1>
        <!-- 매물 정보 -->
        <h2>매물 정보</h2>
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
                <button :class="{ active: selectedType === '공유주택' }" @click="selectType('공유주택')">공유주택</button>
                <button :class="{ active: selectedType === '원룸' }" @click="selectType('원룸')">원룸</button>
                <button :class="{ active: selectedType === '빌라/투룸' }" @click="selectType('빌라/투룸')">빌라/투룸</button>
                <button :class="{ active: selectedType === '오피스텔' }" @click="selectType('오피스텔')">오피스텔</button>
              </div>
            </td>
          </tr>
          <tr>
            <th rowspan="3">매물 주소<span class="star">*</span></th>
          </tr>
          <tr>
            <td>
              주소 검색
              <div class="address-search">
                <input class="large-input" type="text" placeholder="예) 반동 10-1, 강북구 번동" />
                <button>검색</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="input-group">
                <label>동 입력</label>
                <div class="input-with-margin">
                  <input class="small-input" type="text" placeholder="예) 101" /> 동
                  <input class="small-input" type="text" placeholder="예) 101" /> 호
                </div>
              </div>
              <div>
                <input type="checkbox" id="check" />
                <label for="check">등기부등본 상에 ‘동’ 정보가 없을 경우 체크</label>
              </div>
            </td>
          </tr>
          <tr>
            <th>주변 정보</th>
            <td>
              <div class="subway-info">
                <input class="large-input" type="text" placeholder="주변 지하철역을 입력해 주세요." />
                <button>검색</button>
              </div>
            </td>
          </tr>
          <tr>
            <th>방 정보</th>
            <td>
              <div class="input-group">
                <label>방 수</label>
                <div class="number-input">
                  <input class="small-input" type="number" min="0" placeholder=" " />
                  <span class="unit">개</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
    
        <br><br>
        <!-- 가격 정보 -->
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
          <button type="button" class="btn btn-light">Info</button>
        </div>
      </div>
    </div>
  
  </template>
  
    
    <script>
    export default {
      data() {
        return {
          selectedType: '쉐어하우스' // 기본 선택된 매물 유형
        };
      },
      methods: {
        selectType(type) {
          this.selectedType = type;
        },
        triggerFileInput() {
        this.$refs.fileInput.click(); // 파일 입력 클릭 이벤트 트리거
        },
        handleFileUpload(event) {
          const files = event.target.files;
          // 파일 업로드 처리 로직을 여기에 추가
          console.log(files); // 선택한 파일을 콘솔에 출력 (예시)
        }
      }
    }
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
  
    </style>