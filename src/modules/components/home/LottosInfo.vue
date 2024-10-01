<template>
    <div class="pb-4 pt-5 mb-4 mt-5">
        <div class="home-04-title w-100 mt-2 =mb-4">
            <h1 class="h2">오늘의 청약 최신 정보를 확인하세요 📢</h1>
        </div>
        <div class="row g-3 justify-content-between align-items-center">
            <!-- 왼쪽 사진 -->
            <div class="col-md-4 h-100 overflow-hidden">
                <img class="rounded-3 shadow" src="@/assets/images/backgrounds/home-4.jpg" style="height:80vh; max-height:650px; width: 20vw; min-width: 300px" alt="Cover">
            </div>

            <!-- 오른쪽 -->
            <div class="col-md-8">
                <div class="h-100 w-100">
                    <!-- 공고 현황 -->
                     <div class="h-50 w-100">
                        <CounterCards />
                    </div>
                    
                    <!-- 최신 청약 공고 목록 -->
                    <div class="h-75 w-100">
                        <HomeLottoNoticeList />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CounterCards from './CounterCards.vue';
import HomeLottoNoticeList from './HomeLottoNoticeList.vue';
</script>