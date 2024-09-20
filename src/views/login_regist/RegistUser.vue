<template>
  <div class="container mt-4">
    <!-- Signup Form -->
    <div class="signup-container text-center">
      <h1 class="mb-4">회원가입</h1>
      <form class="signup-form">
        <!-- 닉네임 입력 -->
        <div class="mb-3">
          <input type="text" id="nickname" class="form-control" placeholder="닉네임">
        </div>

        <!-- 체크박스 그룹 -->
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="agree-all" @click="checkAll">
          <label class="form-check-label" for="agree-all">모두 동의합니다.</label>
        </div>
        
        <div class="form-check mb-3">
          <input class="form-check-input agree-checkbox" type="checkbox" id="agree-age">
          <label class="form-check-label" for="agree-age">
            <span class="text-danger">[필수]</span> 만 14세 이상 가입동의
          </label>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input agree-checkbox" type="checkbox" id="agree-privacy">
          <label class="form-check-label" for="agree-privacy">
            <span class="text-danger">[필수]</span> 개인정보처리방침과 이용약관에 동의합니다.
          </label>
        </div>

        <!-- 회원가입 버튼 -->
        <button type="submit" @click="goToRegistComplete" class="btn btn-primary w-100">회원가입 완료</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// "모두 동의" 체크박스 클릭 시 처리하는 함수
function checkAll(event) {
  const checkboxes = document.querySelectorAll('.agree-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = event.target.checked;
  });
}

// "/registcomplete" 경로로 이동하는 함수
function goToRegistComplete() {
  router.push('/registcomplete');
}
</script>

<style scoped>
.signup-container {
  margin-top: 60px;
}

.signup-form {
  max-width: 400px;
  margin: 0 auto;
}

.signup-button:hover {
  background-color: #553C9A !important;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
