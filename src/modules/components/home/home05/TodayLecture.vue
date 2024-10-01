<template>
    <div class="background-color-100 bg-size-cover bg-position-center border-0">
        <section class="container pt-5 pb-5 mb-md-4">
            <div class="row pt-5 pb-5">
                <div class="col-md-7 mb-3 mb-md-0">     
                    <div class="h3 d-flex justify-content-center mb-5">오늘의 간단 부동산 지식 퀴즈 🤔</div>

                    <div v-for="(item, idx) in quizItems" :key="idx">
                        <TodayQuizItem :item="item" :collapseId="`jobCollapse${idx}`" />
                    </div>
                </div>

                <div class="col-md-5 mb-3 mb-md-0" style="border:1px solid blue"></div>
            </div>
        </section>
    </div>
</template>

<script setup>
import TodayQuizItem from './TodayQuizItem.vue';

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
</script>
