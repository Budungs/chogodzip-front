<template>
    <aside class="col-md-5" style="display: flex; flex-direction: column;">
        <div style="margin-left: 1rem; flex-grow: 1;">
            <p class="fs-lg">매물번호: M001147474</p>
            <h4>월세 {{ cardData.depositMin }}-{{ cardData.depositMax }} / {{ cardData.priceMin }}-{{
                cardData.priceMax }} 만원
            </h4>
            <div>관리비 12만원</div>
            <hr class="mt-3 mb-3" style="height:2px; border-color:#0C0C0C;">
            <div class="fs-6" style="color:black;">홍제동</div>
            <div class="fs-6 mb-3" style="color:black;">공유주거공간</div>
            <div class="mb-3">
                <img :src="subway_3" width="25" height="25" />
                <span class="main1" style="margin-left:7px; font-weight:bolder; color:#7747B5;"
                    v-for="subway in cardData.subways" :key="subway.name">
                    {{ subway.name }} </span><span style="margin-left:1rem;">도보 10분 </span>
            </div>
            <div class="d-flex justify-content-end">
                <button class="s-btn"><i class="s-icon far fa-heart"
                        style="margin-right:0.5rem;" /><span>116</span></button>
                <button class="s-btn"><i class="s-icon fas fa-map-marker-alt" /></button>
                <button class="s-btn"><i class="s-icon far fa-comments" /></button>
                <button class="s-btn"><i class="s-icon far fa-edit" /></button>
                <button class="s-btn"><i class="s-icon fas fa-trash-alt" style="color: #D85F5F" /></button>
            </div>
        </div>
        <div class="market-price d-flex flex-column align-items-center">
            <h6 class="main1 mt-3" style="margin-left: 7px; font-weight: bolder; color: #D85F5F;">
                서울시 광진구 화양동
            </h6>
            <div class="row" style="width: 25rem;">
                <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                    <div style="font-weight: bold; color:black;">평균</div>
                    <div><span
                            style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원
                    </div>
                </div>
                <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                    <div style="font-weight: bold; color:black;">평균</div>
                    <div><span
                            style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원
                    </div>
                </div>
                <div class="col text-center">
                    <div style="font-weight: bold; color:black;">평균</div>
                    <div><span
                            style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
import subway_3 from '@/assets/img/subway_3.png';
export default {
    data() {
        return {
            subway_3
        }
    },
    props: {
        cardData: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.s-btn {
    background: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-left: 0.5rem;
    padding: 5px 10px;
}

.s-icon {
    font-size: 20px;
}

.market-price {
    margin-top: 1rem;
    border-radius: 20px;
    background: #F1F1F1;
    height: 8.5rem;
}
</style>