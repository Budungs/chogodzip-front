<template>
    <div class="card shadow-sm p-lg-3 mt-4 mb-lg-0">
        <HomeLottoNoticeItem :noticeItems="noticeItems" />
    </div>
</template>

<script setup>
import HomeLottoNoticeItem from './HomeLottoNoticeItem.vue';

const noticeItems = [
    {
        href: '#',
        type: '행복주택(신혼희망)',
        content: '아산탕정 2-A2BL 신혼희망타운 행복주택 자격완화 예비입주자 모집공고'
    },
    {
        href: '#',
        type: '공공분양(신혼희망)',
        content: '인천계양 A3블록 신혼희망타운(공공분양) 입주자모집공고'
    },
    {
        href: '#',
        type: '임대상가(추첨)',
        content: '부산금곡2단지 임대상가 입점자 모집공고'
    },
    {
        href: '#',
        type: '매입임대',
        content: '경기 군포시 기숙사형 청년주택 예비입주자 모집공고'
    },
    {
        href: '#',
        type: '행복주택(신혼희망)',
        content: '아산탕정 2-A2BL 신혼희망타운 행복주택 자격완화 예비입주자 모집공고'
    },
    {
        href: '#',
        type: '공공분양(신혼희망)',
        content: '인천계양 A3블록 신혼희망타운(공공분양) 입주자모집공고'
    },
    {
        href: '#',
        type: '임대상가(추첨)',
        content: '부산금곡2단지 임대상가 입점자 모집공고'
    },
    {
        href: '#',
        type: '매입임대',
        content: '경기 군포시 기숙사형 청년주택 예비입주자 모집공고'
    },
]
</script>
