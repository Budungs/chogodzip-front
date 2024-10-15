<template>
    <div class="container text-center my-5">
      <br>
      <!-- 결제 성공 메세지 -->
      <div class="alert alert-success" role="alert">
        <h1 class="display-4">결제 성공!</h1>
        <p class="lead">예약금 결제가 성공적으로 완료되었습니다.</p>
        
      </div>
  
      <!-- 홈으로 돌아가는 버튼 -->
      <button class="btn btn-primary btn-lg mt-4" @click="goHome">홈으로</button>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import kakaopayApi from '@/api/kakaopayApi';
  
  const route = useRoute();
  const router = useRouter();
  const payResult = reactive({ approval: {} });
  
  // 금액을 포맷팅하는 computed 속성
  const formattedAmount = computed(() => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(payResult.approval.amount || 0);
  });
  
  // 홈으로 라우팅하는 함수
  const goHome = () => {
    router.push('/');
  };
  
  onMounted(async () => {
    try {
      console.log(route.query.pg_token);
      const data = await kakaopayApi.getApprovalInfo(route.query.pg_token);
      payResult.approval = data;
      console.log(data);
    } catch (e) {
      alert('결제에 실패했습니다.');
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .alert {
    background-color: white;
    border-color: #c7e3d6;
  }
  
  button {
    width: 200px;
  }
  </style>
  