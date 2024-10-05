<template>
  <div class="container border border rounded shadow mt-5 mb-5 pt-5 pb-5">

    <h1 class="h1">매물 정보</h1>

    <!-- 매물정보 - 임대 유형 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center;">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >임대 유형</label>
      </div>
      <div class="col-lg-3 col-sm-5">
        <select class="form-select">
          <option>임대 유형을 선택하세요.</option>
          <option>월세</option>
          <option>전세</option>
        </select>
      </div>
    </div>

    <!-- 매물정보 - 보증금 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >보증금</label>
      </div>
      <input class="form-control" type="number" id="text-input" placeholder="보증금을 입력해주세요.">만원
    </div>

    <!-- 매물정보 - 관리비 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >관리비</label>
      </div>
      <input class="form-control" type="number" id="text-input" placeholder="관리비를 입력해주세요.">만원
    </div>

    <!-- 매물정보 - 해당층/전체층 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >해당층/전체층</label>
      </div>
      <input class="form-control" type="number" id="text-input" placeholder="해당층을 입력해주세요.">층
      <input class="form-control" type="number" id="text-input" placeholder="전체층을 입력해주세요." style="margin-left:20px;">층
    </div>

    <!-- 매물정보 - 방 구조 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center;">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >방 구조</label>
      </div>
      <div class="col-lg-3 col-sm-5">
        <select class="form-select">
          <option>방 구조를 선택하세요.</option>
          <option>원룸(오픈형)</option>
          <option>원룸(분리형)</option>
          <option>복층 원룸</option>
          <option>오피스텔 (원룸형)</option>
        </select>
      </div>
    </div>

    <!-- 매물정보 - 방 수/욕실 수 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >방 수/욕실 수</label>
      </div>
      <input class="form-control" type="number" id="text-input" placeholder="방 개수를 입력해주세요.">개
      <input class="form-control" type="number" id="text-input" placeholder="욕실 개수를 입력해주세요." style="margin-left:20px;">개
    </div>

    <!-- 매물정보 - 면적 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >면적</label>
      </div>
      <input class="form-control" type="number" id="text-input" placeholder="전용 평수를 입력해주세요.">평
      <input class="form-control" type="number" id="text-input" placeholder="공급 평수를 입력해주세요." style="margin-left:20px;">평
    </div>

    <!-- 매물정보 - 주실 방향 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center;">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >주실 방향</label>
      </div>
      <div class="col-lg-3 col-sm-5">
        <select class="form-select">
          <option>주실 방향을 입력하세요.(안방 기준)</option>
          <option>동향</option>
          <option>서향</option>
          <option>남향</option>
          <option>북향</option>
        </select>
      </div>
    </div>
    
    <!-- 매물정보 - 최소계약기간 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >최소계약기간</label>
      </div>
      <input class="form-control" type="number" id="text-input" placeholder="최소계약기간을 입력해주세요.">개월
    </div>
    
    <!-- 매물정보 - 입주가능일 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >입주가능일</label>
      </div>
      <input class="form-control" type="text" id="text-input" placeholder="입주가능일을 입력해주세요.">
    </div>

    <!-- 매물정보 - 주차 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >주차</label>
      </div>
      <button type="button" class="btn btn-sm btn-danger" 
      :style="{backgroundColor: isParkingAvailable ? 'blue': 'gray', color: 'white', borderColor: 'transparent'}"
      @click="toggleParkingStatus">
      {{ isParkingAvailable ? '주차 가능' : '주차 불가능' }}
      </button>

      <input class="form-control" type="text" id="text-input" placeholder="월 주차 금액을 입력해주세요." style="margin-left:15px;"
      :disabled="!isParkingAvailable" v-model="parkingFee">만원
    </div>

    <h1 class="h1">대출</h1>

    <!-- 매물정보 - 대출 종류 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center;">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >대출 종류</label>
      </div>
      <div class="col-lg-3 col-sm-5">
        <select class="form-select">
          <option>대출 종류를 선택하세요.</option>
          <option>HUG 주택도시보증공사 대출</option>
          <option>중소기업취업청년 대출(중기청) 80%</option>
          <option>중소기업취업청년 대출(중기청) 100%</option>
          <option>버팀목 대출</option>
        </select>
      </div>
    </div>

    <h1 class="h1">시설 정보</h1>

    <!-- 매물정보 - 난방시설 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center;">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >난방시설</label>
      </div>
      <div class="col-lg-3 col-sm-5">
        <select class="form-select">
          <option>난방시설 방식을 선택하세요.</option>
          <option>중앙 난방</option>
          <option>개별 난방</option>
          <option>가스 난방</option>
        </select>
      </div>
    </div>

    <!-- 매물정보 - 냉방시설 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center;">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >냉방시설</label>
      </div>
      <div class="col-lg-3 col-sm-5">
        <select class="form-select">
          <option>냉방시설 방식을 선택하세요.</option>
          <option>벽걸이 에어컨</option>
          <option>스탠드형 에어컨</option>
          <option>천장형 에어컨</option>
        </select>
      </div>
    </div>

    <!-- 매물정보 - 생활시설 -->
    <div class="w-100 mb-3 d-flex h-100" style="align-items:center;">
      <div class="h-100 d-flex justify-content-left align-items-center" style="width:13%">
        <label for="text-input" class="d-flex h-100" >생활시설</label>
      </div>
      <div class="d-flex">
        <button
          v-for="(item, index) in items"
          :key="index"
          type="button"
          class="btn btn-sm"
          :class="item.selected ? 'btn-primary' : 'btn-secondary'"
          @click="toggleSelection(item)"
        >
          {{ item.name }}
        </button>
      </div>

    </div>



  </div>


</template>

<style scoped>
h1 {
  margin-top:30px;
  margin-bottom: 20px;
  width:150px;
  height:150px;
}
.form-control {
  width:310px;
  margin-right:10px;
}

label {
  font-size: 1.25rem;
}

button {
  margin-right : 10px;
}
</style>

<script setup>
import { ref } from 'vue';

// 주차 가능 버튼 로직
const isParkingAvailable = ref(true); // 주차 가능 여부 상태
const parkingFee = ref(''); // 주차 요금

// 상태 반전을 위한 함수
const toggleParkingStatus = () => {
  isParkingAvailable.value = !isParkingAvailable.value;

  if (!isParkingAvailable.value) { // 주차 불가능 상태가 되면 input 필드의 내용을 지운다.
    parkingFee.value = '';
  }
};


// 시설 정보 - 생활시설 선택 로직



</script>