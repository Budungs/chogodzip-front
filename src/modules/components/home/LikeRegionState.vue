<template>
    <div class="pb-4 pt-5 mb-2 mt-5" style="background-color:burlywood; height:60vh">
        <!-- 타이틀 -->
        <div class="d-flex w-100 justify-content-center justify-content-lg-start mt-4 mb-4">
            <h2 class="h4 mb-0 d-flex w-100 justify-content-center"><span id="home-user-nickname">테스 </span> 의 관심 지역 현황을 확인해보세요 👾</h2>
        </div>

        <!-- 본문 박스 -->
        <div class="row g-4 justify-content-around align-items-center">
            <div class="col-md-6">
                <div class="border-0 h-100 w-100">
                    <div class="d-flex w-100 h-50 flex-row justify-content-around align-items-center" style="background-color: pink;">
                        <RouterButton href-url="/houses/maps/gosiwons" destination="고시원" backgroundImage="router-1" />
                        <RouterButton href-url="/houses/maps/room" destination="자취방" backgroundImage="router-2" />
                        <RouterButton href-url="/houses/maps/sharehouses" destination="공유주거공간" backgroundImage="router-3" />
                    </div>

                    <div class="h-50" style="background-color:blue">down</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card bg-size-cover bg-position-center border-0 overflow-hidden h-100">map</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import RouterButton from './RouterButton.vue';
</script>

<style scoped>
#home-user-nickname {
    color: var(--main2);
}
</style>