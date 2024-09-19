<template>
<div class="container">
    <header>
        <div class="logo">CHOGAdZIP</div>
        <div class="header-links">
            <a href="#">관심목록</a>
            <a href="#">방내놓기</a>
        </div>
        <div class="header-buttons">
            <a href="#">로그인</a>
            <a href="#">회원가입</a>
            <a href="#">중개사 가입/광고문의</a>
        </div>
    </header>
    <br>
    
    <div class="kakao-container">
        <div class="loginLogo">로고</div>

        <div class="message">
            로그인하시고 <br>
            <span class="highlight">초갓집</span>과 함께 방 찾기 여정을 떠나보세요!
        </div>
        <br>

        <a href="registUser.html"><img src="../img/kakaoLogo.png" alt="Kakao Icon"></a>

    </div>

    
        
    <br><br><br><br><br><br><br><br><br><br>
</div>
</template>
    
<style scoped>
</style>

<script>
export default {
  methods: {
    greet() {
      alert("안녕하세요!");
    }
  }
}
</script>