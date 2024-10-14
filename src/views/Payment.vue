<template>
    <div class="container d-flex flex-column align-items-center" style="margin-top: 2rem;">
      <!-- 예약금 안내 -->
      <h3 class="text-center" style="color: #D85F5F; font-weight: bold;">
        예약금 30,000원
      </h3>
      <p class="text-center mt-3" style="font-size: 1.2rem;">
        예약을 완료하려면 아래 Kakao Pay 버튼을 통해 결제해주세요.
      </p>
  
      <!-- Kakao Pay 결제 버튼 -->
      <button @click="startKakaoPay" class="payment-btn mt-4" style="background-color: #FFEB00; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 1.1rem;">
        Kakao Pay로 결제
      </button>
    </div>
    <br><br><br><br><br><br>
  </template>
  
  <script setup>
  import axios from 'axios'
  
  const startKakaoPay = async () => {
    try {
      // 결제 요청 파라미터 설정
      const param = {
        item_name: '예약금',
        quantity: '1',
        total_amount: '30000',
      };
  
      // POST 요청으로 결제 정보 전달
      const response = await axios.post('/kakaoPay', param);
  
      // 결제 팝업창을 위한 URL
      const kakaoPayUrl = response.data;
  
      // 팝업창 옵션 설정
      const popupOptions = 'width=500,height=600,scrollbars=yes,resizable=no';
  
      // 카카오페이 결제 화면 팝업으로 띄우기
      window.open(kakaoPayUrl, 'kakaoPay', popupOptions);
    } catch (error) {
      console.error('결제 요청 중 오류 발생:', error);
    }
  }
  </script>
  
  <style scoped>
  .payment-btn {
    border: none;
    cursor: pointer;
  }
  .payment-btn:hover {
    background-color: #ffd700;
  }
  </style>
  