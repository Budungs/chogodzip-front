<template>
    <aside class="col-lg-3 offset-lg-1 d-none d-lg-block">
        <div class="sticky-top pt-5">
            <h6 class="pt-5 mt-3 mb-2">{{ progress }}% 작성 완료 했어요 🙌 </h6>
            <div class="progress mb-4" style="height: .25rem;">
            <div class="progress-bar bg-warning" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <ul class="list-unstyled">
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle me-2" :class="{ 'text-primary' : categorySelected }" ></i>
                <a class="nav-link fw-normal ps-1 p-0" href="#room-category" data-scroll data-scroll-offset="20">매물 유형</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle text-primary me-2"></i>
                <a class="nav-link fw-normal ps-1 p-0" href="#location" data-scroll data-scroll-offset="20">이용 정보</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle text-primary me-2"></i>
                <a class="nav-link fw-normal ps-1 p-0" href="#location" data-scroll data-scroll-offset="20">대출 정보</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle text-primary me-2"></i>
                <a class="nav-link fw-normal ps-1 p-0" href="#location" data-scroll data-scroll-offset="20">시설 정보</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle text-primary me-2"></i>
                <a class="nav-link fw-normal ps-1 p-0" href="#location" data-scroll data-scroll-offset="20">건물 정보</a>
            </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
const props = defineProps({
    progress: {
        type: Number,
        required: true,
    },
    categorySelected: {
        type: String,
        required: true,
    },
})
</script>