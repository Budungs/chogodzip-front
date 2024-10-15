<template>
  <div class="container d-flex flex-column align-items-center" style="margin-top: 2rem;">
    <!-- 예약금 안내 -->
    <h3 class="text-center" style="color: #D85F5F; font-weight: bold;">
      예약금 30,000원
    </h3>
    <p class="text-center mt-3" style="font-size: 1.2rem;">
      예약을 완료하려면 아래 Kakao Pay 버튼을 통해 결제해주세요.
    </p>

    <!-- Kakao Pay 결제 Form -->
    <form @submit.prevent="submit" class="d-flex flex-column align-items-center mt-4">
      <input type="hidden" v-model="kakaoPayItem.item_name" />
      <input type="hidden" v-model="kakaoPayItem.total_amount" />
      <input type="hidden" v-model="kakaoPayItem.quantity" />
      <button type="submit" class="payment-btn" :disabled="disableSubmit" style="background-color: #FFEB00; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 1.1rem;">
        Kakao Pay로 결제
      </button>
    </form>
  </div>
  <br><br><br><br><br><br>
</template>

<script setup>
import { reactive } from 'vue';
import kakaopayApi from '@/api/kakaopayApi';

const kakaoPayItem = reactive({
  item_name: '예약금',
  total_amount: '30000', 
  quantity: '1',
});

const submit = async () => {
  try {
    const response = await kakaopayApi.sendRequest(kakaoPayItem);
    console.log(response);
    if (response.result === 'ok') {
      location.href = response.readyInfo.next_redirect_pc_url;
    } else {
      alert('결제에 실패하였습니다.');
    }
  } catch (error) {
    alert('결제에 실패하였습니다.');
  }
};
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
