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
      <swiper-slide><img src="@/assets/img/curbi.jpg" alt="커비" /></swiper-slide>
      <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
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