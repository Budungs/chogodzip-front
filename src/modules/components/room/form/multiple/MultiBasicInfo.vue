<template>
    <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
        <h2 class="h4 mb-4"><i class="fas fa-tags text-primary fs-5 mt-n1 me-2" />이용 정보를 입력해주세요.</h2>
        <div class="row">

            <!-- 제목 & 주소-->
            <NameAddress />

            <!-- 계약 최소 기간 -->
            <div class="col-sm-6 mb-3 w-100">
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
            <Price />

            <!-- 이용 가능 연령 -->
            <div class="mb-3">
                <div class="mb-4">
                    <label class="form-label fw-bold" for="ap-area">이용 가능 연령<span class="text-danger">*</span></label>
                    <input class="form-control" type="number" id="ap-area" min="20" placeholder="Enter your area" value="20" required :disabled="isNoLimitAge">
                    <div class="form-check d-flex justify-content-end pt-2 fs-sm">
                        <input class="form-check-input" type="checkbox" id="no-age-limit" name="no-age-limit" v-model="isNoLimitAge">
                        <label class="form-check-label px-2" for="no-age-limit">연령 제한 없음</label>
                    </div>
                </div>
            </div>

            <!-- 남녀 구분 -->
            <div class="col-sm-6 mb-5 w-100 ">
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
                </div>
            </div>


            <!-- 상세 사항 -->
            <div class="mb-4">
              <label class="form-label fw-bold" for="ap-description">상세 설명</label>
              <textarea class="form-control" id="ap-description" rows="5" placeholder="매물에 대한 상세 정보를 입력하세요"></textarea>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Price from '../Price.vue';
import NameAddress from '../NameAddress.vue';

const isNoLimitAge = ref(false);
</script>