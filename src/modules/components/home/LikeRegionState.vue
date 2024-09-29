<template>
    <div class="pb-4 pt-5 mb-4 mt-5">
        <!-- 타이틀 -->
        <div class="d-flex w-100 justify-content-center justify-content-lg-start mt-4 mb-4">
            <h1 class="h4 mb-0 d-flex w-100 justify-content-center"><span id="home-user-nickname">테스 </span> 의 관심 지역 현황을 확인해보세요 👾</h1>
        </div>

        <!-- 본문 박스 -->
        <div class="row g-4 justify-content-around align-items-center">
            <!-- 왼쪽 -->
            <div class="col-md-6">
                <div class="border-0 h-100 w-100">
                    <!-- 라우터 -->
                    <div class="d-flex w-100 h-50 flex-row justify-content-around align-items-center">
                        <RouterButton hrefUrl="/houses/maps/gosiwons" destination="고시원" backgroundImage="router-1" />
                        <RouterButton hrefUrl="/houses/maps/room" destination="자취방" backgroundImage="router-2" />
                        <RouterButton hrefUrl="/houses/maps/sharehouses" destination="공유주거공간" backgroundImage="router-3" />
                    </div>

                    <!-- 통계 -->
                    <div class="h-50">
                        <div class="card bg-size-cover bg-position-center border-0 overflow-hidden mb-4 mt-3 px-5 shadow rounded-3" style="background-image: url(src/assets/images/backgrounds/home-3.jpg);"><span class="img-gradient-overlay"></span>
                            <div class="card-body content-overlay pb-0 mt-2">
                                <a href="#"><span class="badge bg-dark fs-sm">지역 변경</span></a>
                                <div class="h1 text-light mb-1 mt-2">서울시 광진구</div>
                            </div>
                            <div class="card-footer content-overlay border-0 pt-1 pb-4 d-flex flex-row justify-content-between">
                                <StatsForLikeRegion buildingType="오피스텔" changeRateOfJeonse="0.921" changeRateOfRent="0.2" />
                                <StatsForLikeRegion buildingType="연립/다세대" changeRateOfJeonse="-0.921" changeRateOfRent="0.129" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 오른쪽 -->
            <div class="col-md-6 h-100">
                <div class="card bg-size-cover bg-position-center border-0 overflow-hidden h-100" style="height:600px">
                    <DetailMap :latitude="37.541609091148" :longitude="127.0717799526"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import RouterButton from './RouterButton.vue';
import StatsForLikeRegion from './StatsForLikeRegion.vue';
import DetailMap from '@/common/components/DetailMap.vue';
</script>

<style scoped>
#home-user-nickname {
    color: var(--main2);
}
</style>