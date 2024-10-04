<template>
    <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
        <h2 class="h4 mb-4"><i class="fas fa-info-circle text-primary fs-5 mt-n1 me-2" />이용 정보를 입력해주세요.</h2>
        <div class="row">

            <!-- 제목 & 주소-->
            <NameAddressInput />

            <!-- 자취방: 임대 유형 -->
            <div v-if="category === 'jachiroom'" class="col-sm-6 mb-3 w-100">
                <div class="form-label pt-3 pb-2 fw-bold">임대 유형<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="type-monthly" name="ap-business-type" value="monthly" v-model="rentalType">
                        <label class="form-check-label" for="type-monthly">월세</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="type-jeonse" name="ap-business-type" value="jeonse" v-model="rentalType">
                        <label class="form-check-label" for="type-jeonse">전세</label>
                    </div>
                </div>
            </div>

            <!-- 공유주거 - 쉐어하우스: 주거 타입 -->
            <div v-if="category === 'sharehouse'"  class="col-sm-6 mb-3 w-100">
                <div class="form-label pt-3 pb-2 fw-bold">주거 타입<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">공유 주택</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-two" name="ap-business-type">
                        <label class="form-check-label" for="period-two">쉐어하우스</label>
                    </div>
                </div>
            </div>

            <!-- 고시원 & 공유주거: 계약 최소 기간 -->
            <div v-if="category === 'gosiwon' || category === 'sharehouse'" class="col-sm-6 mb-3 w-100">
              <div class="form-label pt-3 pb-2 fw-bold">계약 최소 기간<span class="text-danger">*</span></div>
              <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">1개월</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-two" name="ap-business-type">
                        <label class="form-check-label" for="period-two">2개월</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-three" name="ap-business-type">
                        <label class="form-check-label" for="period-three">3개월</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-four" name="ap-business-type">
                        <label class="form-check-label" for="period-four">4개월 이상</label>
                    </div>
              </div>
            </div>

            <!-- 계약금 -->
            <PriceInput :rentalType="rentalType" :category="category" />

            <!-- 자취방: 최소 계약 기간 -->
            <label v-if="category === 'jachiroom'" class="form-label fw-bold" for="ap-category">최소 계약 기간<span class="text-danger">*</span></label>
            <div v-if="category === 'jachiroom'" class="input-group mb-3">
                <input class="form-control range-slider-value-max" type="number" required>
                <span class="input-group-text fs-base">개월</span>
            </div>

            <!-- 고시원 & 공유: 이용 가능 연령 -->
            <div v-if="category !== 'jachiroom'" class="mb-3">
                <div class="mb-4">
                    <label class="form-label fw-bold" for="ap-area">이용 가능 연령<span class="text-danger">*</span></label>
                    <input class="form-control" type="number" id="ap-area" min="20" placeholder="Enter your area" value="20" required :disabled="isNoLimitAge">
                    <div class="form-check d-flex justify-content-end pt-2 fs-sm">
                        <input class="form-check-input" type="checkbox" id="no-age-limit" name="no-age-limit" v-model="isNoLimitAge">
                        <label class="form-check-label px-2" for="no-age-limit">연령 제한 없음</label>
                    </div>
                </div>
            </div>
          
            <!-- 자취방: 해당 층 / 전체 층 -->
            <div v-if="category === 'jachiroom'" class="row">
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="ap-category">해당 층<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="ap-area" min="-1" placeholder="매물이 위치한 층을 입력하세요" required>
                </div>
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="ap-type">건물 전체 층 수<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="ap-area" min="-1" placeholder="건물 전체 층 수를 입력하세요" required>
                </div>
            </div>

            <!-- 고시원 + 공유주거: 남녀 구분 -->
            <div v-if="category !== 'jachiroom'" class="col-sm-6 mb-5 w-100 ">
                <div class="form-label pt-3 pb-2 fw-bold">성별구분<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">구분 없음</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-two" name="ap-business-type">
                        <label class="form-check-label" for="period-two">남녀 분리</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-three" name="ap-business-type">
                        <label class="form-check-label" for="period-three">여성 전용</label>
                    </div>
                    <div class="form-check col-lg-3">
                        <input class="form-check-input" type="radio" id="period-four" name="ap-business-type">
                        <label class="form-check-label" for="period-four">남성 전용</label>
                    </div>
                </div>
            </div>

            <!-- 자취방: 방 종류 -->
            <div v-if="category === 'jachiroom'" class="mb-3">
              <label class="form-label fw-bold" for="ap-category">방 종류<span class="text-danger">*</span></label>
              <select class="form-select" id="ap-category" required>
                <option value="" disabled hidden>방 종류를 선택하세요</option>
                <option value="Rent">원룸</option>
                <option value="Sell">투룸/빌라</option>
                <option value="Sell">오피스텔</option>
              </select>
            </div>

            <!-- 쉐어하우스: 방 종류 -->
            <div v-if="category === 'sharehouse'" class="col-sm-6 mb-5 w-100 ">
              <div class="form-label pt-3 pb-2 fw-bold">방 개수<span class="text-danger">*</span></div>
              <div class="mb-3 d-flex gap-1">
                  <div class="col-lg-6">
                      <label class="form-label" for="ap-area">1인실</label>
                      <input class="form-control" type="number" id="ap-area" min="0" placeholder="Enter your area" value="0" required>
                  </div>
                  <div class="col-lg-6">
                      <label class="form-label" for="ap-area">2인실</label>
                      <input class="form-control" type="number" id="ap-area" min="0" placeholder="Enter your area" value="0" required>
                  </div>
              </div>
            </div>

            <!-- 자취방: 방 구조 -->
            <div v-if="category === 'jachiroom'" class="mb-3">
              <label class="form-label fw-bold" for="ap-category">방 구조<span class="text-danger">*</span></label>
              <select class="form-select" id="ap-category" required>
                <option value="" disabled hidden>방 구조를 선택하세요</option>
                <option value="Rent">원룸(오픈형)</option>
                <option value="Sell">원룸(분리형)</option>
                <option value="Sell">원룸(복층형)</option>
                <option value="Sell">투룸</option>
                <option value="Sell">투룸 이상</option>
              </select>
            </div>

            <!-- 자취방: 방 수 / 욕실 수 -->
            <div v-if="category === 'jachiroom'" class="row">
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="ap-category">방 개수<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="ap-area" min="1" placeholder="방 개수를 입력하세요" required>
                </div>
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold" for="ap-type">욕실 개수<span class="text-danger">*</span></label>
                  <input class="form-control" type="number" id="ap-area" min="1" placeholder="욕실 개수를 입력하세요" required>
                </div>
            </div>

            <!-- 자취방: 전용 면적 / 공급 면적 -->
            <div v-if="category === 'jachiroom'" class="form-label pt-3 pb-1 fw-bold">면적<span class="text-danger">*</span></div>
            <div v-if="category === 'jachiroom'" class="d-flex align-items-center pb-4">
                <div class="w-50 pe-2">
                    <label for="supply-area">공급 면적</label>
                    <div class="input-group">
                        <input class="form-control range-slider-value-min" id="supply-area" type="text">
                        <span class="input-group-text fs-base">m²</span>
                    </div>
                </div>
                <div class="w-50 ps-2">
                  <label for="use-area">전용 면적</label>
                    <div class="input-group">
                        <input class="form-control range-slider-value-max" id="use-area" type="text">
                        <span class="input-group-text fs-base">m²</span>
                    </div>
                </div>
            </div>

            <!-- 자취방: 주실 방향 -->
            <div v-if="category === 'jachiroom'" class="mb-3">
              <label class="form-label fw-bold" for="ap-category">주실 방향<span class="text-danger">*</span></label>
              <select class="form-select" id="ap-category" required>
                <option value="" disabled hidden>주실 방향을 선택하세요</option>
                <option value="Rent">남향</option>
                <option value="Sell">북향</option>
                <option value="Sell">동향</option>
                <option value="Sell">서향</option>
              </select>
            </div>

            <!-- 자취방: 입주가능일 -->
            <label v-if="category === 'jachiroom'" class="form-label fw-bold">입주가능일<span class="text-danger">*</span></label>
            <div v-if="category === 'jachiroom'" class="input-group">
              <input class="form-control rounded pe-5" type="date" placeholder="입주가능일을 선택하세요" :disabled="canMoveInNow"/>
            </div>
            <div v-if="category === 'jachiroom'" class="form-check d-flex justify-content-end pt-2 fs-sm">
              <input class="form-check-input" type="checkbox" id="no-deposit" name="no-deposit-fee" v-model="canMoveInNow">
              <label class="form-check-label px-2" for="no-deposit-fee">즉시 입주 가능(협의 가능)</label>
            </div>




            <!-- 개인시설 -->
            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">개인 시설</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-cats">
                      <label class="form-check-label" for="allow-cats">개인화장실</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-dogs">
                      <label class="form-check-label" for="allow-dogs">개인샤워실</label>
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
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">경비업체</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="air-condition">
                      <label class="form-check-label" for="air-condition">청소업체</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="balcony">
                      <label class="form-check-label" for="balcony">방역업체</label>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="pets-friendly">
                      <label class="form-check-label" for="pets-friendly">현금영수증</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="pool">
                      <label class="form-check-label" for="pool">신용카드</label>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="dishwasher">
                      <label class="form-check-label" for="dishwasher">웰컴박스</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="iron">
                      <label class="form-check-label" for="iron">식사제공</label>
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
                      <input class="form-check-input" type="checkbox" id="allow-cats">
                      <label class="form-check-label" for="allow-cats">영어</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-dogs">
                      <label class="form-check-label" for="allow-dogs">중국어</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-dogs">
                      <label class="form-check-label" for="allow-dogs">일본어</label>
                    </div>
                  </div>
                </div>
            </div>

            <!-- 기타 사항 -->
            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">기타 사항</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-cats">
                      <label class="form-check-label" for="allow-cats">주소이전</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-cats">
                      <label class="form-check-label" for="allow-cats">외국인 가능</label>
                    </div>
                  </div>
                  <!-- 자취방: 반려동물 -->
                  <div v-if="category === 'jachiroom'" class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="allow-cats">
                      <label class="form-check-label" for="allow-cats">반려동물 가능</label>
                    </div>
                  </div>
                </div>
            </div>


            <!-- 상세 사항 -->
            <div class="mb-4">
              <label class="form-label fw-bold" for="ap-description">상세 설명</label>
              <textarea class="form-control" id="ap-description" rows="5" placeholder="매물에 대한 상세 정보를 입력하세요"></textarea>
            </div>

            <!-- 사진 첨부 -->
            <div class="mb-4">
              <label class="form-label fw-bold" for="ap-pics">사진 첨부<span class="text-danger">*</span></label>
              <input class="file-uploader file-uploader-grid mx-3" id="ap-pics" type="file" multiple data-max-files="4" required>
              <p class="fs-sm">사진은 30MB 용량 이하에서 여러 장 첨부 가능합니다.</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import PriceInput from './PriceInput.vue';
import NameAddressInput from './NameAddressInput.vue';

const isNoLimitAge = ref(false);
const rentalType = ref('');
const canMoveInNow = ref(false);

const props = defineProps({
    category: {
        type: String,
        required: true,
    },
})
</script>