<template>
    <div class="container">

        <div class="form-container">
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
                        aria-describedby="inputGroup-sizing-default" value="서울시" readonly>

                </div>
                <div class="input-group input-group-sm mb-3">
                    <select class="form-control" aria-label="Sizing example select" aria-describedby="inputGroup-sizing-default">
                        <option value="" disabled selected>구 선택</option>
                        <option value="강남구">강남구</option>
                        <option value="강동구">강동구</option>
                        <option value="강북구">강북구</option>
                        <option value="강서구">강서구</option>
                        <option value="관악구">관악구</option>
                        <option value="광진구">광진구</option>
                        <option value="구로구">구로구</option>
                        <option value="금천구">금천구</option>
                        <option value="노원구">노원구</option>
                        <option value="도봉구">도봉구</option>
                        <option value="동대문구">동대문구</option>
                        <option value="동작구">동작구</option>
                        <option value="마포구">마포구</option>
                        <option value="서대문구">서대문구</option>
                        <option value="서초구">서초구</option>
                        <option value="성동구">성동구</option>
                        <option value="성북구">성북구</option>
                        <option value="송파구">송파구</option>
                        <option value="양천구">양천구</option>
                        <option value="영등포구">영등포구</option>
                        <option value="용산구">용산구</option>
                        <option value="은평구">은평구</option>
                        <option value="종로구">종로구</option>
                        <option value="중구">중구</option>
                        <option value="중랑구">중랑구</option>
                      </select>
                      
                </div>
                <!-- <div class="input-group input-group-sm mb-3">
                    <input placeholder="동" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                </div> -->
            </div>
    
            <!-- 회원가입 완료 버튼 -->
            <div style="display:flex; flex-direction:column; gap:10px;">
                <button type="button" class="btn-accent" @click="goMainPage">회원가입 완료</button>
                <button type="button" class="btn-accent" style="width:100%; background-color:#868e96"
                    @click="goMainPage">건너뛰기</button>
            </div>
    
            <br><br><br><br><br>
    
        </div>
       
    </div>
    <br><br>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goMainPage = () => {
    router.push('/'); // 새 페이지로 이동
};
</script>

<style scoped>
@import "../../assets/css/addInfo.css";

</style>