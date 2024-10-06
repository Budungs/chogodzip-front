<template>
  <div class="container mt-0 mb-md-4 py-5" >
    <div class="row">

      <div class="col-lg-8">
        <!-- Breadcrumb-->
        <nav class="mb-3 pt-md-3" aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">방 내놓기</li>
            <li class="breadcrumb-item active" aria-current="page">매물 정보 등록</li>
          </ol>
        </nav>

        <!-- 제목 -->
        <div class="mb-4">
          <h1 class="h2 mb-3">매물 정보 등록</h1>
          <p class="mb-0"><span class="text-danger">*</span>표시는 필수 입력 사항입니다.</p>
        </div>


        <!-- 매물 유형 선택 -->
        <section class="card card-body border-0 shadow-sm p-4 mb-4" id="r-category">
          <h2 class="h4 mb-4"><i class="fas fa-tags text-primary fs-5 mt-n1 me-2" />매물 유형을 선택해주세요.</h2>
          <div class="row">
            <div class="col-sm-6 mb-3">
              <label class="form-label" for="r-category">매물 유형<span class="text-danger">*</span></label>
              <select class="form-select" id="r-category" required v-model="category" @change="fillProcessBar">
                <option value="" disabled>매물 유형을 선택해주세요.</option>
                <option value="gosiwon">고시원</option>
                <option value="jachiroom">자취방</option>
                <option value="sharehouse">공유주거공간</option>
              </select>
            </div>
          </div>
        </section>

        <!-- 세부 폼 작성: 매물 유형에 따라 표시 컴포넌트 변경 -->
        <RoomPostForm v-if="category !== ''" :category="category" />
      </div>

      <!-- 작성 진행 카드 -->
      <ProgressCard :progress="progress" :categorySelected="categorySelected" />

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RoomPostForm from '@/modules/components/room/form/RoomPostForm.vue';
import ProgressCard from '@/modules/components/room/form/ProgressCard.vue';

const category = ref(''); // 주거 분류
const categorySelected = ref(false);
const progress = ref(0); // 작성 진행바

// 작성 진행바 업데이트
const fillProcessBar = () => {
  if(category !== '') {
    progress.value = 20; categorySelected.value = true;
  }
  else {
    progress.value = 0; categorySelected.value = false;
  }
}
</script>