<template>
    <div class="col">
        <div class="card shadow-sm card-hover border-0" style="height:370px">
            <!-- 카드 이미지 상단 -->
            <div class="card-img-top card-img-hover position-relative" style="height:310px">
                <a class="img-overlay" :href="`/houses/gosiwons/${item.roomId}`"></a>
                <!-- 배지 표시 (Verified, New) -->
                <div class="position-absolute start-0 top-0 pt-3 ps-3">
                    <span class="d-table badge bg-accent mb-1">{{ item.type }}</span>
                </div>
                <!-- 위시리스트 버튼 -->
                <div class="content-overlay end-0 top-0 pt-3 pe-3 zindex-10">
                    <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Wishlist">
                        <i class="far fa-heart" />
                    </button>
                </div>
                <!-- 이미지 삽입 -->
                <img :src="item.thumbnail" alt="Image" class="img-fluid w-100 h-100 position-absolute" 
                style="height:17vh; object-fit: cover;">
            </div>
            
            <!-- 카드 본문 -->
            <div class="card-body position-relative pb-3">
                <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">{{ item.type }}</h4>
                <h4 class="mb-2 h5">
                    <a class="nav-link stretched-link" :href="`/houses/gosiwons/${item.roomId}`">
                        월 
                        <span v-if="item.priceMin != item.priceMax">{{ item.priceMin }} - {{ item.priceMax }}</span>
                        <span v-else>{{ item.priceMin }}</span>만 | 
                        <span v-if="item.depositMin != item.depositMax">보 {{ item.depositMin }} - {{ item.depositMax }}만</span>
                        <span v-else-if="item.depositMin === 0 && item.depositMax === 0">보증금 없음</span>
                        <span v-else>보 {{ item.depositMin }}만</span></a>
                </h4>
                <p class="mb-2 fs text-muted">
                    <span v-if="item.maintenanceFee > 0">관리비 {{ item.maintenanceFee }}만원</span>
                    <span v-else>관리비 없음</span> | 
                    <span v-if="item.genderLimit === '0'">남녀 공용</span>
                    <span v-else-if="item.genderLimit === '1'">남녀 분리</span>
                    <span v-else-if="item.genderLimit === '2'">여성 전용</span>
                    <span v-else>남성 전용</span>
                </p>
                <p class="mb-2 fs-sm text-muted">{{ item.title }}</p>
            </div>
            
            <!-- 카드 하단 -->
            <div class="card-footer d-flex align-items-center justify-content-center pt-3 mx-3 text-nowrap">
                <span class="d-inline-block fs-sm"><i class="fas fa-map-marker-alt me-2" />{{ item.address }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    }
})
</script>

<style scoped>
.card-img-top img {
    top: 50%; 
    left: 50%;
    height: 100%; 
    width: auto; 
    transform: translate(-50%, -50%);
    object-fit: cover;
}
</style>