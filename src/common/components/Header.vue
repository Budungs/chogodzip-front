<template>
    <div class="container">
        
        <header class="d-flex justify-content-between align-items-center py-3 flex-wrap">
            <div class="logo">
                <img src="../../assets/images/logo1.png" alt="CHOGAdZIP 로고" class="logo-img">
            </div>
            <div class="header-links d-flex ms-auto"> 
                <a href="#" class="nav-link px-3">관심목록</a>
                <a href="#" class="nav-link px-3">방내놓기</a>
            </div>
            <div class="header-buttons d-flex">
                <a href="#" class="btn btn-outline-secondary mx-2">로그인</a>
                <a href="#" class="btn btn-outline-secondary mx-2">회원가입</a>
                <a href="#" class="btn btn-outline-dark mx-3">중개사 가입/광고문의</a>
            </div>
        </header>
        
        <!-- <form class="search-bar" action="/search" method="GET">
            <button type="submit">
                <img src="../../assets/img/search.png" alt="검색 Icon">
            </button>
            <input type="text" name="query" placeholder="검색어를 입력하세요">
        </form> -->
        
    </div>
</template>

<style scoped>

.logo-img {
    width: auto; 
    max-height: 5rem;
}

.header-links a {
    font-size: 1rem;
    color: black; 
    text-decoration: none;
    margin-right: 15px; 
}

.header-buttons a {
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 1rem;
    border: 1px solid #ccc;
}

.header-buttons .btn-outline-dark {
    border-color: #000;
}

.search-bar {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
}

.search-bar input {
    width: 100%;
    padding: 10px 20px 10px 45px;
    font-size: 1.2rem;
    border: 2px solid var(--main1); 
    border-radius: 10px;
    outline: none;
}

.search-bar button {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
}

.search-bar button img {
    width: 20px;
    height: 20px;
}
</style>
