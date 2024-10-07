<template>
    <div class="col">
        <div class="card shadow-sm card-hover border-0" style="height:370px">
            <!-- 카드 이미지 상단 -->
            <div class="card-img-top card-img-hover position-relative" style="height:310px">
                <a class="img-overlay" :href="item.hrefUrl"></a>
                <!-- 배지 표시 (Verified, New) -->
                <div class="position-absolute start-0 top-0 pt-3 ps-3">
                    <span class="d-table badge bg-accent mb-1">{{ item.roomType }}</span>
                </div>
                <!-- 위시리스트 버튼 -->
                <div class="content-overlay end-0 top-0 pt-3 pe-3 zindex-10">
                    <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Wishlist">
                        <i class="far fa-heart" />
                    </button>
                </div>
                <!-- 이미지 삽입 -->
                <img :src="item.imgUrl" alt="Image" class="img-fluid w-100 h-100 position-absolute" 
                style="height:17vh; object-fit: cover;">
            </div>
            
            <!-- 카드 본문 -->
            <div class="card-body position-relative pb-3">
                <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">{{ item.houseType }}</h4>
                <h4 class="mb-2 h4">
                    <a class="nav-link stretched-link" :href="item.hrefUrl">{{ item.price }}</a>
                </h4>
                <p class="mb-2 fs text-muted">{{ item.majorDesc }}</p>
                <p class="mb-2 fs-sm text-muted">{{ item.desc }}</p>
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