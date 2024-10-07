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
                <a class="nav-link fw-normal ps-1 p-0" data-scroll data-scroll-offset="20">매물 유형</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle me-2" :class="{ 'text-primary' : basicInfoFilled }" ></i>
                <a class="nav-link fw-normal ps-1 p-0" data-scroll data-scroll-offset="20">이용 정보</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle me-2" :class="{ 'text-primary' : loanInfoFilled }" ></i>
                <a class="nav-link fw-normal ps-1 p-0" data-scroll data-scroll-offset="20">대출 정보</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle me-2" :class="{ 'text-primary' : facilitiesFilled }" ></i>
                <a class="nav-link fw-normal ps-1 p-0" data-scroll data-scroll-offset="20">시설 정보</a>
            </li>
            <li class="d-flex align-items-center">
                <i class="far fa-check-circle me-2" :class="{ 'text-primary' : buildingFilled }" ></i>
                <a class="nav-link fw-normal ps-1 p-0" data-scroll data-scroll-offset="20">건물 정보</a>
            </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { computed } from 'vue';
import { usePostRoomStore } from '@/modules/stores/postRoom';

const store = usePostRoomStore();
const progress = computed(() => store.progress);
const categorySelected = computed(() => store.categorySelected);
const basicInfoFilled = computed(() => store.basicInfoFilled);
const loanInfoFilled = computed(() => store.loanInfoFilled);
const facilitiesFilled = computed(() => store.facilitiesFilled);
const buildingFilled = computed(() => store.buildingFilled);
</script>