<template>
    <div class="card shadow-sm p-lg-3 mt-4 mb-lg-0">
        <HomeLottoNoticeItem :noticeItems="noticeItems" />
    </div>
</template>

<script setup>
import HomeLottoNoticeItem from './HomeLottoNoticeItem.vue';

const noticeItems = [
    {
        href: 'https://www.khug.or.kr/jeonse/web/s07/s070102.jsp',
        type: '기타임대 | 서울',
        content: 'HUG 든든전세주택 입주자 모집 공고'
    },
    {
        href: 'https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do',
        type: '행복주택 | 인천',
        content: '[정정공고]인천시 중부권 행복주택 예비 입주자 모집공고 (2024.10.04.)'
    },
    {
        href: 'https://happydorm.or.kr/gaebong/ko/0601/board/board/;jsessionid=0A55C87F7F7414BD06F7C9218471ACB9?mode=V&pageIndex=8&pageIndex=8&idx=219483003876621824',
        type: '행복주택 | 서울',
        content: '개봉동기숙사형청년주택 2024학년도 2학기 상시 입주생 모집 공고'
    },
    {
        href: 'https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do',
        type: '행복주택 | 경기',
        content: '김포시 행복주택 입주자격완화 예비입주자 모집[선계약후검증]'
    },
    {
        href: 'https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do?panId=2015122300015241&ccrCnntSysDsCd=03&uppAisTpCd=13&aisTpCd=17&mi=1026',
        type: '전세임대 | 전국',
        content: '2024년 청년 전세임대 1순위 입주자 수시모집'
    },
    {
        href: 'https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do',
        type: '행복주택 | 경기',
        content: '시흥시 행복주택 예비입주자 모집'
    },
    {
        href: 'https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do',
        type: '집주임대 | 경기',
        content: '[경기 부천시] 집주인 임대주택 선착순 수시모집 공고'
    },
    {
        href: 'https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do',
        type: '행복주택 | 인천',
        content: '24년 10월 인천시(남동구) 행복주택 입주자격완화 예비입주자 모집'
    },
]
</script>
