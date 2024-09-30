<template>
    <div class="container">
        <header class="d-flex justify-content-between align-items-center py-3 flex-wrap">
            <div class="logo">
                <a href="/"><img src="../../assets/images/logo1.png" alt="CHOGODZIP 로고" class="logo-img"></a>
            </div>
            <nav class="header-nav ms-auto">
                <ul class="nav">
                    <li 
                      class="nav-item dropdown me-lg-2"
                      @mouseover="isDropdownVisible = true"
                      @mouseleave="isDropdownVisible = false"
                    >
                        <a class="nav-link align-items-center pe-lg-4" href="#" role="button">
                            방찾기
                        </a>
                        <ul class="dropdown-menu" v-if="isDropdownVisible">
                            <li><a class="dropdown-item" href="#">고시원</a></li>
                            
                            <li><a class="dropdown-item" href="#">자취방</a></li>
                           
                            <li><a class="dropdown-item" href="#">공유주거공간</a></li>
                        </ul>
                    </li>
                    <li class="nav-item me-lg-2">
                        <a href="#" class="nav-link align-items-center pe-lg-4">청약</a>
                    </li>
                    <li class="nav-item me-lg-2">
                        <a href="/communitymain" class="nav-link align-items-center pe-lg-4">커뮤니티</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link align-items-center pe-lg-4">도움말</a>
                    </li>
                </ul>
            </nav>
            <div class="header-links d-flex ms-auto"> 
                <a href="#" class="nav-link px-3">관심목록</a>
                <a href="/registroom" class="nav-link px-3">방내놓기</a>
            </div>
            <div class="header-buttons d-flex">
                <a href="/login" class="btn btn-outline-secondary mx-2">로그인/회원가입</a>
            </div>
        </header>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isDropdownVisible = ref(false);
</script>


<style scoped>
.logo-img {
    width: auto; 
    max-height: 5rem;
}

.header-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 30px; /* 항목 간 간격 조정 */
}

.nav-item .nav-link {
    font-size: 1.25rem; /* 글씨 크기 조정 */
    color: black;
    text-decoration: none;
    padding: 10px;
    position: relative;
}

.dropdown-menu {
    position: absolute;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
    padding: 0;
    margin: 0;
}

.dropdown-menu a {
    color: black;
    text-decoration: none;
    
    display: block;
    white-space: nowrap;
}

.dropdown-menu a:hover {
    background-color: #f1f1f1;
}

.dropdown-item {
    padding: 8px 10px; /* padding을 조정하여 간격을 좁게 */
    font-size: 1rem;    /* 폰트 크기 조정 (필요시) */
}


.header-links a {
    font-size: 1.25rem; /* 글씨 크기 조정 */
}

.header-buttons a {
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 1.25rem; /* 글씨 크기 조정 */
    border: 1px solid #ccc;
}

.header-buttons .btn-outline-dark {
    border-color: #000;
}
</style>
