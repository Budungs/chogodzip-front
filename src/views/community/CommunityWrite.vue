<template>
<div style="width:100%; background-color:background-color: #E6E6FA;">
  <div class="container">
    <br><br>
    <div class="write-form">
      <h2>게시글 작성</h2>
      <br><br>
      <form>
        <div class="mb-3">
          <!-- 제목 -->
          <h4 class="h3 mb-n1" style="margin-left: 35px;">제목</h4>
          <input type="text" style="margin-left: 45px; width:700px;" class="form-control mt-2" placeholder="게시글의 제목을 입력해주세요.">
          <!-- <div class="form-text">게시글의 제목을 입력해주세요.</div> -->
        </div>
          <!-- 주제선택 -->
          <br>
          <h4 class="h3 mb-n1" style="margin-left: 35px;">주제선택</h4>
          <div class="form-text" style="margin-left: 45px; margin-top:15px;">관심있는 주제의 게시글을 모아보세요.</div>
      </form>
      <br>
      <!-- 정보제공/후기 -->
      <label for="info" style="margin-left: 35px; margin-bottom: 10px;" class="choose-label">정보제공</label>
      <label for="info" style="margin-left: 250px;" class="choose-label">후기</label>
      <div class="property-type">
        <!-- 정보 제공 선택 버튼 -->
        <div class="choose-info">
          <button :class="{ active: selectedType === '부동산 정책/투자' }" @click="selectType('부동산 정책/투자')">부동산 정책/투자</button>
          <button :class="{ active: selectedType === '부동산 핫이슈' }" @click="selectType('부동산 핫이슈')">부동산 핫이슈</button>
        </div>
        <!-- 후기 선택 버튼 -->
        <div class="choose-review">
          <button :class="{ active: selectedType === '부동산 후기' }" @click="selectType('부동산 후기')">부동산 후기</button>
          <button :class="{ active: selectedType === '계약/입주 후기' }" @click="selectType('계약/입주 후기')">계약/입주 후기</button>
          <button :class="{ active: selectedType === '인테리어 후기' }" @click="selectType('인테리어 후기')">인테리어 후기</button>
        </div>
      </div>
      
      <!-- 질문 -->
      <br>
      <label for="info" style="margin-left: 35px; margin-bottom: 10px;" class="choose-label">질문</label>
      <div class="choose-info">
        <button :class="{ active: selectedType === '대출 질문' }" @click="selectType('대출 질문')">대출 질문</button>
        <button :class="{ active: selectedType === '분양/청약 질문' }" @click="selectType('분양/청약 질문')">분양/청약 질문</button>
      </div>
      <br><br>

      <!-- summernote -->
      <div id="summernote"><p>여기에 입력해주세요.</p></div>
      <br><br><br>
      <div class="d-flex justify-content-between">
        <!-- 취소 버튼 (왼쪽) -->
        <button type="button" class="btn btn-primary" style="background-color:#A9A9A9;" @click="goToCommunityMainPage">취소</button>
        <!-- <button class="btn btn-secondary" style="margin-left:35px;">취소</button> -->
        <!-- 등록 버튼 (오른쪽) -->
        <button type="button" class="btn btn-primary" style="background-color:#a28cd1;" @click="goToCommunityMainPage">등록</button>
        <!-- <button class="btn btn-primary">등록</button> -->
      </div>

      <br><br>
      
    </div>
  </div>
</div>
</template>
  
<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue'; // summernote

// 선택된 매물 유형을 저장하는 변수
const selectedType = ref('쉐어하우스');

// 매물 유형을 선택하는 함수
function selectType(type) {
  selectedType.value = type;
}

// summernote
onMounted(() => {
  $('#summernote').summernote({
    placeholder: 'Hello stand alone ui',
    tabsize: 2,
    height: 120,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ]
  });
});

// 취소 버튼 클릭 시 게시판의 메인 페이지로 이동
import { useRouter } from 'vue-router';
const router = useRouter();

const goToCommunityMainPage = () => {
  router.push('/communitymain');
}
</script>
  
<style scoped>
.property-type {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button { /* 일반적인 버튼 */
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.choose-info button:hover,
.choose-review button:hover {
  background-color: #e0e0e0;
}

.choose-info button.active,
.choose-review button.active {
  background-color: #a28cd1 !important;
  color: white !important;
}

.choose-label {
  font-size: 1.3rem; /* <h4>보다 작고, 일반 텍스트보다 큰 크기 */
  font-weight: bold;
}
.choose-info > * {
  margin-left: 30px;
}
.choose-review > * {
  margin-left: 30px;
}

/* write-form은 흰색 배경으로 설정 */
.write-form {
  background-color: white; /* 흰색 배경 */
  padding: 20px; /* 내부 여백 */
  border-radius: 8px; /* 모서리를 둥글게 */
}
</style>