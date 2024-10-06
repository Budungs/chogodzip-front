<template>
    <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
      <h2 class="h4 mb-4"><i class="fas fa-hand-holding-usd text-primary fs-5 mt-n1 me-2" />가능한 대출 종류를 선택해주세요.</h2>

      <!-- 대출 종류 -->
      <div class="row">
        <div class="mb-4">
            <div class="row">
              <div v-if="category === 'jachiroom'" class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="allow-cats">
                  <label class="form-check-label" for="allow-cats">HUG</label>
                </div>
              </div>
              <div v-if="category === 'jachiroom'" class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="allow-dogs">
                  <label class="form-check-label" for="allow-dogs">중소기업청년대출 100%</label>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="allow-dogs">
                  <label class="form-check-label" for="allow-dogs">버팀목</label>
                </div>
              </div>
              <div v-if="category === 'jachiroom'" class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="allow-dogs">
                  <label class="form-check-label" for="allow-dogs">중소기업청년대출 80%</label>
                </div>
              </div>
            </div>
        </div>
      </div>

      <!-- 자취방: 융자 -->
      <h2  v-if="category === 'jachiroom'" class="h4 mb-4"><i class="fas fa-money-check-alt text-primary fs-5 mt-n1 me-2" />융자금 유무를 선택해주세요<span class="span text-danger">*</span></h2>
      <div v-if="category === 'jachiroom'" class="container row w-100">
          <div class="form-check col-lg-6 justify-content-around">
              <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
              <label class="form-check-label" for="period-one">융자 없음</label>
          </div>
          <div class="form-check col-lg-6">
              <input class="form-check-input" type="radio" id="period-two" name="ap-business-type">
              <label class="form-check-label" for="period-two">융자 있음</label>
          </div>
      </div>

    </section>
</template>

<script setup>
const props = defineProps({
    category: {
        type: String,
        required: true,
    },
})
</script>