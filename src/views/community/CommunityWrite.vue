<template> 
  <div class="outer-background">
    <div class="container">
      <br><br>
      <div class="write-form">
        <h2>게시글 작성</h2>
        <br><br>
        <form>
          <div class="mb-3">
            <!-- 제목 -->
            <h4 class="h3 mb-n1">제목</h4>
            <!-- Addon on the left -->
            <div class="input-group" style="margin-top:10px;">
              <input type="text" class="form-control" placeholder="제목을 입력하세요.">
            </div>
          </div>
            <!-- 주제선택 -->
          <div class="select-subject">
            <br>
            <h4 class="h3 mb-n1">주제선택</h4>
            <div class="form-text" style="margin-top:15px;">관심있는 주제의 게시글을 모아보세요.</div>
          </div>
        </form>
        <br>
        <!-- 정보제공/후기 -->
        <div class="subject-choose-container">
          <div class="out-choose-info">
            <label for="info" class="choose-label">정보제공</label>
            <div class="in-choose-info">
              <button :class="{ active: selectedType === '부동산 정책/투자' }" @click="selectType('부동산 정책/투자')">부동산 정책/투자</button>
              <button class="policy-issue" :class="{ active: selectedType === '부동산 핫이슈' }" @click="selectType('부동산 핫이슈')">부동산 핫이슈</button>
            </div>
          </div>

          <!-- 후기 -->
          <div class="out-choose-info">
            <label for="info" class="choose-label">후기</label>
            <div class="in-choose-info">
              <button class="review" :class="{ active: selectedType === '부동산 후기' }" @click="selectType('부동산 후기')">부동산 후기</button>
              <button class="contract-review" :class="{ active: selectedType === '계약/입주 후기' }" @click="selectType('계약/입주 후기')">계약/입주 후기</button>
              <button class="interior-review" :class="{ active: selectedType === '인테리어 후기' }" @click="selectType('인테리어 후기')">인테리어 후기</button>
            </div>
          </div>

          <!-- 질문 -->
          <div class="out-choose-info">
            <label for="info" class="choose-label">질문</label>
              <div class="in-choose-info">
                <button class="loan-question" :class="{ active: selectedType === '대출 질문' }" @click="selectType('대출 질문')">대출 질문</button>
                <button :class="{ active: selectedType === '분양/청약 질문' }" @click="selectType('분양/청약 질문')">분양/청약 질문</button>
              </div>
          </div>
        </div>
        <br><br>
  
        <!-- summernote -->
        <div class="summernote-container">
          <div id="summernote"><p>오늘의 일기 : 헤더의 배경색이 갑자기 회색으로 바뀌었다. 무려 성인 남성 3명과 여성 1명이 붙어서 이 문제를 해결하려고 했다. 결국 해결이 되었다! 바로바로바로 #app 에 background-color을 white로 고치는 것이었다. 자살할 뻔 했다.</p></div>
        </div>
        
        <br><br><br>
        <div class="bottom-button-container">
          <!-- 취소 버튼 (왼쪽) -->
          <button type="button" class="btn btn-primary" style="background-color:#A9A9A9;" @click="goToCommunityMainPage">취소</button>
          <!-- 등록 버튼 (오른쪽) --> 
          <button type="button" class="btn btn-primary" style="background-color:#a28cd1;" @click="goToCommunityMainPage">등록</button>
        </div>
  
        <br><br>
        
      </div>
    </div>
    <br><br><br>
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
  console.log("뭔가 클릭은 해서 바뀌었음");
  console.log(selectedType.value);
}

// summernote
onMounted(() => {
  $('#summernote').summernote({
    placeholder: 'Hello stand alone ui',
    tabsize: 2,
    height: 500,
    width:1150,
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
.subject-choose-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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

/* 각 버튼 사이 간격 조정 */
.policy-issue {
  margin-left: 15px; /* 부동산 정책/투자와 부동산 핫이슈 사이 15px */
}

.contract-review {
  margin-left: 15px; /* 부동산 후기와 계약/입주 후기 사이 15px */
}

.interior-review {
  margin-left: 15px; /* 계약/입주 후기와 인테리어 후기 사이 15px */
}

/* 기본 마진 설정 */
button + button {
  margin-left: 15px;
}

.out-choose-info {
  margin-left : 35px;
}
.in-choose-info {
  display:flex;
  margin-top: 8px;
}

.out-choose-info button:hover,
.in-choose-info button:hover {
  background-color: #e0e0e0;
}

.out-choose-info button.active,
.in-choose-info button.active {
  background-color: #a28cd1 !important;
  color: white !important;
}

.choose-label {
  font-size: 1.3rem; /* <h4>보다 작고, 일반 텍스트보다 큰 크기 */
  font-weight: bold;
}

.outer-background {
  background-color: #E6E6FA; /* 보라색 */
  padding: 20px; /* 여백 추가 */
}
/* write-form은 흰색 배경으로 설정 */
.write-form {
  background-color: white; /* 흰색 배경 */
  padding: 20px; /* 내부 여백 */
  border-radius: 8px; /* 모서리를 둥글게 */
}
/* summernote - 자동으로 display:flex 적용 */
.summernote-container {
  display: flex;
  justify-content: center;  /* 가로 가운데 정렬 */
  margin-top:50px; 
  margin-left:35px;
}
.write-form {
  padding:50px;
}
/* 제목 */
.mb-3 {
  margin-left: 35px;
}
/* 주제 선택 */
.select-subject {
  display:flex;
  flex-direction:column; /* 정렬 방식이 세로 */
  margin-left: 35px;
}
/* 취소 + 선택 버튼 */
.bottom-button-container {
  display:flex;
  justify-content: flex-end;
  margin-right:15px;
}
</style>
