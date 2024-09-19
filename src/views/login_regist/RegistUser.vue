<template>
    <div class="container">
        <div class="signup-container">
            <h1>회원가입</h1>
            <br>
            <form class="signup-form">
                <div class="input-group">
        
                    <input type="text" id="nickname" placeholder="닉네임">
                </div>
    
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="agree-all" onclick="checkAll(this)">
                        <label for="agree-all">모두 동의합니다.</label>
                    </div>
    
                    <div class="checkbox-item">
                        <input type="checkbox" id="agree-age" class="agree-checkbox">
                        <label for="agree-age"><span class="required-text">[필수]</span> 만 14세 이상 가입동의</label>
                    </div>
    
                    <div class="checkbox-item">
                        <input type="checkbox" id="agree-privacy" class="agree-checkbox">
                        <label for="agree-privacy"><span class="required-text">[필수]</span> 개인정보처리방침과 이용약관에 동의합니다.</label>
                    </div>
                </div>
    
                <button type="submit" class="signup-button">회원가입 완료</button>
            </form>
        </div>
    </div>

        <br><br><br><br><br><br><br><br><br><br>
</template>

<style scoped>

</style>