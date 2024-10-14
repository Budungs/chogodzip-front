<template>
    <div class="pt-2 pb-5">
        <div class="container pt-3 d-flex flex-column align-items-center">
            <h3 class="pt-5 display-6" style="color:#333d4b">커뮤니티</h3>
            <h3 class="pt-2 pb-3 h3" style="color:rgb(107, 118, 132)">세상 돌아가는 소식부터 내게 꼭 필요한 금융 정보까지 커뮤니티에서 만나보세요</h3>
        </div>
        <Swiper class="pt-3"></Swiper>
        <CommunitySearch></CommunitySearch>
    </div>
</template>

<script setup>
//import Swiper from './Swiper.vue';
import Swiper from '@/views/community/Swiper.vue';
import CommunitySearch from '@/views/community/CommunitySearch.vue';
</script>