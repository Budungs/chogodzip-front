<template>
    <div class="container">
        <div class="info-container">

            <h1>추가정보 입력</h1>
            
            <form>
                <div class="form-group">
                    <label for="postcode">실거주지 주소</label>
                    <div class="input-group">
                        <input type="text" id="postcode" placeholder="실거주지 주소" readonly>
                        
                        <button type="button" class="btn-search" onclick="execDaumPostcode()">검색</button>
                        
                    </div>
                    <input type="text" id="postcode" placeholder="" readonly>
                    <input type="text" id="address" placeholder="상세주소">
                </div>
                
                <div class="form-group">
                    <label for="interest-region">관심 지역</label>
                    <div class="input-group">
                        <input type="text" class="input-small" placeholder="시">
                        <input type="text" class="input-small" placeholder="구">
                        <input type="text" class="input-small" placeholder="동">
                    </div>
                </div>
    
                <button type="submit" class="btn-submit">회원가입 완료</button>
                <button type="button" class="btn-skip">건너뛰기</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import "../../assets/css/addInfo.css";
</style>