<template>
    <div class="container">
        <!-- Page content-->
        <!-- Page header-->
        <!-- Nav pills-->
        <ul class="nav nav-pills border-bottom pb-3 ml-2" style="margin:25px;">
            <li class="nav-item">
                <a class="nav-link d-flex align-items-center">상세페이지</a>
            </li>
            <li class="nav-item">
                <a class="nav-link d-flex align-items-center active">리뷰</a>
            </li>
        </ul>
        <!-- Page content -->
        <!-- Page content-->
        <div class="pb-lg-4 mb-sm-2">
            <!-- Page content-->
            <div class="row">
                <!-- Sidebar-->
                <aside class="col-lg-4 col-md-5 pe-xl-4 mb-5">
                    <!-- Account nav-->
                    <!-- Place card-->
                    <div class="card mb-4 p-2 shadow-sm">
                        <div class="card-body">
                            <!-- Place info-->
                            <div class="d-flex align-items-start mb-3 pb-2 border-bottom">
                                <div class="house-btn">쉐어하우스</div>
                                <div class="ps-2 ms-1">
                                    <h4>{{ house.NAME }}</h4>
                                </div>
                            </div>

                            <!-- Place contacts-->
                            <div class="center">
                                <img class="mb-4" :src="house.TITLE_IMAGE" />
                            </div>
                            <!-- Place following-->
                            <hr />
                            <div class="pt-4">
                                <h4>{{ house.ADDR_FULL_ROAD }}</h4>
                            </div>
                        </div>
                    </div>
                </aside>
                <!-- Content-->
                <div class="col-lg-8 col-md-7 mb-5">
                    <h1 class="h2">리뷰</h1>
                    <!-- Tabs content-->
                    <div class="tab-content pt-2">
                        <!-- Reviews about you tab-->
                        <div class="tab-pane fade show active" id="reviews-about-you" role="tabpanel">
                            <!--ai요약-->
                            <div class="ai-card">
                                <h3 class="title">
                                    <span class="emoji mb-4">👾</span>
                                    <span class="h4" style="font-weight:700;">한눈에 보는 장단점 </span>
                                </h3>
                                <div class="toggle-bar">
                                    <button :class="{ active: activeTab === 'pros' }"
                                        @click="activeTab = 'pros'">장점</button>
                                    <button :class="{ active: activeTab === 'cons' }"
                                        @click="activeTab = 'cons'">단점</button>
                                </div>

                                <transition name="fade" mode="out-in">
                                    <div v-if="activeTab === 'pros'" key="pros" class="content">
                                        <ul>
                                            <li>
                                                <h5>지하철과 버스 정류장이 매우 가까워 대중교통 이용이 편리합니다.</h5>
                                                <hr>
                                            </li>
                                            <li>
                                                <h5>근처 1분 거리에 편의점이 있습니다.</h5>
                                                <hr>
                                            </li>
                                            <li>
                                                <h5>주차장 공간이 넓습니다.</h5>
                                                <hr>
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-else key="cons" class="content">
                                        <ul>
                                            <li>
                                                <h5>지하철과 버스 정류장이 매우 가까워 대중교통 이용이 편리합니다.</h5>
                                                <hr>
                                            </li>
                                            <li>
                                                <h5>근처 1분 거리에 편의점이 있습니다.</h5>
                                                <hr>
                                            </li>
                                            <li>
                                                <h5>주차장 공간이 넓습니다.</h5>
                                                <hr>
                                            </li>
                                        </ul>
                                    </div>
                                </transition>
                            </div>
                            <!-- Normal input -->
                            <div class="mb-3 position-relative pt-2 pb-2">
                                <input style="height: 100px; width: 100%;" class="form-control" id="input-normal"
                                    type="text">
                                <button class="pt-2 btn"
                                    style="background: #68C9CB; color:white; position: absolute; right: 10px; bottom: 15px; padding: 5px 10px; font-size: 0.9rem;"
                                    type="submit">작성</button>
                            </div>


                            <!-- Review-->
                            <div class="mb-4 pb-4 border-bottom" v-for="review in 3" :key="review">
                                <div class="d-flex justify-content-between mb-3">
                                    <div class="d-flex align-items-center pe-2"><img class="rounded-circle me-1"
                                            :src="house.TITLE_IMAGE" width="48" height="48" alt="Avatar">
                                        <div class="ps-2">
                                            <h6 class="fs-base mb-0">말리부</h6><span class="star-rating"></span>
                                        </div>
                                    </div><span class="text-muted fs-sm">Jan 17, 2021</span>
                                </div>
                                <p>집주인이 친절하세요. 이번에 전등 나갔을 때도 친절히 수정 도와주셨어요 ! 근처 공원이 있는 점도 마음에 듭니다.</p>

                            </div>

                            <!-- Pagination-->
                            <nav class="mt-2" aria-label="Reviews pagination">
                                <ul class="pagination">
                                    <li class="page-item d-sm-none"><span class="page-link page-link-static">1 /
                                            5</span></li>
                                    <li class="page-item active d-none d-sm-block" aria-current="page"><span
                                            class="page-link">1<span class="visually-hidden">(current)</span></span>
                                    </li>
                                    <li class="page-item d-none d-sm-block"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item d-none d-sm-block"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item d-none d-sm-block">...</li>
                                    <li class="page-item d-none d-sm-block"><a class="page-link" href="#">8</a></li>
                                    <li class="page-item"><a class="page-link" href="#" aria-label="Next"></a></li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {

        const tagsString =
            "관리비 7~52#FIXED|여성전용#FIXED|청소업체|신용카드|현금영수증|개인에어컨|개인화장실";

        const tagsArray = tagsString
            .split("|")
            .map((tag) => tag.replace("#FIXED", "").trim())
            .filter((tag) => tag)
            .map((tag) => `#${tag}`);
        return {
            activeTab: 'pros',
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
                TAGS: tagsString,
                TITLE_IMAGE:
                    "https://image.neoflat.net/38wirq8VPRRJ3LZUrqcF0A9RVNY=/240x288/filters:no_upscale():watermark(/resource/gobang.png,center,center,0,20,none)/house/4090/bf533c6a-3608-4e47-84b7-992b0e0e8437.png",
                GENDER_TYPE_NM: "성별무관",
                PRICE_MAX: "62",
                PRICE_MIN: "45",
                DEPOSIT_MAX: "75",
                DEPOSIT_MIN: "49",
                LATITUDE: "37.5874508664436",
                LONGITUDE: "126.941627260178",
                ADDR_FULL_ROAD: "서울 용산구 백범로79길 81",
            },
            tagsArray,
        };
    },
};
</script>

