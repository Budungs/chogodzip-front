<template>
  <swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :loop="true"
    :centeredSlides="true"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
  
    :modules="modules"
    class="mySwiper mt-3"
  >
    <swiper-slide v-for="item in articles" :key="item.articleId"  class="card">
      <router-link :to="`/community/articles/${item.articleId}`">
        <div class="card position-relative">
          <img :src="item.thumbnail" class="card" style="width:95vw; height:30vh;"><span class="img-gradient-overlay rounded"></span>
          <div class="rounded overlay-text position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-start align-items-end text-white">
            <h5 class="text-center h4 w-100 px-4" style="color:white; z-index:200;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ item.title }}</h5>
          </div>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
  
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from 'vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/assets/css/style.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';

const modules = [Autoplay, Pagination, Navigation];

const articles = ref(null);
const fetchArticles = async () => {
  try {
    const res = await axios.get('/api/community/articles');

    if(res.status === 200) {
      console.log('데이터 조회 완료: ', res.data);
      articles.value = res.data;
    }
  } catch (err) {
    console.error('데이터 조회 실패: ', err);
  }
}

onMounted(fetchArticles);
</script>
