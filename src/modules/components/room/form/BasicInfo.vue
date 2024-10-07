<template>
    <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
        <h2 class="h4 mb-4"><i class="fas fa-info-circle text-primary fs-5 mt-n1 me-2" />이용 정보를 입력해주세요.</h2>
        <div class="row"  @input="store.checkBasicInfo">

            <!-- 제목 & 주소-->
            <NameAddressInput />

            <!-- 자취방: 임대 유형 -->
            <div v-if="category === 'jachiroom'" class="col-sm-6 mb-3 w-100">
                <div class="form-label pt-3 pb-2 fw-bold">임대 유형<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="type-monthly" name="r-rent-type" value="monthly" v-model="store.basicInfo.jachi.rentType">
                        <label class="form-check-label" for="type-monthly">월세</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="type-jeonse" name="r-rent-type" value="jeonse" v-model="store.basicInfo.jachi.rentType">
                        <label class="form-check-label" for="type-jeonse">전세</label>
                    </div>
                </div>
            </div>

            <!-- 공유주거: 타입 -->
            <div v-if="category === 'sharehouse'"  class="col-sm-6 mb-3 w-100">
                <div class="form-label pt-3 pb-2 fw-bold">주거 타입<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="co-housing" name="r-share-type" v-model="store.basicInfo.shared.shareType" value="co-housing">
                        <label class="form-check-label" for="co-housing">공유 주택</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="shared-house" name="r-share-type" v-model="store.basicInfo.shared.shareType" value="shared-house">
                        <label class="form-check-label" for="shared-house">쉐어하우스</label>
                    </div>
                </div>
            </div>

            <!-- 계약금 -->
            <PriceInput />

            <!-- 자취방: 입주가능일 -->
            <label v-if="category === 'jachiroom'" class="form-label fw-bold">입주가능일<span class="text-danger">*</span></label>
            <div v-if="category === 'jachiroom'" class="input-group">
              <input class="form-control rounded pe-5" type="date" placeholder="입주가능일을 선택하세요" 
                v-model="store.basicInfo.jachi.moveIn.moveInDate" :disabled="store.basicInfo.jachi.moveIn.canMoveInNow"/>
            </div>
            <div v-if="category === 'jachiroom'" class="form-check d-flex justify-content-end pt-2 fs-sm mb-3">
              <input class="form-check-input" type="checkbox" id="no-deposit" name="no-deposit-fee" 
                v-model="store.basicInfo.jachi.moveIn.canMoveInNow">
              <label class="form-check-label px-2" for="no-deposit-fee">즉시 입주 가능(협의 가능)</label>
            </div>

            <!-- 자취방: 최소 계약 기간 -->
            <label v-if="category === 'jachiroom'" class="form-label fw-bold" for="r-min-period">최소 계약 기간<span class="text-danger">*</span></label>
            <div v-if="category === 'jachiroom'" class="input-group mb-5">
                <input class="form-control range-slider-value-max" type="number" v-model="store.basicInfo.jachi.minContractPeriod">
                <span class="input-group-text fs-base">개월</span>
            </div>
          
            <!-- 자취방: 방 종류 -->
            <div v-if="category === 'jachiroom'" class="mb-4">
              <label class="form-label fw-bold" for="r-type">방 종류<span class="text-danger">*</span></label>
              <select class="form-select" id="r-type" v-model="store.basicInfo.jachi.room.type">
                <option value="" disabled hidden>방 종류를 선택하세요</option>
                <option value="oneRoom">원룸</option>
                <option value="twoRoomOrBilla">투룸/빌라</option>
                <option value="Officetel">오피스텔</option>
              </select>
            </div>

            <!-- 자취방: 방 구조 -->
            <div v-if="category === 'jachiroom'" class="mb-4">
              <label class="form-label fw-bold" for="r-structure">방 구조<span class="text-danger">*</span></label>
              <select class="form-select" id="r-structure" v-model="store.basicInfo.jachi.room.structure" >
                <option value="" disabled hidden>방 구조를 선택하세요</option>
                <option value="oneOpend">원룸(오픈형)</option>
                <option value="oneSeparated">원룸(분리형)</option>
                <option value="oneLoft">원룸(복층형)</option>
                <option value="twoRoom">투룸</option>
                <option value="twoPlus">투룸 이상</option>
              </select>
            </div>

            <!-- 자취방: 방 수 / 욕실 수 -->
            <div v-if="category === 'jachiroom'" class="row mb-2">
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="r-count">방 개수<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="r-count" min="1" placeholder="방 개수를 입력하세요" 
                    v-model="store.basicInfo.jachi.room.count" >
                </div>
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="r-toilet-count">욕실 개수<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="r-toilet-count" min="1" placeholder="욕실 개수를 입력하세요" 
                    v-model="store.basicInfo.jachi.room.toiletCount" >
                </div>
            </div>

            <!-- 자취방: 해당 층 / 전체 층 -->
            <div v-if="category === 'jachiroom'" class="row">
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="r-this-floor">해당 층<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="r-this-floor" min="-1" placeholder="매물이 위치한 층을 입력하세요(지하: -1)" 
                    v-model="store.basicInfo.jachi.room.thisFloor" >
                </div>
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="r-total-floor">건물 전체 층 수<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="r-total-floor" min="-1" placeholder="건물 전체 층 수를 입력하세요(지하: -1)" 
                    v-model="store.basicInfo.jachi.room.totalFloor" >
                </div>
            </div>

            <!-- 자취방: 전용 면적 / 공급 면적 -->
            <div v-if="category === 'jachiroom'" class="form-label pt-1 pb-1 fw-bold">면적<span class="text-danger">*</span></div>
            <div v-if="category === 'jachiroom'" class="d-flex align-items-center pb-4">
                <div class="w-50 pe-2">
                    <label for="supply-area">공급 면적</label>
                    <div class="input-group">
                        <input class="form-control range-slider-value-min" id="r-total-area" type="number" v-model="store.basicInfo.jachi.room.totalArea">
                        <span class="input-group-text fs-base">m²</span>
                    </div>
                </div>
                <div class="w-50 ps-2">
                  <label for="use-area">전용 면적</label>
                    <div class="input-group">
                        <input class="form-control range-slider-value-max" id="r-private-area" type="number" v-model="store.basicInfo.jachi.room.privateArea">
                        <span class="input-group-text fs-base">m²</span>
                    </div>
                </div>
            </div>

            <!-- 자취방: 주실 방향 -->
            <div v-if="category === 'jachiroom'" class="mb-3 mb-5">
              <label class="form-label fw-bold" for="r-direction">주실 방향<span class="text-danger">*</span></label>
              <select class="form-select" id="r-direction" v-model="store.basicInfo.jachi.direction" >
                <option value="" disabled hidden>주실 방향을 선택하세요</option>
                <option value="south">남향</option>
                <option value="north">북향</option>
                <option value="east">동향</option>
                <option value="west">서향</option>
              </select>
            </div>

            
            <!-- 고시원 & 공유주거: 최소 계약 기간 -->
            <div v-if="category === 'gosiwon' || category === 'sharehouse'" class="col-sm-6 mb-4 w-100">
              <div class="form-label pt-3 pb-2 fw-bold">최소 계약 기간<span class="text-danger">*</span></div>
              <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="r-min-period" v-model="store.basicInfo.shared.minContractPeriod" value="1">
                        <label class="form-check-label" for="period-one">1개월</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-two" name="r-min-period" v-model="store.basicInfo.shared.minContractPeriod" value="2">
                        <label class="form-check-label" for="period-two">2개월</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-three" name="r-min-period" v-model="store.basicInfo.shared.minContractPeriod" value="3">
                        <label class="form-check-label" for="period-three">3개월</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-four" name="r-min-period" v-model="store.basicInfo.shared.minContractPeriod" value="4">
                        <label class="form-check-label" for="period-four">4개월 이상</label>
                    </div>
              </div>
            </div>

            <!-- 고시원 & 공유: 이용 가능 연령 -->
            <div v-if="category !== 'jachiroom'" class="mb-1">
                <div>
                    <label class="form-label fw-bold" for="r-min-age">이용 가능 연령<span class="text-danger">*</span></label>
                    <input class="form-control" type="number" id="r-min-age" min="20" v-model="store.basicInfo.shared.age.ageLimit" value="20" :disabled="store.basicInfo.shared.age.isNoAgeLimit">
                    <div class="form-check d-flex justify-content-end pt-2 fs-sm">
                        <input class="form-check-input" type="checkbox" id="no-age-limit" name="no-age-limit" v-model="store.basicInfo.shared.age.isNoAgeLimit">
                        <label class="form-check-label px-2" for="no-age-limit">연령 제한 없음</label>
                    </div>
                </div>
            </div>

            <!-- 고시원 + 공유주거: 남녀 구분 -->
            <div v-if="category !== 'jachiroom'" class="col-sm-6 mb-4 w-100 ">
                <div class="form-label pt-3 pb-2 fw-bold">성별구분<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="no-limit" name="r-gender" v-model="store.basicInfo.shared.genderLimit" value="no-limit">
                        <label class="form-check-label" for="no-limit">구분 없음</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="separated" name="r-gender" v-model="store.basicInfo.shared.genderLimit" value="separated">
                        <label class="form-check-label" for="separated">남녀 분리</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="f-only" name="r-gender" v-model="store.basicInfo.shared.genderLimit" value="f-only">
                        <label class="form-check-label" for="f-only">여성 전용</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="m-only" name="r-gender" v-model="store.basicInfo.shared.genderLimit" value="m-only">
                        <label class="form-check-label" for="m-only">남성 전용</label>
                    </div>
                </div>
            </div>

            <!-- 공유주거: 방 종류 -->
            <div v-if="category === 'sharehouse'" class="col-sm-6 mb-5 w-100 ">
              <div class="form-label pt-3 pb-2 fw-bold">방 개수<span class="text-danger">*</span></div>
              <div class="mb-3 d-flex gap-1">
                  <div class="col-lg-6">
                      <label class="form-label" for="r-single-count">1인실</label>
                      <input class="form-control" type="number" id="r-single-count" min="0" value="0" v-model="store.basicInfo.shared.singleRoomCount" >
                  </div>
                  <div class="col-lg-6">
                      <label class="form-label" for="r-twin-count">2인실</label>
                      <input class="form-control" type="number" id="r-twin-count" min="0" value="0" v-model="store.basicInfo.shared.twinRoomCount" >
                  </div>
              </div>
            </div>


            <!-- 공통 영역 -->
            <!-- 개인시설 -->
            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">개인 시설</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="private-toilet" v-model="store.basicInfo.privateFacilities.priToilet">
                      <label class="form-check-label" for="private-toilet">개인화장실</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="private-shower" v-model="store.basicInfo.privateFacilities.priShower">
                      <label class="form-check-label" for="private-shower">개인샤워실</label>
                    </div>
                  </div>
                </div>
            </div>

            <!-- 제공 서비스 -->
            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">제공 서비스</label>
                <div class="row">

                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="security-com" v-model="store.basicInfo.services.securityCom">
                      <label class="form-check-label" for="security-com">경비업체</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="clean-com" v-model="store.basicInfo.services.cleanCom">
                      <label class="form-check-label" for="clean-com">청소업체</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="disinfect-com" v-model="store.basicInfo.services.disinfectCom">
                      <label class="form-check-label" for="disinfect-com">방역업체</label>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="cash-receipt" v-model="store.basicInfo.services.cashReceipt">
                      <label class="form-check-label" for="cash-receipt">현금영수증</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="creditCard" v-model="store.basicInfo.services.creditCard">
                      <label class="form-check-label" for="creditCard">신용카드</label>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="welcome-box" v-model="store.basicInfo.services.welcomeBox">
                      <label class="form-check-label" for="welcome-box">웰컴박스</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="free-meal" v-model="store.basicInfo.services.freeMeal">
                      <label class="form-check-label" for="free-meal">식사제공</label>
                    </div>
                  </div>
                </div>
            </div>

            <!-- 외국어 응대 -->
            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">외국어 응대</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="speak-eng" v-model="store.basicInfo.languages.eng">
                      <label class="form-check-label" for="speak-eng">영어</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="speak-chn" v-model="store.basicInfo.languages.chn">
                      <label class="form-check-label" for="speak-chn">중국어</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="speak-jpn" v-model="store.basicInfo.languages.jpn">
                      <label class="form-check-label" for="speak-jpn">일본어</label>
                    </div>
                  </div>
                </div>
            </div>

            <!-- 기타 사항 -->
            <div class="mb-5">
                <label class="form-label d-block fw-bold mb-2 pb-1">기타 사항</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-move-in" v-model="store.basicInfo.etc.allowMoveIn">
                      <label class="form-check-label" for="allow-move-in">주소이전</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-foreigner" v-model="store.basicInfo.etc.allowForeigner">
                      <label class="form-check-label" for="allow-foreigner">외국인 가능</label>
                    </div>
                  </div>
                  <!-- 자취방: 반려동물 -->
                  <div v-if="category === 'jachiroom'" class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-pet" v-model="store.basicInfo.etc.allowPet">
                      <label class="form-check-label" for="allow-pet">반려동물 가능</label>
                    </div>
                  </div>
                </div>
            </div>


            <!-- 상세 사항 -->
            <div class="mb-4">
              <label class="form-label fw-bold" for="r-description">상세 설명<span class="text-danger">*</span></label>
              <textarea class="form-control" id="r-description" rows="5" placeholder="매물에 대한 상세 정보를 입력하세요" v-model="store.basicInfo.desc"></textarea>
            </div>

            <!-- 사진 첨부 -->
            <div class="mb-4">
              <label class="form-label fw-bold" for="r-pics">사진 첨부<span class="text-danger">*</span></label>
              <input class="file-uploader file-uploader-grid mx-3" id="r-pics" type="file" multiple data-max-files="4" >
              <p class="fs-sm">사진은 30MB 용량 이하에서 여러 장 첨부 가능합니다.</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import PriceInput from './PriceInput.vue';
import NameAddressInput from './NameAddressInput.vue';

import { usePostRoomStore } from '@/modules/stores/postRoom';
const store = usePostRoomStore();
const category = computed(() => store.category);
</script>