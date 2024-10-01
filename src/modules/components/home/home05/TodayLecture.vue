<template>
    <div class="background-color-100 bg-size-cover bg-position-center border-0">
        <section class="container pt-5 pb-5 mb-md-4">
            <div class="row pt-5 pb-5">

                <!-- 퀴즈 -->
                <div class="col-md-7 mb-3 mb-md-0 h-100">     
                    <div class="h3 d-flex justify-content-center mb-5 pt-2">오늘의 간단 부동산 지식 퀴즈 🤔</div>

                    <div v-for="(item, idx) in quizItems" :key="idx">
                        <TodayQuizItem :item="item" :collapseId="`jobCollapse${idx}`" />
                    </div>
                </div>

                <!-- 뉴스 -->
                <div class="col-md-5 mb-3 mb-md-0 h-100">
                    <div class="h3 d-flex justify-content-center mb-5 pt-2">오늘의 최신 뉴스 🔥</div>

                    <div class="card shadow-sm p-lg-3 mt-4 mb-lg-0">
                        <div class="card-body p-lg-4" >
                            <TodayLatestNewsItem v-for="(item, idx) in newsItemList" :key="idx" :item="item" />
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    </div>
</template>

<script setup>
import TodayQuizItem from './TodayQuizItem.vue';
import TodayLatestNewsItem from './TodayLatestNewsItem.vue';

// 임시 퀴즈 데이터
const quizItems = [
    {
        agenda: '전세 거래',
        title: '전세보증금 반환을 보호하기 위한 보험은 무엇인가요?',
        desc: '전세보증금을 보호하기 위해 전세금 반환 보증 보험에 가입할 수 있습니다.',
        answer: '전세금 반환 보증 보험',
        category: '부동산',
        imgSrc: 'src/assets/images/pfp/pfp01.png'
    },
    {
        agenda: '청약 제도',
        title: '청약 신청을 하기 위해 필수적으로 가입해야 하는 통장은 무엇일까요?',
        desc: '청약을 신청하기 위해서는 \'청약통장\'을 개설해야 합니다. 청약통장은 주택을 분양받기 위해 필요한 통장으로, 일정 금액을 납입하면서 청약 자격을 준비할 수 있습니다.',
        answer: '청약통장',
        category: '청약',
        imgSrc: 'src/assets/images/pfp/pfp01.png'
    },
];


//임시 뉴스 데이터
const newsItemList = [
    {
        href: 'https://n.news.naver.com/mnews/article/023/0003861674',
        category: '경제',
        title: '한발 물러선 20대… 빚으로 서울 주택 구매하는 비율 감소',
        date: '2024.10.02',
    },
    {
        href: 'https://n.news.naver.com/mnews/article/009/0005372695',
        category: 'IT/과학',
        title: '경제 효과 131조·일자리 55만개 창출”…구글 20년 발자취 따라가보니',
        date: '2024.10.02',
    },
    {
        href: 'https://n.news.naver.com/mnews/article/374/0000404034',
        category: 'IT/과학',
        title: '구글, 태국 클라우드 AI 인프라에 1조3천억 투자',
        date: '2024.10.02',
    },
    {
        href: 'https://n.news.naver.com/mnews/article/629/0000325651',
        category: '경제',
        title: '억대 시세 차익 \'무순위 청약\' 열풍 여전',
        date: '2024.10.02',
    },
    {
        href: 'https://n.news.naver.com/mnews/article/448/0000480489',
        category: '경제',
        title: '시중은행, 대출금리 또 줄줄이 인상…금리 인하기에 배불리나?',
        date: '2024.10.02',
    },
]
</script>

<style scoped>
.background-color-100 {
    width:100%;
    height: 100%;
    background-color: var(--light-main3);
}
</style>
