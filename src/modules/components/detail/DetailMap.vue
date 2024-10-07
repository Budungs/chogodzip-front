<template>
    <div class="white-box mt-4 p-5">
        <h4 class="mb-3">위치</h4>
        <div class="fs-6 mb-3" style="color:black;">서울 관악구 봉천동</div>
        <div class="mb-3">
            <img :src="subway_3" width="20" height="20" />
            <span style="margin-left:16px;">
                홍제역 </span>
        </div>

        <div class="mb-3">
            <i class="fas fa-school" />
            <span style="margin-left:1rem;">숭실대학교</span>
        </div>

        <div class="position-relative mt-4">
            <DetailMap class="rounded-3" :latitude="LATITUDE" :longitude="LONGITUDE" />
        </div>
    </div>
</template>

<script>
import subway_3 from '@/assets/img/subway_3.png';
import DetailMap from '@/common/components/DetailMap.vue';

export default {
    components: {
        DetailMap
    },
    data() {
        return {
            subway_3,
            LATITUDE: "37.5874508664436",
            LONGITUDE: "126.941627260178",
        }
    },
};
</script>