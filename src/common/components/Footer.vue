<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-left">
                <img class="logo" src="@/assets/img/logo.png" alt="Logo" />
                <div class="info">
                    <h3 style="color: white; margin-bottom: 20px;">KB IT's Your Life 5기 부동이들</h3>
                    <p style="margin-bottom: 5px;">서울 광진구 능동로 195-16 6층 (멀티캠퍼스 세종대)</p>
                    <p style="margin-bottom: 5px;">Developed by 김태희, 박민지, 신동의, 홍세영, 황현석</p>
                    <p>Designed by 김태희, 박민지, 신동의, 홍세영, 황현석</p>
                </div>
            </div>
            <div class="footer-right">
                <a href="https://github.com/your-repo-link" class="github-link" target="_blank">
                    <i class="fab fa-github"></i> 프로젝트 보러가기
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
.footer {
    background-color: #6e6e6e;
    color: white;
    padding: 100px 180px;
    height: 350px;
    font-family: 'Arial', sans-serif;
    display: flex;
    align-items: center;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.footer-left {
    display: flex;
    align-items: center;
}

.logo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 50px;
}

.info {
    font-size: 14px;
}

h3 {
    font-weight: bold;
    margin-bottom: 5px;
}

.footer-right {
    font-size: 16px;
}

.github-link {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.github-link i {
    margin-right: 8px;
}

.github-link:hover {
    text-decoration: underline;
}
</style>