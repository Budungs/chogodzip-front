<template>
    <div class="background-color-100 bg-size-cover bg-position-center border-0">
        <section class="container pt-5 mb-5 pb-md-4">
            <div class="d-flex align-items-center justify-content-around mb-3 pt-2">
                <h2 class="h3 mb-0"><span style="color:var(--main2)">서울시 광진구</span>에서 방금 올라왔어요 🔥</h2>
                <!-- <a class="btn btn-link fw-normal p-0" href="#">더 많은 매물 확인하기<i class="fas fa-angle-right ms-2" /></a> -->
            </div>
            <div class="row gx-4 mx-0 pt-3 pb-5">
                <RoomCard v-for="(regionItem, idx) in regionItemList" :key="idx" :item="regionItem" />
            </div>
        </section>
    </div>
</template>

<script setup>
import RoomCard from '@/common/components/RoomCard.vue';

const regionItemList = [
    {
        hrefUrl: '/houses/sharehouses/info/:id',
        imgUrl: "src/assets/images/backgrounds/home-1.png",
        roomType: "원룸",
        houseType: "오피스텔",
        price: "전세 1억 8000천",
        majorDesc: "계약 면적 28평 | 2층 | 관리비 17만",
        desc: "깔끔하고 공간 좋은 오픈형 원룸",
        address: "서울특별시 강남구 역삼동",
    },
    {
        hrefUrl: '/houses/sharehouses/info/:id',
        imgUrl: "src/assets/images/backgrounds/home-1.png",
        roomType: "원룸",
        houseType: "오피스텔",
        price: "전세 1억 8000천",
        majorDesc: "계약 면적 28평 | 2층 | 관리비 17만",
        desc: "깔끔하고 공간 좋은 오픈형 원룸",
        address: "서울특별시 강남구 역삼동",
    },
    {
        hrefUrl: '/houses/sharehouses/info/:id',
        imgUrl: "src/assets/images/backgrounds/home-1.png",
        roomType: "원룸",
        houseType: "오피스텔",
        price: "전세 1억 8000천",
        majorDesc: "계약 면적 28평 | 2층 | 관리비 17만",
        desc: "깔끔하고 공간 좋은 오픈형 원룸",
        address: "서울특별시 강남구 역삼동",
    },
    {
        hrefUrl: '/houses/sharehouses/info/:id',
        imgUrl: "src/assets/images/backgrounds/home-1.png",
        roomType: "원룸",
        houseType: "오피스텔",
        price: "전세 1억 8000천",
        majorDesc: "계약 면적 28평 | 2층 | 관리비 17만",
        desc: "깔끔하고 공간 좋은 오픈형 원룸",
        address: "서울특별시 강남구 역삼동",
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