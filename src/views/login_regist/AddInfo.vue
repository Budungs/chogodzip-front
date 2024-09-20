<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">추가정보 입력</h1>
        <form>
            <label for="address" class="form-label">실거주지 주소</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" placeholder="주소 입력">
                <button class="btn btn-outline-secondary" type="button">검색</button>
            </div>

            <div class="input-group input-group-lg">
                <input type="text" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg">
            </div>

            <br>
            <div class="input-group mb-3">
                <input type="text" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
        </form>

        <!-- 관심 지역 -->
        <br><br>
        <label for="address" class="form-label">관심 지역</label>
        <div class="d-flex mb-3">
            <div class="input-group input-group-sm mb-3">
                <input placeholder="시/군" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group input-group-sm mb-3">
                <input placeholder="구" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group input-group-sm mb-3">
                <input placeholder="동" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
        </div>

        <!-- 회원가입 완료 버튼 -->
        <div style="display:flex; flex-direction:column; gap:10px;">
            <button type="button" class="btn-accent" @click="goMainPage">회원가입 완료</button>
            <button type="button" class="btn-accent" style="width:100%; background-color:#868e96"
                @click="goMainPage">건너뛰기</button>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goMainPage = () => {
    router.push('/'); // 새 페이지로 이동
};
</script>

<style scoped>
.container {
    max-width: 600px;
}

h1 {
    font-weight: bold;
}

.form-label {
    font-weight: bold;
}
</style>