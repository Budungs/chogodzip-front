<template>
  <swiper
    :slidesPerView="4"
    :spaceBetween="30"
    :loop="true"
    :centeredSlides="true"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
  
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <div class="card"> <!-- 이미지 크기가 달라도 동일한 크기로 보이기 위해 부트스트랩의 card 사용 -->
        <img src="@/assets/img/swiper/curbi.jpg" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/danhocurbi.png" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/eatcurbi.jpg" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/icecurbi.jpg" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/picturecurbi.jpg" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/raichu.png" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/sadcurbi.jpg" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/sleepycurbi.jpg" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="card">
        <img src="@/assets/img/swiper/stonecurbi.jpg" alt="커비" class="card-img-top swiper-img">
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/assets/css/style.css';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Define modules
const modules = [Autoplay, Pagination, Navigation];
</script>

<style scoped>
/* Swiper 이미지 크기를 통일시키기 위한 CSS */
.swiper-img {
  object-fit: cover; /* 이미지가 카드 안에 꽉 차도록 설정 */
  width: 100%; /* 카드의 너비에 맞춤 */
  height: 250px; /* 고정된 높이 설정 */
}
</style>
