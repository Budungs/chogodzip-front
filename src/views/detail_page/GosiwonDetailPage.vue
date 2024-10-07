<template>
    <div class="container">
        <section class="container" style="margin-top: 40px;">
            <nav aria-label="breadcrumb" style="margin-bottom:1rem;">
                <ol class="breadcrumb" style="margin:0px;">
                    <li class="breadcrumb-item"><a href="http://localhost:5173/houses/maps/sharehouses">고시원</a></li>
                    <li class="breadcrumb-item active">고시원</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-7">
                    <a class="gallery-item rounded" :href="house.TITLE_IMAGE">
                        <img :src="house.TITLE_IMAGE" alt="타이틀 이미지" class="img-fluid rounded"
                            style="height: 30rem; object-fit: cover;">
                    </a>
                </div>
                <DetailCard :cardData="cardData" />
            </div>
        </section>
    </div>
    <div class="gray-container">
        <div class="container">
            <DetailInfo />
            <GosiwonTable />
            <DetailMap />
        </div>
    </div>
    <ReviewTab />
</template>

<script>
import DetailCard from '@/modules/components/detail/DetailCard.vue';
import DetailInfo from "@/modules/components/detail/DetailInfo.vue";
import DetailMap from "@/modules/components/detail/DetailMap.vue"
import ReviewTab from "@/modules/components/detail/ReviewTab.vue";
import GosiwonTable from "@/modules/components/detail/table/GosiwonTable.vue";

export default {
    components: {
        DetailMap,
        DetailCard,
        DetailInfo,
        ReviewTab,
        GosiwonTable
    },
    data() {
        return {
            activeTab: 'pros',
            cardData: {
                depositMin: '10',
                depositMax: '20',
                priceMin: '50',
                priceMax: '100',
                location: '홍제동',
                type: '공유주거공간',
                subways: [
                    { name: '홍제역', walkTime: '10분' },
                ],
                managementFee: '12만원',
                likes: 116,
                averagePrices: [97, 97, 97],
                detailedLocation: '서울시 광진구 화양동',
            },
            house: {
                ROOM_CNT: "39",
                nearSubways: [
                    [
                        {
                            distance: "0.2682673564953376",
                            LINE: "수도권3호선",
                            FULL_NAME: "수도권3호선_홍제역",
                            LINE_SHORT: "3호선",
                            NAME: "홍제역",
                        },
                    ],
                ],
                NAME: "everyspace (방배)",
                HOUSE_TYPE_NMS: "쉐어하우스",
                HOUSE_TYPE_CD: "HOUTP00008",
                ADDR_DETAIL: "3층",
                FLOOR: "3|3",
                TITLE_IMAGE:
                    "https://image.neoflat.net/XgJgIpc_kWfzAjKs0JqzbIiE7VU=/1440x/filters:no_upscale():watermark(/resource/gobang.png,center,center,0,20,none)/house/4090/bf533c6a-3608-4e47-84b7-992b0e0e8437.png",
                GENDER_TYPE_NM: "성별무관",
                PRICE_MAX: "62",
                PRICE_MIN: "45",
                DEPOSIT_MAX: "75",
                DEPOSIT_MIN: "49",
                LATITUDE: "37.5874508664436",
                LONGITUDE: "126.941627260178",
                ADDR_FULL_ROAD: "서울 용산구 백범로79길 81",
            },
        };
    },
};
</script>

<style scoped>
.gray-container {
    background: #EDEDED;
    margin-top: 5rem;
    padding: 3rem;
    padding-top: 7rem;
    padding-bottom: 7rem;
}

.breadcrumb-item+.breadcrumb-item::before {
    content: ">";
}

.white-box {
    background: white;
}
</style>