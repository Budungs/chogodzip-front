<template>
    <div class="accordion-holder">
        <div class="accordion-section">

            <div class="first-chart">

                <div class="stats-box">
                    <div class="stats-header">

                        <span class="type-span">매매</span>
                        <span>전월세 대비 변동률</span>
                    </div>

                    <div class="stats-header">
                        <div class="category">
                            <span>연립/다세대</span>
                            <span class="increase">0.83% 상승</span>
                        </div>
                        <div class="category">
                            <span>오피스텔</span>
                            <span class="decrease">-0.83% 상승</span>
                        </div>
                    </div>
                </div>


            </div>



            <h4>🔎 지역별 가격 현황</h4>
            <div class="second-chart">
                <div class="td-chart">
                    <div class="map-container">
                        <svg ref="svgMap" width="100%" height="600"></svg>
                    </div>
                    <div v-if="!showAllGu" class="return-button">
                        <button @click="resetToAllGu">되돌리기</button>
                    </div>
                </div>

            </div>

            <h4>🔎 연립/다세대 & 오피스텔 통계 비교</h4>
            <div class="third-chart">
                <div class="fc-chart">

                    <canvas id="line-chart"></canvas>
                    <br>
                    <p>최근 6개월 간 평균 월세가 추이</p>
                </div>

                <div class="fc-chart">

                    <canvas id="bar-chart"></canvas>
                    <br>
                    <p>최근 6개월 간 평균 전세가 추이</p>
                </div>


            </div>

            <div class="third-chart">
                <div class="fc-chart">
                    <canvas id="second-line-chart"></canvas>
                    <br>
                    <p>최근 6개월 간 매매 대비 전세가 변동 추이</p>
                </div>

                <div class="fc-chart">
                    <canvas id="third-line-chart"></canvas>
                    <br>
                    <p>최근 6개월 간 평균 전세보증금 변동 추이</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        showAllGu: Boolean,
        resetToAllGu: Function
    },
    mounted() {
        // 여기에 차트와 지도 초기화 로직을 추가하세요
    }
};
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>