<template>
    <div class="background-color-100 bg-size-cover bg-position-center border-0">
        <section class="container pt-5 pb-5">
            <div class="row pt-5 pb-5">

                <!-- 퀴즈 -->
                <div class="col-md-7 mb-3 mb-md-0 h-100">     
                    <div class="h3 d-flex justify-content-center mb-5 pt-2">오늘의 간단 부동산 지식 퀴즈 🤔</div>

                    <div v-for="(item, idx) in quizs" :key="idx">
                        <TodayQuizItem :item="item" :collapseId="`jobCollapse${idx}`" />
                    </div>
                </div>

                <!-- 뉴스 -->
                <div class="col-md-5 mb-3 mb-md-0 h-100">
                    <div class="h3 d-flex justify-content-center mb-5 pt-2">오늘의 최신 뉴스 🔥</div>
                    <div class="card shadow-sm p-lg-3 mt-4 mb-lg-0">
                        <div class="card-body p-lg-4 w-100" >
                            <TodayLatestNewsItem v-for="(item, idx) in items" :key="idx" :item="item" />
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
import fetchNews from '@/utils/news.js';
import fetchQuizs from '@/utils/quiz.js';
import { onMounted } from 'vue';

//최신 뉴스 데이터 조회 & 퀴즈 생성 
const { items, getNewsList } = fetchNews();
const { quizs, getGPTResponse } = fetchQuizs();

onMounted(getNewsList(), getGPTResponse());
</script>

<style scoped>
.background-color-100 {
    width:100%;
    height: 100%;
    background-color: var(--light-main3);
}
</style>
