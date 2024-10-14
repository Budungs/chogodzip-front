<template>
    <div class="container d-flex flex-column align-items-center" style="margin-top: 2rem;">
        <!-- 예약금 안내 -->
        <h3 class="text-center" style="color: #D85F5F; font-weight: bold;">
            예약금 30,000원
        </h3>
        <p class="text-center mt-3" style="font-size: 1.2rem;">
            예약을 완료하려면 아래 Kakao Pay QR 코드를 통해 결제해주세요.
        </p>

        <!-- Kakao Pay QR Code Placeholder -->
        <div class="qr-code-placeholder d-flex justify-content-center align-items-center" 
             style="width: 200px; height: 200px; background-color: #F1F1F1; border: 1px solid #DDD; margin-top: 2rem;">
            <!-- QR 코드 이미지 들어갈 자리 -->
            <p class="text-muted">Kakao Pay QR Code</p>
        </div>

        <!-- 결제 완료 버튼 -->
        <button class="payment-btn mt-4" style="background-color: #FFEB00; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 1.1rem;">
            결제 완료
        </button>
    </div>
    <br><br><br>
</template>

<script setup>
// Kakao Pay QR 코드 관련 처리, 이후 Kakao Pay API 연동시 여기에 로직을 추가할 수 있습니다.
</script>

<style scoped>
/* Custom styles */
.qr-code-placeholder {
    text-align: center;
    color: #888;
    font-size: 1rem;
}

.payment-btn {
    border: none;
    cursor: pointer;
}
.payment-btn:hover {
    background-color: #ffd700;
}
</style>