<style scoped>
.ai-card {
    background-color: #f7f2fc;
    padding: 35px;
    border-radius: 8px;
    width: 100%;
    margin-bottom: 12px;
}

.title {
    font-size: 18px;
    color: black;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.emoji {
    margin-right: 8px;
}

/* Toggle button bar */
.toggle-bar {
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 30px;
}

button {
    flex: 1;
    /* Allow buttons to take equal width */
    padding: 5px;
    border: none;
    cursor: pointer;
    font-weight: 800;
    font-size: 20px;
    background-color: #f0f0f0;
    color: #333;
    transition: background-color 0.3s, color 0.3s;
}

button.active {
    background-color: #a88cdb;
    color: white;
}

button:not(.active):hover {
    background-color: #ddd;
}

.content {
    font-size: 14px;
    color: #333;
}

ul {
    list-style: none;
}

li {
    font-size: medium;
    margin-bottom: 20px;
}

/* Simple fade animation */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}


button {
    background-color: #ddd;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button.active {
    background-color: #a88cdb;
}

.content {
    font-size: 14px;
    color: #333;
}


/* Simple fade animation */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.border-20 {
    border-radius: 20px;
}

.house-btn {
    border-radius: 25px;
    color: white;
    background: #7747b5;
    padding: 10px 15px;
    font-weight: 700;
}

.main1 {
    color: #7747b5;
}

.tag {
    background: #f2ecf9;
    color: #000;
    font-weight: 600;
    padding: 2px 5px;
    margin: 5px 5px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.375rem;
}

.house-image {
    width: 100%;
    max-height: 700px;
    border-radius: 20px;
    object-fit: cover;
}

.page-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: all .4s .2s ease-in-out;
    transition: all .4s .2s ease-in-out;
    background-color: #fff;
    opacity: 0;
    visibility: hidden;
    z-index: 9999;
}

.page-loading.active {
    opacity: 1;
    visibility: visible;
}

.page-loading-inner {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-transition: opacity .2s ease-in-out;
    transition: opacity .2s ease-in-out;
    opacity: 0;
}

.page-loading.active>.page-loading-inner {
    opacity: 1;
}

.page-loading-inner>span {
    display: block;
    font-size: 1rem;
    font-weight: normal;
    color: #666276;
    ;
}

.page-spinner {
    display: inline-block;
    width: 2.75rem;
    height: 2.75rem;
    margin-bottom: .75rem;
    vertical-align: text-bottom;
    border: .15em solid #bbb7c5;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner .75s linear infinite;
    animation: spinner .75s linear infinite;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@-webkit-keyframes spinner {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spinner {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>